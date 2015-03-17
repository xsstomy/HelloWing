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
        var CompositeEffectInstance = (function (_super) {
            __extends(CompositeEffectInstance, _super);
            function CompositeEffectInstance(target) {
                _super.call(this, target);
                /**
                 * 正在播放或者等待播放的EffectInstances
                 */
                this.activeEffectQueue = [];
                this._playheadTime = 0;
                this.childSets = [];
            }
            Object.defineProperty(CompositeEffectInstance.prototype, "actualDuration", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var value = NaN;
                    if (this.repeatCount > 0) {
                        value = this.durationWithoutRepeat * this.repeatCount + (this.repeatDelay * (this.repeatCount - 1)) + this.startDelay;
                    }
                    return value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CompositeEffectInstance.prototype, "playheadTime", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._playheadTime;
                },
                enumerable: true,
                configurable: true
            });
            CompositeEffectInstance.prototype._setPlayheadTime = function (value) {
                if (this.timerAnimation)
                    this.timerAnimation.playheadTime = value;
                else
                    this._playheadTime = value;
                _super.prototype._setPlayheadTime.call(this, value);
            };
            Object.defineProperty(CompositeEffectInstance.prototype, "durationWithoutRepeat", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.play = function () {
                this.timerAnimation = new gui.Animation(this.animationUpdate, this);
                this.timerAnimation.duration = this.durationWithoutRepeat;
                this.timerAnimation.motionPaths = [new gui.SimpleMotionPath("timer", 0, 0)];
                this.timerAnimation.endFunction = this.animationEnd;
                this.timerAnimation.play();
                _super.prototype.play.call(this);
            };
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.pause = function () {
                _super.prototype.pause.call(this);
                if (this.timerAnimation)
                    this.timerAnimation.pause();
            };
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.stop = function () {
                _super.prototype.stop.call(this);
                if (this.timerAnimation)
                    this.timerAnimation.stop();
            };
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.end = function () {
                _super.prototype.end.call(this);
                if (this.timerAnimation)
                    this.timerAnimation.end();
            };
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.resume = function () {
                _super.prototype.resume.call(this);
                if (this.timerAnimation)
                    this.timerAnimation.resume();
            };
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.reverse = function () {
                _super.prototype.reverse.call(this);
                this._setPlayReversed(!this.playReversed);
                if (this.timerAnimation)
                    this.timerAnimation.reverse();
            };
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.finishEffect = function () {
                this.activeEffectQueue = null;
                _super.prototype.finishEffect.call(this);
            };
            /**
             * 向此 Composite 效果添加一组新的子效果。
             * Sequence 效果将按子效果组的添加顺序一次播放一个子效果组。
             * Parallel 效果将同时播放所有子效果组，而不考虑这些子效果组的添加顺序。
             */
            CompositeEffectInstance.prototype.addChildSet = function (childSet) {
                if (childSet) {
                    var n = childSet.length;
                    if (n > 0) {
                        if (!this.childSets)
                            this.childSets = [childSet];
                        else
                            this.childSets.push(childSet);
                        for (var i = 0; i < n; i++) {
                            childSet[i].addEventListener(gui.EffectEvent.EFFECT_END, this.effectEndHandler, this);
                            childSet[i].parentCompositeEffectInstance = this;
                        }
                    }
                }
            };
            /**
             * @inheritDoc
             */
            CompositeEffectInstance.prototype.playWithNoDuration = function () {
                _super.prototype.playWithNoDuration.call(this);
                this.end();
            };
            CompositeEffectInstance.prototype.animationUpdate = function (animation) {
                this._playheadTime = this.timerAnimation ? this.timerAnimation.playheadTime : this._playheadTime;
            };
            CompositeEffectInstance.prototype.animationEnd = function (animation) {
                this._playheadTime = this.timerAnimation ? this.timerAnimation.playheadTime : this._playheadTime;
            };
            /**
             * 在每个子效果完成播放时调用。子类必须实现此函数。
             */
            CompositeEffectInstance.prototype.onEffectEnd = function (childEffect) {
            };
            CompositeEffectInstance.prototype.effectEndHandler = function (event) {
                this.onEffectEnd(event.effectInstance);
            };
            return CompositeEffectInstance;
        })(gui.EffectInstance);
        gui.CompositeEffectInstance = CompositeEffectInstance;
        CompositeEffectInstance.prototype.__class__ = "egret.gui.CompositeEffectInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
