var Adapter;
(function (Adapter) {
    class RoundHole {
        constructor(radius) {
            this._radius = radius;
        }
        get radius() {
            return this._radius;
        }
        fits(peg) {
            return this._radius >= peg.radius;
        }
    }
    class RoundPeg {
        constructor(radius) {
            this._radius = radius;
        }
        get radius() {
            return this._radius;
        }
        set radius(value) {
            this._radius = value;
        }
    }
    class SquarePeg {
        constructor(width) {
            this._width = width;
        }
        get width() {
            return this._width;
        }
    }
    class SquarePegAdapter extends RoundPeg {
        constructor(peg) {
            super(Math.sqrt(Math.pow(peg.width / 2, 2) * 2));
        }
    }
    class App {
        constructor() {
            const hole = new RoundHole(20);
            const rPegA = new RoundPeg(15);
            const rPegB = new RoundPeg(25);
            console.log(hole.fits(rPegA));
            console.log(hole.fits(rPegB));
            const sPeg = new SquarePeg(15);
            const sPegAdapted = new SquarePegAdapter(sPeg);
            console.log(hole.fits(sPegAdapted));
            console.log(sPegAdapted.radius);
        }
    }
    new App();
})(Adapter || (Adapter = {}));
//# sourceMappingURL=adapter.js.map