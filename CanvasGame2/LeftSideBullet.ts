enum LeftSideBulletStatus { None, Miss, Hit };

interface LeftSideBulletOptions {
    fill: string;
}

class LeftSideBullet extends Component {

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
        ctx.moveTo(this.x, this.y + 7);
        ctx.lineTo(this.x, this.y + 12);
        ctx.lineTo(this.x - 10, this.y + 17);
        ctx.lineTo(this.x, this.y + 22);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    }

}
