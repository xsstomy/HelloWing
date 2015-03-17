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
        var Fade = (function (_super) {
            __extends(Fade, _super);
            function Fade(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.FadeInstance;
            }
            Fade.prototype.initInstance = function (instance) {
                _super.prototype.initInstance.call(this, instance);
                var fadeInstance = instance;
                fadeInstance.alphaFrom = this.alphaFrom;
                fadeInstance.alphaTo = this.alphaTo;
            };
            return Fade;
        })(gui.Animate);
        gui.Fade = Fade;
        Fade.prototype.__class__ = "egret.gui.Fade";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
