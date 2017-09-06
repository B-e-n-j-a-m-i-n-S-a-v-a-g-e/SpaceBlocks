enum BulletStatus { None, Miss, Hit };

interface BulletOptions {
    fill: string;
}

class Bullet extends Component {

    status = BulletStatus.None;

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        public radius: number,
        public options: BulletOptions
    ) {
        super(ctx, x, y);
    }

    draw(): void {

        let ctx = this.ctx,
            opts = this.options;

        ctx.fillStyle = opts.fill;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y -10);
        ctx.lineTo(this.x - 5, this.y - 10);
        ctx.lineTo(this.x, this.y - 20);
        ctx.lineTo(this.x + 5, this.y - 10);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    }

}
