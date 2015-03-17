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
        var Move = (function (_super) {
            __extends(Move, _super);
            function Move(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.AnimateTransformInstance;
            }
            Move.prototype.createInstance = function (target) {
                if (target === void 0) { target = null; }
                this.motionPaths = new Array();
                return _super.prototype.createInstance.call(this, target);
            };
            Move.prototype.initInstance = function (instance) {
                this.addMotionPath("translationX", this.xFrom, this.xTo, this.xBy);
                this.addMotionPath("translationY", this.yFrom, this.yTo, this.yBy);
                _super.prototype.initInstance.call(this, instance);
            };
            return Move;
        })(gui.AnimateTransform);
        gui.Move = Move;
        Move.prototype.__class__ = "egret.gui.Move";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
