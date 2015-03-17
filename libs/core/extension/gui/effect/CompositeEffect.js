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
        var CompositeEffect = (function (_super) {
            __extends(CompositeEffect, _super);
            function CompositeEffect(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this._children = [];
                this.instanceClass = gui.CompositeEffectInstance;
            }
            Object.defineProperty(CompositeEffect.prototype, "children", {
                /**
                 * 包含此 CompositeEffect 的子效果的数组。
                 */
                get: function () {
                    return this._children;
                },
                set: function (value) {
                    var i = 0;
                    if (this._children)
                        for (i = 0; i < this._children.length; ++i)
                            if (this._children[i])
                                (this._children[i]).parentCompositeEffect = null;
                    this._children = value;
                    if (this._children)
                        for (i = 0; i < this._children.length; ++i)
                            if (this._children[i])
                                (this._children[i]).parentCompositeEffect = this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CompositeEffect.prototype, "compositeDuration", {
                /**
                 * 返回此效果的持续时间，由所有子效果的持续时间进行定义。
                 * 这会考虑所有子效果的 startDelay 和重复信息，以及其持续时间，并返回相应的结果。
                 */
                get: function () {
                    return this.duration;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            CompositeEffect.prototype.createInstance = function (target) {
                if (target === void 0) { target = null; }
                if (!this.childTargets)
                    this.childTargets = [target];
                var newInstance = _super.prototype.createInstance.call(this, target);
                this.childTargets = null;
                return newInstance;
            };
            /**
             * @inheritDoc
             */
            CompositeEffect.prototype.createInstances = function (targets) {
                if (targets === void 0) { targets = null; }
                if (!targets)
                    targets = this.targets;
                this.childTargets = targets;
                var newInstance = this.createInstance();
                this.childTargets = null;
                return newInstance ? [newInstance] : [];
            };
            /**
             * @inheritDoc
             */
            CompositeEffect.prototype.initInstance = function (instance) {
                _super.prototype.initInstance.call(this, instance);
                var compInst = instance;
                var targets = this.childTargets;
                if (!(targets instanceof Array))
                    targets = [targets];
                if (this.children) {
                    var n = this.children.length;
                    for (var i = 0; i < n; i++) {
                        var childEffect = this.children[i];
                        if (childEffect.targets.length == 0) {
                            compInst.addChildSet(this.children[i].createInstances(targets));
                        }
                        else {
                            compInst.addChildSet(this.children[i].createInstances(childEffect.targets));
                        }
                    }
                }
            };
            /**
             * 将新的子效果添加到此复合效果。
             * Sequence 效果按照子效果的添加顺序播放子效果，一次播放一个。
             * Parallel 效果同时播放所有子效果；添加子效果的顺序无关紧要。
             */
            CompositeEffect.prototype.addChild = function (childEffect) {
                this.children.push(childEffect);
                childEffect.parentCompositeEffect = this;
            };
            return CompositeEffect;
        })(gui.Effect);
        gui.CompositeEffect = CompositeEffect;
        CompositeEffect.prototype.__class__ = "egret.gui.CompositeEffect";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
