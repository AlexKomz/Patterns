namespace Adapter {
    class RoundHole {
        private _radius: number;

        public get radius(): number {
            return this._radius;
        }

        public constructor(radius: number) {
            this._radius = radius;
        }

        public fits(peg: RoundPeg): boolean {
            return this._radius >= peg.radius;
        }
    }

    class RoundPeg {
        private _radius: number;

        public get radius(): number {
            return this._radius;
        }

        public set radius(value: number) {
            this._radius = value;
        }

        public constructor(radius?: number) {
            this._radius = radius;
        }
    }

    class SquarePeg {
        private _width: number;

        public get width(): number {
            return this._width;
        }

        constructor(width: number) {
            this._width = width;
        }
    }

    class SquarePegAdapter extends RoundPeg {
        constructor(peg: SquarePeg) {
            super(Math.sqrt(Math.pow(peg.width / 2, 2) * 2));
        }
    }

    class App {
        constructor() {
            const hole: RoundHole = new RoundHole(20);

            const rPegA: RoundPeg = new RoundPeg(15);
            const rPegB: RoundPeg = new RoundPeg(25);

            console.log(hole.fits(rPegA));
            console.log(hole.fits(rPegB));

            const sPeg: SquarePeg = new SquarePeg(15);
            const sPegAdapted: RoundPeg = new SquarePegAdapter(sPeg);

            console.log(hole.fits(sPegAdapted));
            console.log(sPegAdapted.radius);
        }
    }

    new App();
}