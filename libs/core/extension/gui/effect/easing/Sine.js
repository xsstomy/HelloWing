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
        var Sine = (function (_super) {
            __extends(Sine, _super);
            /**
             * 构造函数
             * @param easeInFraction 缓入过程所占动画播放时间的百分比。剩余即为缓出的时间。
             */
            function Sine(easeInFraction) {
                if (easeInFraction === void 0) { easeInFraction = 0.5; }
                _super.call(this, easeInFraction);
            }
            /**
             * @inheritDoc
             */
            Sine.prototype.easeIn = function (fraction) {
                return 1 - Math.cos(fraction * Math.PI / 2);
            };
            /**
             * @inheritDoc
             */
            Sine.prototype.easeOut = function (fraction) {
                return Math.sin(fraction * Math.PI / 2);
            };
            return Sine;
        })(gui.EaseInOutBase);
        gui.Sine = Sine;
        Sine.prototype.__class__ = "egret.gui.Sine";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
