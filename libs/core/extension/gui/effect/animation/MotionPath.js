var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var MotionPath = (function () {
            /**
             * 构造函数
             * @param property 要设置动画的目标上属性的名称。
             */
            function MotionPath(property) {
                if (property === void 0) { property = null; }
                this.interpolator = gui.NumberInterpolator.getInstance();
                this.property = property;
            }
            /**
             * 返回此 MotionPath 对象的副本（包含每个关键帧的副本）。
             */
            MotionPath.prototype.clone = function () {
                var mp = new MotionPath(this.property);
                mp.interpolator = this.interpolator;
                if (this.keyframes !== null) {
                    mp.keyframes = new Array();
                    for (var i = 0; i < this.keyframes.length; ++i)
                        mp.keyframes[i] = this.keyframes[i].clone();
                }
                return mp;
            };
            /**
             * 计算每一个关键帧的timeFraction值
             */
            MotionPath.prototype.scaleKeyframes = function (duration) {
                var n = this.keyframes.length;
                for (var i = 0; i < n; ++i) {
                    var kf = this.keyframes[i];
                    kf.timeFraction = kf.time / duration;
                }
            };
            /**
             * 给定已过去时间部分的情况下，计算并返回一个内插值。
             * 该函数决定该部分所处于的关键帧时间间隔，
             * 然后在该时间间隔内插补该时间间隔的定界关键帧值之间的值。
             * @param fraction 效果的总体持续时间部分（从 0.0 到 1.0 之间的值）。
             * @return 内插值
             */
            MotionPath.prototype.getValue = function (fraction) {
                if (!this.keyframes)
                    return null;
                var n = this.keyframes.length;
                if (n == 2 && this.keyframes[1].timeFraction == 1) {
                    var easedF = (this.keyframes[1].easer != null) ? this.keyframes[1].easer.ease(fraction) : fraction;
                    return this.interpolator.interpolate(easedF, this.keyframes[0].value, this.keyframes[1].value);
                }
                if (isNaN(this.keyframes[0].timeFraction))
                    this.scaleKeyframes(this.keyframes[this.keyframes.length - 1].time);
                var prevT = 0;
                var prevValue = this.keyframes[0].value;
                for (var i = 1; i < n; ++i) {
                    var kf = this.keyframes[i];
                    if (fraction >= prevT && fraction < kf.timeFraction) {
                        var t = (fraction - prevT) / (kf.timeFraction - prevT);
                        var easedT = (kf.easer != null) ? kf.easer.ease(t) : t;
                        return this.interpolator.interpolate(easedT, prevValue, kf.value);
                    }
                    prevT = kf.timeFraction;
                    prevValue = kf.value;
                }
                return this.keyframes[n - 1].value;
            };
            return MotionPath;
        })();
        gui.MotionPath = MotionPath;
        MotionPath.prototype.__class__ = "egret.gui.MotionPath";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
