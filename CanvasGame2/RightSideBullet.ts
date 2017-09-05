enum RightSideBulletStatus { None, Miss, Hit };

interface RightSideBulletOptions {
    fill: string;
}

class RightSideBullet extends Component {

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
        ctx.moveTo(this.x + 20, this.y + 7);
        ctx.lineTo(this.x + 20, this.y + 12);
        ctx.lineTo(this.x + 30, this.y + 17);
        ctx.lineTo(this.x + 20, this.y + 22);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    }

}
