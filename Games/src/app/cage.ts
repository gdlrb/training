export class Cage {

    public static get MAX_X(): number {
        return 10;
    }

    public static get MAX_Y(): number {
        return 10;
    }

    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        if (x < 0) {
            throw new Error('X must be above zero!');
        }
        if (x > Cage.MAX_X) {
            throw new Error('X must not be below "1"!');
        }
        this._x = Math.round(x);

        if (y < 0) {
            throw new Error('Y must be above zero!');
        }
        if (y > Cage.MAX_Y) {
            throw new Error('Y must not be below "1"!');
        }
        this._y = Math.round(y);
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

}
