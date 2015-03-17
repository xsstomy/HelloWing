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
        var Rotate = (function (_super) {
            __extends(Rotate, _super);
            function Rotate(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.AnimateTransformInstance;
            }
            Rotate.prototype.createInstance = function (target) {
                if (target === void 0) { target = null; }
                this.motionPaths = new Array();
                return _super.prototype.createInstance.call(this, target);
            };
            Rotate.prototype.initInstance = function (instance) {
                this.addMotionPath("rotation", this.angleFrom, this.angleTo, this.angleBy);
                _super.prototype.initInstance.call(this, instance);
            };
            return Rotate;
        })(gui.AnimateTransform);
        gui.Rotate = Rotate;
        Rotate.prototype.__class__ = "egret.gui.Rotate";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
