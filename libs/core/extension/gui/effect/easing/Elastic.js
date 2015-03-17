var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var Elastic = (function () {
            function Elastic() {
            }
            Elastic.prototype.ease = function (fraction) {
                return this.easeOut(fraction, 0, 1, 1);
            };
            Elastic.prototype.easeOut = function (t, b, c, d, a, p) {
                if (a === void 0) { a = 0; }
                if (p === void 0) { p = 0; }
                if (t == 0)
                    return b;
                if ((t /= d) == 1)
                    return b + c;
                if (!p)
                    p = d * 0.3;
                var s;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                }
                else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            };
            return Elastic;
        })();
        gui.Elastic = Elastic;
        Elastic.prototype.__class__ = "egret.gui.Elastic";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
