enum SideBulletStatus { None, Miss, Hit };

interface SideBulletOptions {
    fill: string;
}

class SideBullet extends Component {

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
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 5);
        ctx.lineTo(this.x - 10, this.y);
        ctx.lineTo(this.x, this.y + 5);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    }

}
