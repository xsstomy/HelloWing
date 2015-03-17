var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var Bounce = (function () {
            /**
             * 构造函数
             */
            function Bounce() {
            }
            Bounce.prototype.ease = function (fraction) {
                return this.easeOut(fraction, 0, 1, 1);
            };
            Bounce.prototype.easeOut = function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75))
                    return c * (7.5625 * t * t) + b;
                else if (t < (2 / 2.75))
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                else if (t < (2.5 / 2.75))
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                else
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            };
            return Bounce;
        })();
        gui.Bounce = Bounce;
        Bounce.prototype.__class__ = "egret.gui.Bounce";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
