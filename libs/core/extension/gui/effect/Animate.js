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
        var Animate = (function (_super) {
            __extends(Animate, _super);
            function Animate(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.numUpdateListeners = 0;
                this._interpolator = null;
                this._repeatBehavior = gui.RepeatBehavior.LOOP;
                this._disableLayout = false;
                this.instanceClass = gui.AnimateInstance;
            }
            Object.defineProperty(Animate.prototype, "motionPaths", {
                /**
                 * MotionPath 对象的 Vector，其中的每个对象都带有正在设置动画的属性的名称以及该属性在动画过程中所采用的值。
                 * 此 Vector 优先于 Animate 的子类中所声明的任何属性。
                 * 例如，如果此 Array 是直接在 Move 效果上设置的，则会忽略 Move 效果的任何属性（如 xFrom）。
                 */
                get: function () {
                    return this._motionPaths;
                },
                set: function (value) {
                    this._motionPaths = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animate.prototype, "easer", {
                /**
                 * 此效果的缓动行为，默认为Sine(.5)
                 */
                get: function () {
                    return this._easer;
                },
                set: function (value) {
                    this._easer = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animate.prototype, "interpolator", {
                /**
                 * 此效果计算属性的起始值和结束值之间的值所用的插补器。
                 * 默认情况下，NumberInterpolator 类处理内插值，
                 */
                get: function () {
                    return this._interpolator;
                },
                set: function (value) {
                    this._interpolator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animate.prototype, "repeatBehavior", {
                /**
                 * 一种重复效果的行为。值RepeatBehavior类中定义的常量。默认为RepeatBehavior.LOOP
                 */
                get: function () {
                    return this._repeatBehavior;
                },
                set: function (value) {
                    this._repeatBehavior = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animate.prototype, "disableLayout", {
                /**
                 * 如果为 true，则对目标对象禁用任何布局约束。效果完成时，将还原这些属性。
                 */
                get: function () {
                    return this._disableLayout;
                },
                set: function (value) {
                    this._disableLayout = value;
                },
                enumerable: true,
                configurable: true
            });
            Animate.prototype.initInstance = function (instance) {
                _super.prototype.initInstance.call(this, instance);
                var animateInstance = instance;
                animateInstance.addEventListener(gui.EffectEvent.EFFECT_REPEAT, this.animationEventHandler, this);
                if (this.numUpdateListeners > 0)
                    animateInstance.addEventListener(gui.EffectEvent.EFFECT_UPDATE, this.animationEventHandler, this);
                animateInstance.easer = this.easer;
                if (this.interpolator)
                    animateInstance.interpolator = this.interpolator;
                if (isNaN(this.repeatCount))
                    animateInstance.repeatCount = this.repeatCount;
                animateInstance.repeatBehavior = this.repeatBehavior;
                animateInstance.disableLayout = this.disableLayout;
                if (this.motionPaths) {
                    animateInstance.motionPaths = new Array();
                    for (var i = 0; i < this.motionPaths.length; ++i)
                        animateInstance.motionPaths[i] = this.motionPaths[i].clone();
                }
            };
            Animate.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
                if (useCapture === void 0) { useCapture = false; }
                if (priority === void 0) { priority = 0; }
                _super.prototype.addEventListener.call(this, type, listener, thisObject, useCapture, priority);
                if (type == gui.EffectEvent.EFFECT_UPDATE)
                    ++this.numUpdateListeners;
            };
            Animate.prototype.removeEventListener = function (type, listener, useCapture) {
                if (useCapture === void 0) { useCapture = false; }
                _super.prototype.removeEventListener.call(this, type, listener, this, useCapture);
                if (type == gui.EffectEvent.EFFECT_UPDATE)
                    --this.numUpdateListeners;
            };
            /**
             * 派发动画事件
             */
            Animate.prototype.animationEventHandler = function (event) {
                this.dispatchEvent(event);
            };
            return Animate;
        })(gui.Effect);
        gui.Animate = Animate;
        Animate.prototype.__class__ = "egret.gui.Animate";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
