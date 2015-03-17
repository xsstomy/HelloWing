var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var Keyframe = (function () {
            /**
             * 构造函数
             * @param time 以毫秒为单位的时间，此关键帧的效果目标应该在此时间处具有 value 参数指定的值。
             * @param value 效果目标在给定的 time 处应该具有的值。
             * @param valueBy 可选参数，如果提供该可选参数，
             * 则可以通过将 valueBy 与 MotionPath 对象的关键帧集合中的前一个关键帧的 value 相加来动态地计算 value。
             * 如果是序列中的第一个 Keyframe，则会忽略此值
             *
             */
            function Keyframe(time, value, valueBy) {
                if (time === void 0) { time = NaN; }
                if (value === void 0) { value = null; }
                if (valueBy === void 0) { valueBy = null; }
                this.value = value;
                this.time = time;
                this.valueBy = valueBy;
            }
            /**
             * 返回此 Keyframe 对象的副本。
             */
            Keyframe.prototype.clone = function () {
                var kf = new Keyframe(this.time, this.value, this.valueBy);
                kf.easer = this.easer;
                kf.timeFraction = this.timeFraction;
                return kf;
            };
            return Keyframe;
        })();
        gui.Keyframe = Keyframe;
        Keyframe.prototype.__class__ = "egret.gui.Keyframe";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
