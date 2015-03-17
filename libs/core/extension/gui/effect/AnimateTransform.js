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
        var AnimateTransform = (function (_super) {
            __extends(AnimateTransform, _super);
            function AnimateTransform(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                /**
                 * 指定在转换效果开始播放时，该效果是否围绕目标的中心 (width/2, height/2) 发生。
                 * 如果未设置该标志，转换中心将由对象的转换中心 (transformX, transformY, transformZ) 和此效果中的 transformX, transformY, transformZ 属性决定。
                 * 也就是说，转换中心就是目标对象的转换中心，其中的任何 transformX、transformY、transformZ 属性（如果已设置）都将由效果中的这些值覆盖。
                 */
                this.autoCenterTransform = false;
                this.instanceClass = gui.AnimateTransformInstance;
            }
            AnimateTransform.prototype.getOwningParallelEffect = function () {
                var prevParent = null;
                var parent = this.parentCompositeEffect;
                while (parent) {
                    if (parent instanceof gui.Sequence)
                        break;
                    prevParent = parent;
                    parent = parent.parentCompositeEffect;
                }
                return prevParent;
            };
            AnimateTransform.prototype.createInstance = function (target) {
                if (target === void 0) { target = null; }
                if (!target)
                    target = this.target;
                var sharedInstance = null;
                var topmostParallel = this.getOwningParallelEffect();
                if (topmostParallel != null)
                    sharedInstance = (AnimateTransform.getSharedInstance(topmostParallel, target));
                if (!sharedInstance) {
                    var newInstance = _super.prototype.createInstance.call(this, target);
                    if (topmostParallel)
                        AnimateTransform.storeSharedInstance(topmostParallel, target, newInstance);
                    return newInstance;
                }
                else {
                    this.initInstance(sharedInstance);
                    return null;
                }
            };
            AnimateTransform.prototype.effectStartHandler = function (event) {
                _super.prototype.effectStartHandler.call(this, event);
                var topmostParallel = this.getOwningParallelEffect();
                if (topmostParallel != null)
                    AnimateTransform.removeSharedInstance(topmostParallel, event.effectInstance.target);
            };
            /**
             * 获取转换中心
             */
            AnimateTransform.prototype.computeTransformCenterForTarget = function (target, valueMap) {
                if (valueMap === void 0) { valueMap = null; }
                var computedTransformCenter;
                if (this.autoCenterTransform) {
                    var w = (valueMap != null && valueMap["width"] !== undefined) ? valueMap["width"] : target.width;
                    var h = (valueMap != null && valueMap["height"] !== undefined) ? valueMap["height"] : target.height;
                    computedTransformCenter = new egret.Point(w / 2, h / 2);
                }
                else {
                    computedTransformCenter = new egret.Point(0, 0);
                    if (!isNaN(this.transformX))
                        computedTransformCenter.x = this.transformX;
                    if (!isNaN(this.transformY))
                        computedTransformCenter.y = this.transformY;
                }
                return computedTransformCenter;
            };
            AnimateTransform.prototype.insertKeyframe = function (keyframes, newKF) {
                for (var i = 0; i < keyframes.length; i++) {
                    if (keyframes[i].time > newKF.time) {
                        keyframes.splice(i, 0, newKF);
                        return;
                    }
                }
                keyframes.push(newKF);
            };
            AnimateTransform.prototype.addMotionPath = function (property, valueFrom, valueTo, valueBy) {
                if (valueFrom === void 0) { valueFrom = NaN; }
                if (valueTo === void 0) { valueTo = NaN; }
                if (valueBy === void 0) { valueBy = NaN; }
                if (isNaN(valueFrom)) {
                    if (!isNaN(valueTo) && !isNaN(valueBy))
                        valueFrom = valueTo - valueBy;
                }
                var mp = new gui.MotionPath(property);
                mp.keyframes = [new gui.Keyframe(0, valueFrom), new gui.Keyframe(this.duration, valueTo, valueBy)];
                mp.keyframes[1].easer = this.easer;
                if (this.motionPaths) {
                    var n = this.motionPaths.length;
                    for (var i = 0; i < n; i++) {
                        var prop = (this.motionPaths[i]);
                        if (prop.property == mp.property) {
                            for (var j = 0; j < mp.keyframes.length; j++) {
                                this.insertKeyframe(prop.keyframes, mp.keyframes[j]);
                            }
                            return;
                        }
                    }
                }
                else {
                    this.motionPaths = new Array();
                }
                this.motionPaths.push(mp);
            };
            AnimateTransform.prototype.isValidValue = function (value) {
                return (typeof (value) == "number" && !isNaN(value)) || (!(typeof (value) == "number") && value !== null);
            };
            AnimateTransform.prototype.initInstance = function (instance) {
                var i = 0;
                var adjustedDuration = this.duration;
                var transformInstance = instance;
                if (this.motionPaths) {
                    var instanceAnimProps = [];
                    for (i = 0; i < this.motionPaths.length; ++i) {
                        instanceAnimProps[i] = this.motionPaths[i].clone();
                        var mp = (instanceAnimProps[i]);
                        if (mp.keyframes) {
                            for (var j = 0; j < mp.keyframes.length; ++j) {
                                var kf = (mp.keyframes[j]);
                                if (isNaN(kf.time))
                                    kf.time = this.duration;
                                if (this.startDelay != 0)
                                    kf.time += this.startDelay;
                            }
                            adjustedDuration = Math.max(adjustedDuration, mp.keyframes[mp.keyframes.length - 1].time);
                        }
                    }
                    var globalStartTime = this.getGlobalStartTime();
                    for (i = 0; i < instanceAnimProps.length; ++i)
                        transformInstance.addMotionPath(instanceAnimProps[i], globalStartTime);
                }
                if (transformInstance.initialized)
                    return;
                transformInstance.initialized = true;
                if (!this.autoCenterTransform)
                    transformInstance.transformCenter = this.computeTransformCenterForTarget(instance.target);
                transformInstance.autoCenterTransform = this.autoCenterTransform;
                var tmpStartDelay = this.startDelay;
                this.startDelay = 0;
                var tmpAnimProps = this.motionPaths;
                this.motionPaths = null;
                _super.prototype.initInstance.call(this, instance);
                this.startDelay = tmpStartDelay;
                this.motionPaths = tmpAnimProps;
                transformInstance.duration = Math.max(this.duration, adjustedDuration);
            };
            AnimateTransform.prototype.getGlobalStartTime = function () {
                var globalStartTime = 0;
                var parent = this.parentCompositeEffect;
                while (parent) {
                    globalStartTime += parent.startDelay;
                    if (parent instanceof gui.Sequence) {
                        var sequence = parent;
                        for (var i = 0; i < sequence.children.length; ++i) {
                            var child = sequence.children[i];
                            if (child == this)
                                break;
                            if (child instanceof gui.CompositeEffect)
                                globalStartTime += child.compositeDuration;
                            else
                                globalStartTime += child.startDelay + (child.duration * child.repeatCount) + (child.repeatDelay + (child.repeatCount - 1));
                        }
                    }
                    parent = parent.parentCompositeEffect;
                }
                return globalStartTime;
            };
            /**
             * 获取共享的实例
             */
            AnimateTransform.getSharedInstance = function (topmostParallel, target) {
                if (topmostParallel != null) {
                    var sharedObjectMap = AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                    if (sharedObjectMap != null)
                        return sharedObjectMap[target.hashCode];
                }
                return null;
            };
            AnimateTransform.removeSharedInstance = function (topmostParallel, target) {
                if (topmostParallel != null) {
                    var sharedObjectMap = AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                    if (!sharedObjectMap)
                        return;
                    if (sharedObjectMap[target.hashCode]) {
                        delete sharedObjectMap[target.hashCode];
                        AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] -= 1;
                        if (AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] <= 0) {
                            delete AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                            delete AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode];
                        }
                    }
                }
            };
            AnimateTransform.storeSharedInstance = function (topmostParallel, target, effectInstance) {
                if (topmostParallel != null) {
                    var sharedObjectMap = AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                    if (!sharedObjectMap) {
                        sharedObjectMap = {};
                        AnimateTransform.sharedObjectMaps[topmostParallel.hashCode] = sharedObjectMap;
                    }
                    if (!sharedObjectMap[target.hashCode]) {
                        if (!AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode])
                            AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] = 1;
                        else
                            AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] += 1;
                    }
                    sharedObjectMap[target.hashCode] = effectInstance;
                }
            };
            AnimateTransform.sharedObjectMaps = {};
            AnimateTransform.sharedObjectRefcounts = {};
            return AnimateTransform;
        })(gui.Animate);
        gui.AnimateTransform = AnimateTransform;
        AnimateTransform.prototype.__class__ = "egret.gui.AnimateTransform";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
