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
        if (x < 10) {
            throw new Error('X < 10!');
        }
        this._x = Math.round(x);

        if (y < 10) {
            throw new Error('Y < 10!');
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
