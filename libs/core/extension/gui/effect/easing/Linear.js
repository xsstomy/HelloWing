var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var Linear = (function () {
            /**
             * 构造函数
             * @param easeInFraction 在加速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
             * @param easeOutFraction 在减速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
             */
            function Linear(easeInFraction, easeOutFraction) {
                if (easeInFraction === void 0) { easeInFraction = 0; }
                if (easeOutFraction === void 0) { easeOutFraction = 0; }
                this._easeInFraction = 0;
                this._easeOutFraction = 0;
                this.easeInFraction = easeInFraction;
                this.easeOutFraction = easeOutFraction;
            }
            Object.defineProperty(Linear.prototype, "easeInFraction", {
                /**
                 * 在加速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
                 */
                get: function () {
                    return this._easeInFraction;
                },
                set: function (value) {
                    this._easeInFraction = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Linear.prototype, "easeOutFraction", {
                /**
                 * 在减速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
                 */
                get: function () {
                    return this._easeOutFraction;
                },
                set: function (value) {
                    this._easeOutFraction = value;
                },
                enumerable: true,
                configurable: true
            });
            Linear.prototype.ease = function (fraction) {
                if (this.easeInFraction == 0 && this.easeOutFraction == 0)
                    return fraction;
                var runRate = 1 / (1 - this.easeInFraction / 2 - this.easeOutFraction / 2);
                if (fraction < this.easeInFraction)
                    return fraction * runRate * (fraction / this.easeInFraction) / 2;
                if (fraction > (1 - this.easeOutFraction)) {
                    var decTime = fraction - (1 - this.easeOutFraction);
                    var decProportion = decTime / this.easeOutFraction;
                    return runRate * (1 - this.easeInFraction / 2 - this.easeOutFraction + decTime * (2 - decProportion) / 2);
                }
                return runRate * (fraction - this.easeInFraction / 2);
            };
            return Linear;
        })();
        gui.Linear = Linear;
        Linear.prototype.__class__ = "egret.gui.Linear";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
