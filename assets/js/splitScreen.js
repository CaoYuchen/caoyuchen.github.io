// Home page split view: the diagonal follows the pointer with easing.
// The divider position lives in one CSS variable (--split, 0–1 of the
// viewport width) that only drives transforms, so moving it never triggers
// layout or repaint.
(function () {
    'use strict';

    var view = document.querySelector('.splitview');
    if (!view) return;

    var csButton = document.getElementById('csButton');
    var artButton = document.getElementById('artButton');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Phones and tablets have no cursor to follow, so the divider drifts instead.
    var canDrift = window.matchMedia('(hover: none)').matches && !reducedMotion;
    var DRIFT_PERIOD = 10; // seconds per full sway

    var target = 0.5, current = 0.5, ease = 0.1, raf = 0, driftRaf = 0, leaving = false;

    function render() {
        current += (target - current) * ease;
        if (Math.abs(target - current) < 0.0005) current = target;
        view.style.setProperty('--split', current.toFixed(4));

        var csSide = current >= 0.5;
        if (csButton) csButton.classList.toggle('is-active', csSide);
        if (artButton) artButton.classList.toggle('is-active', !csSide);

        raf = current === target ? 0 : requestAnimationFrame(render);
    }

    function moveTo(value, speed) {
        target = value;
        ease = reducedMotion ? 1 : speed;
        if (!raf) raf = requestAnimationFrame(render);
    }

    function drift(now) {
        if (leaving) {
            driftRaf = 0;
            return;
        }
        var t = now / 1000;
        moveTo(0.5 + 0.2 * Math.sin((t / DRIFT_PERIOD) * Math.PI * 2), 0.08);
        driftRaf = requestAnimationFrame(drift);
    }

    function startDrift() {
        if (canDrift && !driftRaf) driftRaf = requestAnimationFrame(drift);
    }

    // Same mapping as before: the divider runs a little ahead of the pointer,
    // so either photo can be revealed almost fully.
    window.addEventListener('pointermove', function (e) {
        if (leaving || e.pointerType !== 'mouse') return;
        var x = e.clientX / window.innerWidth;
        moveTo(Math.min(0.97, Math.max(0.03, 0.5 + (x - 0.5) * 1.5)), 0.1);
    }, { passive: true });

    function leaveTo(button, value) {
        if (!button) return;
        button.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            leaving = true;
            document.body.classList.add('is-leaving');
            moveTo(value, 0.14);
            var href = button.getAttribute('href');
            setTimeout(function () { window.location.href = href; }, reducedMotion ? 0 : 650);
        });
    }

    // CS lives on the left photo; sweeping right reveals it fully.
    leaveTo(csButton, 1.6);
    leaveTo(artButton, -0.6);

    // Coming back via the browser's back button restores the page from cache.
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) return;
        leaving = false;
        document.body.classList.remove('is-leaving');
        moveTo(0.5, 0.2);
        startDrift();
    });

    render();
    startDrift();
})();
