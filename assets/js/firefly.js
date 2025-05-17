// Canvas-based Firefly Animation for Performance
(function() {
	const FIREFLY_COUNT = 60;
	const container = document.getElementById('firefly-container');
	let canvas, ctx, w, h, fireflies = [];

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}

	function createCanvas() {
		canvas = document.createElement('canvas');
		canvas.style.position = 'absolute';
		canvas.style.top = 0;
		canvas.style.left = 0;
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.pointerEvents = 'none';
		canvas.style.zIndex = 0;
		container.appendChild(canvas);
		ctx = canvas.getContext('2d');
		resize();
	}

	function resize() {
		w = container.offsetWidth || window.innerWidth;
		h = container.offsetHeight || window.innerHeight;
		canvas.width = w;
		canvas.height = h;
	}

	function Firefly() {
		this.x = random(0, w);
		this.y = random(0, h);
		this.radius = random(1.5, 3.5);
		this.speed = random(0.5, 1.5);
		this.angle = random(0, 2 * Math.PI);
		this.alpha = random(0.4, 1);
		this.color = `rgba(255,140,0,${this.alpha})`;
		this.twinkle = random(0.01, 0.03);
	}
	Firefly.prototype.move = function() {
		this.angle += random(-0.05, 0.05);
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;
		// Wrap around edges
		if (this.x < 0) this.x = w;
		if (this.x > w) this.x = 0;
		if (this.y < 0) this.y = h;
		if (this.y > h) this.y = 0;
		// Twinkle
		this.alpha += this.twinkle * (Math.random() > 0.5 ? 1 : -1);
		this.alpha = Math.max(0.2, Math.min(1, this.alpha));
		this.color = `rgba(255,140,0,${this.alpha})`;
	};
	Firefly.prototype.draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius * 2, 0, 2 * Math.PI, false);
		ctx.shadowColor = 'rgba(255,140,0,0.8)';
		ctx.shadowBlur = 18;
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
	};

	function initFireflies() {
		fireflies = [];
		for (let i = 0; i < FIREFLY_COUNT; i++) {
			fireflies.push(new Firefly());
		}
	}

	function animate() {
		ctx.clearRect(0, 0, w, h);
		for (let f of fireflies) {
			f.move();
			f.draw(ctx);
		}
		requestAnimationFrame(animate);
	}

	function setup() {
		if (!container) return;
		container.style.position = 'relative';
		container.innerHTML = '';
		createCanvas();
		initFireflies();
		animate();
		window.addEventListener('resize', () => {
			resize();
			initFireflies();
		});
	}

	setup();
})();

