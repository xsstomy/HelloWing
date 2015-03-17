var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var RepeatBehavior = (function () {
            function RepeatBehavior() {
            }
            /**
             * 指定在每个迭代上重复的动画在前进方向上的进度。
             */
            RepeatBehavior.LOOP = "loop";
            /**
             * 指定重复动画应该在每个迭代上倒转方向。
             * 例如，反向动画在偶数迭代上向前播放，而在奇数迭代上反向播放。
             */
            RepeatBehavior.REVERSE = "reverse";
            return RepeatBehavior;
        })();
        gui.RepeatBehavior = RepeatBehavior;
        RepeatBehavior.prototype.__class__ = "egret.gui.RepeatBehavior";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
