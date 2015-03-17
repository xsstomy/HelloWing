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
        var Effect = (function (_super) {
            __extends(Effect, _super);
            function Effect(target) {
                if (target === void 0) { target = null; }
                _super.call(this);
                this._instances = [];
                this._isPaused = false;
                this._duration = 500;
                this.durationExplicitlySet = false;
                this._perElementOffset = 0;
                /**
                 * 效果的重复次数。可能的值为任何大于等于 0 的整数。
                 * 值为 1 表示播放一次效果。值为 0 表示无限制地循环播放效果，直到通过调用 end() 方法停止播放。
                 */
                this.repeatCount = 1;
                /**
                 * 重复播放效果前需要等待的时间（以毫秒为单位）。可能的值为任何大于等于 0 的整数。
                 */
                this.repeatDelay = 0;
                /**
                 * 开始播放效果前需要等待的时间（以毫秒为单位）。
                 * 此值可以是任何大于或等于 0 的整数。
                 * 如果使用 repeatCount 属性重复播放效果，则只在首次播放效果时应用 startDelay。
                 */
                this.startDelay = 0;
                this._targets = [];
                this._playheadTime = 0;
                this.target = target;
            }
            Object.defineProperty(Effect.prototype, "className", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var name = egret.getQualifiedClassName(this);
                    var index = name.indexOf("::");
                    if (index != -1)
                        name = name.substr(index + 2);
                    return name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "duration", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.durationExplicitlySet && this.parentCompositeEffect) {
                        return this.parentCompositeEffect.duration;
                    }
                    else {
                        return this._duration;
                    }
                },
                set: function (value) {
                    this.durationExplicitlySet = true;
                    this._duration = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "isPlaying", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._instances && this._instances.length > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "isPaused", {
                /**
                 * 是否处于暂停状态，当调用了paused()方法后此属性为true
                 */
                get: function () {
                    if (this.isPlaying)
                        return this._isPaused;
                    else
                        return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "perElementOffset", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._perElementOffset;
                },
                set: function (value) {
                    this._perElementOffset = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "target", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (this._targets.length > 0)
                        return this._targets[0];
                    else
                        return null;
                },
                set: function (value) {
                    this._targets.splice(0);
                    if (value)
                        this._targets[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "targets", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._targets;
                },
                set: function (value) {
                    var n = value.length;
                    for (var i = n - 1; i >= 0; i--) {
                        if (value[i] == null)
                            value.splice(i, 1);
                    }
                    this._targets = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "playheadTime", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    for (var i = 0; i < this._instances.length; i++) {
                        if (this._instances[i])
                            return (this._instances[i]).playheadTime;
                    }
                    return this._playheadTime;
                },
                set: function (value) {
                    var started = false;
                    if (this._instances.length == 0) {
                        this.play();
                        started = true;
                    }
                    for (var i = 0; i < this._instances.length; i++) {
                        if (this._instances[i])
                            (this._instances[i]).playheadTime = value;
                    }
                    if (started)
                        this.pause();
                    this._playheadTime = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            Effect.prototype.createInstances = function (targets) {
                if (targets === void 0) { targets = null; }
                if (!targets)
                    targets = this.targets;
                var newInstances = [];
                var offsetDelay = 0;
                var length = targets.length;
                for (var i = 0; i < length; i++) {
                    var target = targets[i];
                    var newInstance = this.createInstance(target);
                    if (newInstance) {
                        newInstance.startDelay += offsetDelay;
                        offsetDelay += this.perElementOffset;
                        newInstances.push(newInstance);
                    }
                }
                return newInstances;
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.createInstance = function (target) {
                if (target === void 0) { target = null; }
                if (!target)
                    target = this.target;
                var newInstance = (new this.instanceClass(target));
                this.initInstance(newInstance);
                newInstance.addEventListener(gui.EffectEvent.EFFECT_START, this.effectStartHandler, this);
                newInstance.addEventListener(gui.EffectEvent.EFFECT_STOP, this.effectStopHandler, this);
                newInstance.addEventListener(gui.EffectEvent.EFFECT_END, this.effectEndHandler, this);
                this._instances.push(newInstance);
                return newInstance;
            };
            /**
             *  将效果的属性复制到效果实例。
             *  <p>创建自定义效果时覆盖此方法，将属性从 Effect 类复制到效果实例类。
             * 进行覆盖时，请调用 super.initInstance()。 </p>
             *  @param EffectInstance 要初始化的效果实例。
             */
            Effect.prototype.initInstance = function (instance) {
                instance.duration = this.duration;
                instance.durationExplicitlySet = this.durationExplicitlySet;
                instance.effect = this;
                instance.repeatCount = this.repeatCount;
                instance.repeatDelay = this.repeatDelay;
                instance.startDelay = this.startDelay;
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.deleteInstance = function (instance) {
                instance.removeEventListener(gui.EffectEvent.EFFECT_START, this.effectStartHandler, this);
                instance.removeEventListener(gui.EffectEvent.EFFECT_STOP, this.effectStopHandler, this);
                instance.removeEventListener(gui.EffectEvent.EFFECT_END, this.effectEndHandler, this);
                var n = this._instances.length;
                for (var i = 0; i < n; i++) {
                    if (this._instances[i] === instance)
                        this._instances.splice(i, 1);
                }
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.play = function (targets, playReversedFromEnd) {
                if (targets === void 0) { targets = null; }
                if (playReversedFromEnd === void 0) { playReversedFromEnd = false; }
                this.effectStopped = false;
                this._isPaused = false;
                this.playReversed = playReversedFromEnd;
                var newInstances = this.createInstances(targets);
                var n = newInstances.length;
                for (var i = 0; i < n; i++) {
                    var newInstance = (newInstances[i]);
                    newInstance.playReversed = playReversedFromEnd;
                    newInstance.startEffect();
                }
                return newInstances;
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.pause = function () {
                if (this.isPlaying && !this._isPaused) {
                    this._isPaused = true;
                    var n = this._instances.length;
                    for (var i = 0; i < n; i++) {
                        (this._instances[i]).pause();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.stop = function () {
                var n = this._instances.length - 1;
                for (var i = n; i >= 0; i--) {
                    var instance = (this._instances[i]);
                    if (instance)
                        instance.stop();
                }
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.resume = function () {
                if (this.isPlaying && this._isPaused) {
                    this._isPaused = false;
                    var n = this._instances.length;
                    for (var i = 0; i < n; i++) {
                        (this._instances[i]).resume();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.reverse = function () {
                if (this.isPlaying) {
                    var n = this._instances.length;
                    for (var i = 0; i < n; i++) {
                        (this._instances[i]).reverse();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            Effect.prototype.end = function (effectInstance) {
                if (effectInstance === void 0) { effectInstance = null; }
                if (effectInstance) {
                    effectInstance.end();
                }
                else {
                    var n = this._instances.length;
                    for (var i = n - 1; i >= 0; i--) {
                        var instance = (this._instances[i]);
                        if (instance)
                            instance.end();
                    }
                }
            };
            /**
             * 当效果实例开始播放时调用此方法。
             */
            Effect.prototype.effectStartHandler = function (event) {
                this.dispatchEvent(event);
            };
            /**
             * 当效果实例已被 stop() 方法调用停止时调用。
             */
            Effect.prototype.effectStopHandler = function (event) {
                this.dispatchEvent(event);
                this.effectStopped = true;
            };
            /**
             * 当效果实例完成播放时调用。
             */
            Effect.prototype.effectEndHandler = function (event) {
                var instance = (event.effectInstance);
                this.deleteInstance(instance);
                this.dispatchEvent(event);
            };
            return Effect;
        })(egret.EventDispatcher);
        gui.Effect = Effect;
        Effect.prototype.__class__ = "egret.gui.Effect";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
