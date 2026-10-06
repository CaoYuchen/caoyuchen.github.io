// Fireflies — a lightweight canvas scene for the CS page.
//
// Every glow is a pre-rendered sprite drawn with additive blending, so a frame
// is ~100 drawImage calls and nothing else. Fireflies live on three depth
// layers, blink with the flash-and-rest rhythm of real fireflies, drift out of
// the lantern in the background photo, and gather around the cursor.
(function () {
	'use strict';

	var container = document.getElementById('firefly-container');
	if (!container || !window.requestAnimationFrame) return;

	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	var finePointer = window.matchMedia('(pointer: fine)').matches;

	// Where the light source sits in the background photo (0–1 of the image),
	// and the photo's aspect ratio, so the origin tracks `background-size: cover`.
	var origin = (container.getAttribute('data-origin') || '0.5,0.5').split(',').map(Number);
	var imageAspect = Number(container.getAttribute('data-aspect')) || 1.5;

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	container.appendChild(canvas);

	var W = 0, H = 0, dpr = 1;
	var lantern = { x: 0, y: 0, r: 0 };
	var flies = [];
	var pointer = { x: 0, y: 0, active: false, strength: 0 };
	var scrollY = window.pageYOffset || 0;
	var time = 0, last = 0, running = false;

	var rand = function (a, b) { return a + Math.random() * (b - a); };
	var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

	// ---------------------------------------------------------------- sprites

	function makeSprite(size, stops) {
		var c = document.createElement('canvas');
		c.width = c.height = size;
		var g = c.getContext('2d');
		var grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
		stops.forEach(function (s) { grad.addColorStop(s[0], s[1]); });
		g.fillStyle = grad;
		g.fillRect(0, 0, size, size);
		return c;
	}

	// A hot, slightly green-gold core inside a wide amber halo.
	var SPRITE_FLY = makeSprite(128, [
		[0.00, 'rgba(255,255,236,1)'],
		[0.07, 'rgba(255,244,180,1)'],
		[0.15, 'rgba(255,210,100,0.7)'],
		[0.32, 'rgba(255,160,50,0.26)'],
		[0.60, 'rgba(255,125,25,0.07)'],
		[1.00, 'rgba(255,110,0,0)']
	]);
	// Out-of-focus foreground flies: soft disc, no hot core.
	var SPRITE_BOKEH = makeSprite(128, [
		[0.00, 'rgba(255,214,140,0.55)'],
		[0.45, 'rgba(255,186,90,0.35)'],
		[0.62, 'rgba(255,160,60,0.12)'],
		[1.00, 'rgba(255,140,40,0)']
	]);
	var SPRITE_LANTERN = makeSprite(256, [
		[0.00, 'rgba(255,190,110,0.55)'],
		[0.25, 'rgba(255,150,60,0.22)'],
		[0.55, 'rgba(255,110,30,0.07)'],
		[1.00, 'rgba(255,90,0,0)']
	]);

	// ---------------------------------------------------------------- fireflies

	function Firefly(fromLantern) {
		this.reset(fromLantern, true);
	}

	Firefly.prototype.reset = function (fromLantern, initial) {
		// Depth: most flies are far away, a few drift close to the lens.
		var z = Math.pow(Math.random(), 1.8);
		this.z = z;
		this.bokeh = z > 0.86;
		this.size = this.bokeh ? rand(44, 80) : 22 + z * 44;
		this.speed = 8 + z * 26; // px per second

		if (fromLantern) {
			var a = rand(0, Math.PI * 2), d = rand(0, lantern.r * 0.35);
			this.x = lantern.x + Math.cos(a) * d;
			this.y = lantern.y + Math.sin(a) * d * 0.6;
			this.vx = Math.cos(a) * this.speed * 1.6;
			this.vy = Math.sin(a) * this.speed * 1.2 - this.speed * 0.6;
		} else {
			this.x = rand(-20, W + 20);
			this.y = initial ? rand(-20, H + 20) : H + 20;
			this.vx = rand(-1, 1) * this.speed;
			this.vy = rand(-1, 0.3) * this.speed;
		}

		// Smooth wander: a few incommensurate sine waves per fly.
		this.f1 = rand(0.08, 0.22); this.p1 = rand(0, 6.28);
		this.f2 = rand(0.21, 0.47); this.p2 = rand(0, 6.28);

		// Blink rhythm: a quick flash, a slow fade, then a dim rest.
		this.glower = Math.random() < 0.25; // some just breathe gently
		this.period = rand(2.2, 6.5);
		this.phase = initial ? rand(0, this.period) : 0;
		this.rest = rand(0.16, 0.32);
		this.brightness = this.rest;
		this.age = 0;
	};

	Firefly.prototype.flash = function () {
		var t = this.phase / this.period;
		if (this.glower) return 0.45 + 0.4 * Math.sin(t * Math.PI * 2);
		if (t < 0.06) return t / 0.06; // rise
		if (t < 0.12) return 1; // hold
		if (t < 0.42) {
			var k = (t - 0.12) / 0.3; // decay
			return 1 - k * k * (3 - 2 * k);
		}
		return 0;
	};

	Firefly.prototype.update = function (dt) {
		this.age += dt;
		this.phase = (this.phase + dt) % this.period;
		this.brightness = this.rest + (1 - this.rest) * this.flash();

		// Steering target velocity from the wander field, with a gentle lift.
		var tx = Math.cos(time * this.f1 + this.p1) + 0.6 * Math.sin(time * this.f2 + this.p2);
		var ty = Math.sin(time * this.f1 * 1.3 + this.p2) + 0.5 * Math.cos(time * this.f2 * 0.7 + this.p1) - 0.35;
		var steer = 0.9 * dt;
		this.vx += (tx * this.speed - this.vx) * steer;
		this.vy += (ty * this.speed - this.vy) * steer;

		// Near the cursor, flies are drawn into a loose orbit.
		if (pointer.strength > 0.01) {
			var dx = pointer.x - this.x, dy = pointer.y - this.y;
			var dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
			var reach = 220;
			if (dist < reach) {
				var pull = (1 - dist / reach) * pointer.strength * (0.35 + this.z);
				// Inward pull fades as the fly gets close, so they circle rather than collide.
				var inward = dist > 40 ? 1 : dist / 40;
				this.vx += ((dx / dist) * inward * 60 - (dy / dist) * 70) * pull * dt;
				this.vy += ((dy / dist) * inward * 60 + (dx / dist) * 70) * pull * dt;
				this.brightness = Math.min(1, this.brightness + pull * 0.6);
			}
		}

		this.x += this.vx * dt;
		this.y += this.vy * dt;

		var m = this.size + 40;
		if (this.x < -m || this.x > W + m || this.y < -m * 2 || this.y > H + m * 2) {
			this.reset(Math.random() < 0.45, false);
		}
	};

	Firefly.prototype.draw = function () {
		var fadeIn = this.age < 1.2 ? this.age / 1.2 : 1;
		var a = this.brightness * fadeIn * (this.bokeh ? 0.5 : 0.75 + this.z * 0.25);
		if (a < 0.01) return;
		var s = this.bokeh ? this.size : this.size * (0.75 + this.brightness * 0.5);
		ctx.globalAlpha = a;
		ctx.drawImage(this.bokeh ? SPRITE_BOKEH : SPRITE_FLY, this.x - s / 2, this.y - s / 2, s, s);
	};

	// ---------------------------------------------------------------- scene

	function layout() {
		dpr = Math.min(window.devicePixelRatio || 1, 1.5);
		W = container.clientWidth || window.innerWidth;
		H = container.clientHeight || window.innerHeight;
		canvas.width = Math.round(W * dpr);
		canvas.height = Math.round(H * dpr);
		canvas.style.width = W + 'px';
		canvas.style.height = H + 'px';
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		// Map the photo's light source through background-size: cover.
		var imgW = Math.max(W, H * imageAspect);
		var imgH = imgW / imageAspect;
		lantern.x = (W - imgW) / 2 + origin[0] * imgW;
		lantern.y = (H - imgH) / 2 + origin[1] * imgH;
		lantern.r = imgH * 0.22;
	}

	function populate() {
		var count = Math.round(clamp((W * H) / 13000, 40, 120));
		flies = [];
		for (var i = 0; i < count; i++) flies.push(new Firefly(i < count * 0.3));
		// The lantern-born ones start spread out, not stacked on one spot.
		for (var j = 0; j < 4; j++) flies.forEach(function (f) { f.update(0.5); });
	}

	function drawLantern() {
		// A candle's uneven breathing: two slow waves and a faster flicker.
		var flicker = 0.78 + 0.12 * Math.sin(time * 1.7) + 0.06 * Math.sin(time * 5.3 + 1.2) + 0.04 * Math.sin(time * 13.1);
		var s = lantern.r * 2 * (0.95 + flicker * 0.1);
		ctx.globalAlpha = flicker;
		ctx.drawImage(SPRITE_LANTERN, lantern.x - s / 2, lantern.y - s / 2, s, s);
	}

	function frame(now) {
		var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
		last = now;
		time += dt;

		pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * Math.min(1, dt * 3);

		ctx.clearRect(0, 0, W, H);
		ctx.globalCompositeOperation = 'lighter';
		drawLantern();
		for (var i = 0; i < flies.length; i++) {
			flies[i].update(dt);
			flies[i].draw();
		}
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = 'source-over';

		if (running) requestAnimationFrame(frame);
	}

	function start() {
		if (running) return;
		running = true;
		last = 0;
		requestAnimationFrame(frame);
	}

	function stop() {
		running = false;
	}

	// Reduced motion: one still frame, no animation loop.
	function still() {
		stop();
		last = 0;
		frame(0);
	}

	function sync() {
		if (reducedMotion.matches || document.hidden) {
			if (reducedMotion.matches) still(); else stop();
		} else {
			start();
		}
	}

	// ---------------------------------------------------------------- events

	if (finePointer) {
		window.addEventListener('pointermove', function (e) {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
			pointer.active = true;
		}, { passive: true });
		document.addEventListener('pointerleave', function () { pointer.active = false; });
		window.addEventListener('blur', function () { pointer.active = false; });
	}

	// Parallax: as the page scrolls, nearer flies slide further.
	window.addEventListener('scroll', function () {
		var y = window.pageYOffset || 0;
		var delta = y - scrollY;
		scrollY = y;
		for (var i = 0; i < flies.length; i++) {
			flies[i].y -= delta * (0.04 + flies[i].z * 0.22);
		}
		if (!running) still();
	}, { passive: true });

	var resizeTimer;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			var oldW = W, oldH = H;
			layout();
			// Mobile browsers resize on scroll as the URL bar hides; only
			// repopulate when the size really changed.
			if (Math.abs(W - oldW) > 80 || Math.abs(H - oldH) > 160) populate();
			if (!running) still();
		}, 150);
	});

	document.addEventListener('visibilitychange', sync);
	if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', sync);

	layout();
	populate();
	sync();
})();
