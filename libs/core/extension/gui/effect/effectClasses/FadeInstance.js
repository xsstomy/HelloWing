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
        var FadeInstance = (function (_super) {
            __extends(FadeInstance, _super);
            function FadeInstance(target) {
                _super.call(this, target);
                this.autoRemoveTarget = true;
            }
            FadeInstance.prototype.play = function () {
                var fromValue = this.alphaFrom;
                var toValue = this.alphaTo;
                if ("visible" in this.target && !this.target.visible) {
                    if (isNaN(fromValue))
                        fromValue = this.target.alpha;
                    if (isNaN(toValue))
                        toValue = this.target.alpha;
                    if (fromValue == 0 && toValue != 0) {
                        this.target.alpha = 0;
                        this.target.visible = true;
                    }
                }
                this.motionPaths = [new gui.MotionPath("alpha")];
                this.motionPaths[0].keyframes = [new gui.Keyframe(0, this.alphaFrom), new gui.Keyframe(this.duration, this.alphaTo)];
                _super.prototype.play.call(this);
            };
            return FadeInstance;
        })(gui.AnimateInstance);
        gui.FadeInstance = FadeInstance;
        FadeInstance.prototype.__class__ = "egret.gui.FadeInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
