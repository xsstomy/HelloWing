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
        var Parallel = (function (_super) {
            __extends(Parallel, _super);
            function Parallel(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.ParallelInstance;
            }
            Object.defineProperty(Parallel.prototype, "compositeDuration", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var parallelDuration = 0;
                    for (var i = 0; i < this.children.length; ++i) {
                        var childDuration;
                        var child = (this.children[i]);
                        if (child instanceof gui.CompositeEffect)
                            childDuration = child.compositeDuration;
                        else
                            childDuration = child.duration;
                        childDuration = childDuration * child.repeatCount + (child.repeatDelay * (child.repeatCount - 1)) + child.startDelay;
                        parallelDuration = Math.max(parallelDuration, childDuration);
                    }
                    return parallelDuration;
                },
                enumerable: true,
                configurable: true
            });
            return Parallel;
        })(gui.CompositeEffect);
        gui.Parallel = Parallel;
        Parallel.prototype.__class__ = "egret.gui.Parallel";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
