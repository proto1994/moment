import Canvas, { canvas, context, offscreenCanvas, offscreenContext } from '../../draw/canvas';

class Parabola {
    sx = 30
    sy = canvas.height - 100
    ex = 0
    ey = 0
    a = 0.01
    b = 0
    speed = 100
    radius = 20
    color = 'red'
    pause = true
    mx = 0
    my = 0
    direction = 1
    constructor(o) {
        Object.assign(this, o);
        this._setEndPosition();
        this._setB();
        this._setDirection();
    }
    _setEndPosition() {
        this.ex = this.tx - this.sx;
        this.ey = this.ty - this.sy;
    }
    _setB() {
        this.b = (this.ey - this.a * this.ex * this.ex) / this.ex;
    }
    _setDirection() {
         this.direction = this.ex > 0 ? 1 : -1;
    }

    move() {
        const { sx } = this;
        let tangent = 2 * this.a * this.mx + this.b;
        this.mx = this.mx + this.direction * Math.sqrt(this.speed / (tangent * tangent + 1));
        this.my = this.a * this.mx * this.mx + this.b * this.mx;
        this._moveEnd();
    }
    _moveEnd() {
        if (Math.abs(this.mx) > Math.abs(this.ex) ) {
            this._setEndStatus();
        } 
    }
    _setEndStatus() {
        this.status = -1
    }

    draw() {
        context.save();
        context.beginPath();
        context.translate(this.sx, this.sy);
        context.arc(this.mx, this.my, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
    }

}

export default Parabola;