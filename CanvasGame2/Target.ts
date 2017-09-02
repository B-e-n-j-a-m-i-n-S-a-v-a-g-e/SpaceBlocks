﻿class TargetOptions {
    fillShield: string;
    fillRegular: string;
    life: {
        fill: string;
        max: number;
    }
}

class Target extends RectComponent {

    life: number;

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        public options: TargetOptions
    ) {

        super(ctx, x, y, width, height);

        this.life = randomNum(1, options.life.max);
    }

    draw(): void {

        let ctx = this.ctx,
            opts = this.options;


        if (this.life > 1) {
            ctx.fillStyle = opts.fillShield;
        } else if (this.life == 1) {
            ctx.fillStyle = opts.fillRegular;
        } 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    active(): boolean {
        return this.life > 0;
    }

    hitByBullet(bullet: Bullet): boolean {

        if (bullet.status !== BulletStatus.None) {
            return false;
        }

        let tLeft = this.x,
            tRight = this.x + this.width,
            tBottom = this.y + this.height;

        let bLeft = bullet.x - bullet.radius,
            bRight = bullet.x + bullet.radius,
            bTop = bullet.y - bullet.radius;

        return (
            bTop <= tBottom &&
            (
                (bLeft >= tLeft && bLeft <= tRight) ||
                (bRight >= tLeft && bRight <= tRight)
            )
        );
    }

}