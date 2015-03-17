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
        var Sequence = (function (_super) {
            __extends(Sequence, _super);
            function Sequence(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.SequenceInstance;
            }
            Object.defineProperty(Sequence.prototype, "compositeDuration", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var sequenceDuration = 0;
                    for (var i = 0; i < this.children.length; ++i) {
                        var childDuration;
                        var child = (this.children[i]);
                        if (child instanceof gui.CompositeEffect)
                            childDuration = child.compositeDuration;
                        else
                            childDuration = child.duration;
                        childDuration = childDuration * child.repeatCount + (child.repeatDelay * (child.repeatCount - 1)) + child.startDelay;
                        sequenceDuration += childDuration;
                    }
                    return sequenceDuration;
                },
                enumerable: true,
                configurable: true
            });
            return Sequence;
        })(gui.CompositeEffect);
        gui.Sequence = Sequence;
        Sequence.prototype.__class__ = "egret.gui.Sequence";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
