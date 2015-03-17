var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var EaseInOutBase = (function () {
            /**
             * 构造函数
             * @param easeInFraction 缓入过程所占动画播放时间的百分比。剩余即为缓出的时间。
             * 默认值为 EasingFraction.IN_OUT，它会缓入前一半时间，并缓出剩余的一半时间。
             */
            function EaseInOutBase(easeInFraction) {
                if (easeInFraction === void 0) { easeInFraction = 0.5; }
                this._easeInFraction = .5;
                this.easeInFraction = easeInFraction;
            }
            Object.defineProperty(EaseInOutBase.prototype, "easeInFraction", {
                /**
                 * 缓入过程所占动画播放时间的百分比。剩余即为缓出的时间。
                 * 有效值为 0.0 到 1.0。
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
            EaseInOutBase.prototype.ease = function (fraction) {
                var easeOutFraction = 1 - this._easeInFraction;
                if (fraction <= this._easeInFraction && this._easeInFraction > 0)
                    return this._easeInFraction * this.easeIn(fraction / this._easeInFraction);
                else
                    return this._easeInFraction + easeOutFraction * this.easeOut((fraction - this._easeInFraction) / easeOutFraction);
            };
            /**
             * 在动画的缓入阶段期间计算已经缓动部分要映射到的值。
             */
            EaseInOutBase.prototype.easeIn = function (fraction) {
                return fraction;
            };
            /**
             * 在动画的缓出阶段期间计算已经缓动部分要映射到的值。
             */
            EaseInOutBase.prototype.easeOut = function (fraction) {
                return fraction;
            };
            return EaseInOutBase;
        })();
        gui.EaseInOutBase = EaseInOutBase;
        EaseInOutBase.prototype.__class__ = "egret.gui.EaseInOutBase";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
