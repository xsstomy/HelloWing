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
        var ParallelInstance = (function (_super) {
            __extends(ParallelInstance, _super);
            function ParallelInstance(target) {
                _super.call(this, target);
                this.isReversed = false;
            }
            Object.defineProperty(ParallelInstance.prototype, "durationWithoutRepeat", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var _duration = 0;
                    var n = this.childSets.length;
                    for (var i = 0; i < n; i++) {
                        var instances = this.childSets[i];
                        _duration = Math.max(instances[0].actualDuration, _duration);
                    }
                    return _duration;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype._setPlayheadTime = function (value) {
                this._setPlayheadTime(value);
                var compositeDur = (this.effect).compositeDuration;
                var firstCycleDur = compositeDur + this.startDelay + this.repeatDelay;
                var laterCycleDur = compositeDur + this.repeatDelay;
                var totalDur = firstCycleDur + laterCycleDur * (this.repeatCount - 1);
                var childPlayheadTime;
                if (value <= firstCycleDur) {
                    childPlayheadTime = Math.min(value - this.startDelay, compositeDur);
                    this.playCount = 1;
                }
                else {
                    if (value >= totalDur && this.repeatCount != 0) {
                        childPlayheadTime = compositeDur;
                        this.playCount = this.repeatCount;
                    }
                    else {
                        var valueAfterFirstCycle = value - firstCycleDur;
                        childPlayheadTime = valueAfterFirstCycle % laterCycleDur;
                        this.playCount = 1 + valueAfterFirstCycle / laterCycleDur;
                    }
                }
                for (var i = 0; i < this.childSets.length; i++) {
                    var instances = this.childSets[i];
                    var m = instances.length;
                    for (var j = 0; j < m; j++)
                        instances[j].playheadTime = this.playReversed ? Math.max(0, (childPlayheadTime - (this.durationWithoutRepeat - instances[j].actualDuration))) : childPlayheadTime;
                }
                if (this.playReversed && this.replayEffectQueue != null && this.replayEffectQueue.length > 0) {
                    var position = this.durationWithoutRepeat - this.playheadTime;
                    var numDone = this.replayEffectQueue.length;
                    for (i = numDone - 1; i >= 0; i--) {
                        var childEffect = this.replayEffectQueue[i];
                        if (position <= childEffect.actualDuration) {
                            if (this.activeEffectQueue == null)
                                this.activeEffectQueue = [];
                            this.activeEffectQueue.push(childEffect);
                            this.replayEffectQueue.splice(i, 1);
                            childEffect.playReversed = this.playReversed;
                            childEffect.startEffect();
                        }
                    }
                }
            };
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype.play = function () {
                this.doneEffectQueue = [];
                this.activeEffectQueue = [];
                this.replayEffectQueue = [];
                _super.prototype.play.call(this);
                var n = 0;
                var i = 0;
                n = this.childSets.length;
                for (i = 0; i < n; i++) {
                    var instances = this.childSets[i];
                    var m = instances.length;
                    for (var j = 0; j < m && this.activeEffectQueue != null; j++) {
                        var childEffect = instances[j];
                        if (this.playReversed && childEffect.actualDuration < this.durationWithoutRepeat) {
                            this.replayEffectQueue.push(childEffect);
                            this.startTimer();
                        }
                        else {
                            childEffect.playReversed = this.playReversed;
                            this.activeEffectQueue.push(childEffect);
                        }
                    }
                }
                if (this.activeEffectQueue.length > 0) {
                    var queueCopy = this.activeEffectQueue.slice(0);
                    for (i = 0; i < queueCopy.length; i++) {
                        queueCopy[i].startEffect();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype.pause = function () {
                _super.prototype.pause.call(this);
                if (this.activeEffectQueue) {
                    var n = this.activeEffectQueue.length;
                    for (var i = 0; i < n; i++) {
                        this.activeEffectQueue[i].pause();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype.stop = function () {
                this.stopTimer();
                if (this.activeEffectQueue) {
                    var queueCopy = this.activeEffectQueue.concat();
                    this.activeEffectQueue = null;
                    var n = queueCopy.length;
                    for (var i = 0; i < n; i++) {
                        if (queueCopy[i])
                            queueCopy[i].stop();
                    }
                }
                _super.prototype.stop.call(this);
            };
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype.resume = function () {
                _super.prototype.resume.call(this);
                if (this.activeEffectQueue) {
                    var n = this.activeEffectQueue.length;
                    for (var i = 0; i < n; i++) {
                        this.activeEffectQueue[i].resume();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype.reverse = function () {
                _super.prototype.reverse.call(this);
                var n = 0;
                var i = 0;
                if (this.isReversed) {
                    n = this.activeEffectQueue.length;
                    for (i = 0; i < n; i++) {
                        this.activeEffectQueue[i].reverse();
                    }
                    this.stopTimer();
                }
                else {
                    this.replayEffectQueue = this.doneEffectQueue.splice(0);
                    n = this.activeEffectQueue.length;
                    for (i = 0; i < n; i++) {
                        this.activeEffectQueue[i].reverse();
                    }
                    this.startTimer();
                }
                this.isReversed = !this.isReversed;
            };
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype.end = function () {
                this.endEffectCalled = true;
                this.stopTimer();
                if (this.activeEffectQueue) {
                    var queueCopy = this.activeEffectQueue.concat();
                    this.activeEffectQueue = null;
                    var n = queueCopy.length;
                    for (var i = 0; i < n; i++) {
                        if (queueCopy[i])
                            queueCopy[i].end();
                    }
                }
                _super.prototype.end.call(this);
            };
            /**
             * @inheritDoc
             */
            ParallelInstance.prototype.onEffectEnd = function (childEffect) {
                if (this.endEffectCalled || this.activeEffectQueue == null)
                    return;
                var n = this.activeEffectQueue.length;
                for (var i = 0; i < n; i++) {
                    if (childEffect == this.activeEffectQueue[i]) {
                        this.doneEffectQueue.push(childEffect);
                        this.activeEffectQueue.splice(i, 1);
                        break;
                    }
                }
                if (n == 1) {
                    this.finishRepeat();
                }
            };
            ParallelInstance.prototype.startTimer = function () {
                if (!this.timer) {
                    this.timer = new egret.Timer(10);
                    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
                }
                this.timer.start();
            };
            ParallelInstance.prototype.stopTimer = function () {
                if (this.timer)
                    this.timer.reset();
            };
            ParallelInstance.prototype.timerHandler = function (event) {
                var position = this.durationWithoutRepeat - this.playheadTime;
                var numDone = this.replayEffectQueue.length;
                if (numDone == 0) {
                    this.stopTimer();
                    return;
                }
                for (var i = numDone - 1; i >= 0; i--) {
                    var childEffect = this.replayEffectQueue[i];
                    if (position <= childEffect.actualDuration) {
                        if (this.activeEffectQueue == null)
                            this.activeEffectQueue = [];
                        this.activeEffectQueue.push(childEffect);
                        this.replayEffectQueue.splice(i, 1);
                        childEffect.playReversed = this.playReversed;
                        childEffect.startEffect();
                    }
                }
            };
            return ParallelInstance;
        })(gui.CompositeEffectInstance);
        gui.ParallelInstance = ParallelInstance;
        ParallelInstance.prototype.__class__ = "egret.gui.ParallelInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
