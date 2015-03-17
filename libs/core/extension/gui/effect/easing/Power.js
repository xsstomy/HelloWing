var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var Power = (function (_super) {
            __extends(Power, _super);
            /**
             * 构造函数
             * @param easeInFraction 在加速阶段中整个持续时间的部分，在 0.0 和 1.0 之间。
             * @param exponent 在缓动计算中使用的指数。exponent 属性的值越大，加速和减速的速率越快。
             *
             */
            function Power(easeInFraction, exponent) {
                if (easeInFraction === void 0) { easeInFraction = 0.5; }
                if (exponent === void 0) { exponent = 2; }
                _super.call(this, easeInFraction);
                this.exponent = exponent;
            }
            Object.defineProperty(Power.prototype, "exponent", {
                /**
                 * 在缓动计算中使用的指数。exponent 属性的值越大，加速和减速的速率越快。
                 */
                get: function () {
                    return this._exponent;
                },
                set: function (value) {
                    this._exponent = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            Power.prototype.easeIn = function (fraction) {
                return Math.pow(fraction, this._exponent);
            };
            /**
             * @inheritDoc
             */
            Power.prototype.easeOut = function (fraction) {
                return 1 - Math.pow((1 - fraction), this._exponent);
            };
            return Power;
        })(gui.EaseInOutBase);
        gui.Power = Power;
        Power.prototype.__class__ = "egret.gui.Power";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
