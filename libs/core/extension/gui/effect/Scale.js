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
        var Scale = (function (_super) {
            __extends(Scale, _super);
            function Scale(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.AnimateTransformInstance;
            }
            Scale.prototype.createInstance = function (target) {
                if (target === void 0) { target = null; }
                this.motionPaths = new Array();
                return _super.prototype.createInstance.call(this, target);
            };
            Scale.prototype.initInstance = function (instance) {
                this.addMotionPath("scaleX", this.scaleXFrom, this.scaleXTo, this.scaleXBy);
                this.addMotionPath("scaleY", this.scaleYFrom, this.scaleYTo, this.scaleYBy);
                _super.prototype.initInstance.call(this, instance);
            };
            return Scale;
        })(gui.AnimateTransform);
        gui.Scale = Scale;
        Scale.prototype.__class__ = "egret.gui.Scale";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
