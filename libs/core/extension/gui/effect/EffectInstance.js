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
        var EffectInstance = (function (_super) {
            __extends(EffectInstance, _super);
            function EffectInstance(target) {
                _super.call(this);
                /**
                 * delayTimer开始的时间
                 */
                this.delayStartTime = 0;
                /**
                 * 暂停时delayTimer经过的时间
                 */
                this.delayElapsedTime = 0;
                /**
                 * 是否显式设置了持续时间
                 */
                this.durationExplicitlySet = false;
                /**
                 * 已播放实例的次数。
                 */
                this.playCount = 0;
                /**
                 * 调用end()方法结束时，防止效果重复的的标志
                 */
                this.stopRepeat = false;
                this._duration = 500;
                this._repeatCount = 0;
                this._repeatDelay = 0;
                this._startDelay = 0;
                this.target = target;
            }
            Object.defineProperty(EffectInstance.prototype, "actualDuration", {
                /**
                 * 实际的持续时间包含startDelay，repeatDelay，repeatCount这些值
                 */
                get: function () {
                    var value = NaN;
                    if (this.repeatCount > 0) {
                        value = this.duration * this.repeatCount + (this.repeatDelay * (this.repeatCount - 1)) + this.startDelay;
                    }
                    return value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EffectInstance.prototype, "className", {
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
            Object.defineProperty(EffectInstance.prototype, "duration", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.durationExplicitlySet && this.parentCompositeEffectInstance) {
                        return this.parentCompositeEffectInstance.duration;
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
            Object.defineProperty(EffectInstance.prototype, "effect", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._effect;
                },
                set: function (value) {
                    this._effect = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EffectInstance.prototype, "playheadTime", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return Math.max(this.playCount - 1, 0) * (this.duration + this.repeatDelay) + (this.playReversed ? 0 : this.startDelay);
                },
                set: function (value) {
                    this._setPlayheadTime(value);
                },
                enumerable: true,
                configurable: true
            });
            EffectInstance.prototype._setPlayheadTime = function (value) {
                if (this.delayTimer && this.delayTimer.running) {
                    this.delayTimer.reset();
                    if (value < this.startDelay) {
                        this.delayTimer = new egret.Timer(this.startDelay - value, 1);
                        this.delayStartTime = egret.getTimer();
                        this.delayTimer.addEventListener(egret.TimerEvent.TIMER, this.delayTimerHandler, this);
                        this.delayTimer.start();
                    }
                    else {
                        this.playCount = 0;
                        this.play();
                    }
                }
            };
            Object.defineProperty(EffectInstance.prototype, "playReversed", {
                /**
                 * 内部指定效果是否在反向播放，在播放之前设置此属性
                 */
                get: function () {
                    return this._playReversed;
                },
                set: function (value) {
                    this._setPlayReversed(value);
                },
                enumerable: true,
                configurable: true
            });
            EffectInstance.prototype._setPlayReversed = function (value) {
                this._playReversed = value;
            };
            Object.defineProperty(EffectInstance.prototype, "repeatCount", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._repeatCount;
                },
                set: function (value) {
                    this._repeatCount = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EffectInstance.prototype, "repeatDelay", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._repeatDelay;
                },
                set: function (value) {
                    this._repeatDelay = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EffectInstance.prototype, "startDelay", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._startDelay;
                },
                set: function (value) {
                    this._startDelay = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EffectInstance.prototype, "target", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._target;
                },
                set: function (value) {
                    this._target = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.startEffect = function () {
                if (this.startDelay > 0 && !this.playReversed) {
                    this.delayTimer = new egret.Timer(this.startDelay, 1);
                    this.delayStartTime = egret.getTimer();
                    this.delayTimer.addEventListener(egret.TimerEvent.TIMER, this.delayTimerHandler, this);
                    this.delayTimer.start();
                }
                else {
                    this.play();
                }
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.play = function () {
                this.playCount++;
                this.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_START, false, false, this));
                if (this.target && "dispatchEvent" in this.target) {
                    this.target.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_START, false, false, this));
                }
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.pause = function () {
                if (this.delayTimer && this.delayTimer.running && !isNaN(this.delayStartTime)) {
                    this.delayTimer.stop();
                    this.delayElapsedTime = egret.getTimer() - this.delayStartTime;
                }
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.stop = function () {
                if (this.delayTimer)
                    this.delayTimer.reset();
                this.stopRepeat = true;
                this.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_STOP, false, false, this));
                if (this.target && ("dispatchEvent" in this.target))
                    this.target.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_STOP, false, false, this));
                this.finishEffect();
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.resume = function () {
                if (this.delayTimer && !this.delayTimer.running && !isNaN(this.delayElapsedTime)) {
                    this.delayTimer.delay = !this.playReversed ? this.delayTimer.delay - this.delayElapsedTime : this.delayElapsedTime;
                    this.delayStartTime = egret.getTimer();
                    this.delayTimer.start();
                }
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.reverse = function () {
                if (this.repeatCount > 0)
                    this.playCount = this.repeatCount - this.playCount + 1;
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.end = function () {
                if (this.delayTimer)
                    this.delayTimer.reset();
                this.stopRepeat = true;
                this.finishEffect();
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.finishEffect = function () {
                this.playCount = 0;
                this.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_END, false, false, this));
                if (this.target && ("dispatchEvent" in this.target)) {
                    this.target.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_END, false, false, this));
                }
            };
            /**
             * @inheritDoc
             */
            EffectInstance.prototype.finishRepeat = function () {
                if (!this.stopRepeat && this.playCount != 0 && (this.playCount < this.repeatCount || this.repeatCount == 0)) {
                    if (this.repeatDelay > 0) {
                        this.delayTimer = new egret.Timer(this.repeatDelay, 1);
                        this.delayStartTime = egret.getTimer();
                        this.delayTimer.addEventListener(egret.TimerEvent.TIMER, this.delayTimerHandler, this);
                        this.delayTimer.start();
                    }
                    else {
                        this.play();
                    }
                }
                else {
                    this.finishEffect();
                }
            };
            EffectInstance.prototype.playWithNoDuration = function () {
                this.duration = 0;
                this.repeatCount = 1;
                this.repeatDelay = 0;
                this.startDelay = 0;
                this.startEffect();
            };
            EffectInstance.prototype.delayTimerHandler = function (event) {
                this.delayTimer.reset();
                this.delayStartTime = NaN;
                this.delayElapsedTime = NaN;
                this.play();
            };
            return EffectInstance;
        })(egret.EventDispatcher);
        gui.EffectInstance = EffectInstance;
        EffectInstance.prototype.__class__ = "egret.gui.EffectInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
