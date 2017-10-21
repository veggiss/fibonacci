var cnv  = document.getElementById("cnv");
var ctx = cnv.getContext("2d");
var minSize = 5.1;
var step = 0;
var mpx = 0;
var mpy = 0;

animateFib();

function paintFib(n) {
    ctx.beginPath();
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.rect(0, 0, cnv.width, cnv.height);
    ctx.stroke();

    var fibs = fib(n);
    var side = 0;
    var x = mpx;
    var y = mpy;
    var cw = true;
    var sp, ep, ax, ay;

    for (var i = 1; i < fibs.length; i++) {
        side++;

        if (side == 1) {
            x -= fibs[i] * minSize;
            sp = Math.PI * 1.5;
            ep = Math.PI;
            ax = x + fibs[i] * minSize;
            ay = y + fibs[i] * minSize;
        } else if (side == 2) {
            y += fibs[i - 1] * minSize;
            sp = Math.PI;
            ep = Math.PI * 0.5;
            ax = x + fibs[i] * minSize;
            ay = y;
        } else if (side == 3) {
            x += fibs[i - 1] * minSize;
            y -= fibs[i - 2] * minSize;
            sp = Math.PI * 0.5;
            ep = 0;
            ax = x;
            ay = y;
        } else if (side == 4) {
            x -= fibs[i - 2] * minSize;
            y -= fibs[i] * minSize;
            sp = 0;
            ep = Math.PI * 1.5;
            ax = x;
            ay = y + fibs[i] * minSize;
            side = 0;
        }

        ctx.beginPath();
        ctx.rect(x, y, fibs[i] * minSize, fibs[i] * minSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ax, ay, fibs[i] * minSize, sp, ep, true);
        ctx.stroke();
    }
}

function fib(n) {
    var f = [0];

    if (n >= 1) {
        f.push(1);
    }

    if (n > 1) {
        f.push(1);
    }

    for (var i = 3; i <= n; i++) {
        f.push(f[i - 2] + f[i - 1]);
    }

    return f;
}

function animateFib() {
    paintFib(30);
    minSize = minSize * 1.05;
    if (minSize >= 0.68) {
        minSize = 0.1;
    }
    console.log(mpx, mpy);
    window.requestAnimationFrame(animateFib);
}

cnv.addEventListener('mousemove', function(evt) {
    var rect = cnv.getBoundingClientRect();
    mpx = evt.clientX - rect.left;
    mpy = evt.clientY - rect.top;
}, false);