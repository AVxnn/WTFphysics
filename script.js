let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');
let width = 1920, height = 960;

cnv.width = width;
cnv.height = height;
cnv.style.backgroundColor = '#1E1E1E';


ctx.strokeStyle = 'white'
ctx.lineWidth = 1;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 15;


let clear = function () {
    ctx.clearRect(0, 0, width, height);
}

let fillRect = function (x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.shadowColor = color;
    ctx.fillRect(x, y, w, h)
}

let strokeRect = function (x, y, w, h, c) {
    ctx.strokeRect(x, y, w, h, c)
}

let Rect = function (x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.color = color

    this.dx = 0;
    this.dy = 0;

    this.max = 30;
    this.dd = 0.5;

    this.fall = true;
}

Rect.prototype = {
    draw : function () {
        fillRect(this.x, this.y, this.w, this.h, this.color)
    },

    move : function () {
        this.x += this.dx;
        this.y += this.dy;
    },

    grav : function () {

        if (!this.fall) return


        this.dy += this.dy <= this.max ? this.dd : 0

        if (this.y + this.h >= height) {
            this.y = height - this.h
            // this.dy = 2;
            this.dy *= -1;
        }

        if(Math.abs(this.dy) < this.dd * 2 && this.y + this.h >= height) {
            this.fall = false;
            this.dy = 0;
        }

    }
}

let rect = [];

let mouse = {
    x: 0,
    y: 0
}

cnv.onmousemove = function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

cnv.onclick = function() {
    let i = Math.round(Math.random(1));
    let color = '';
    if (i == 1) {
        color = '#CC2933'
        console.log(i)
    } else if (i == 0) {
        color = '#2C29CC'
        console.log(i)
    }
    rect.push( new Rect(mouse.x - 50, mouse.y - 50, 100, 100, color))
}

setInterval(function() {
    clear()



    for (i in rect){

        rect[i].grav();

        rect[i].move();

        rect[i].draw();
    }

    strokeRect(mouse.x - 50, mouse.y - 50, 100, 100)

}, 1000 / 60)