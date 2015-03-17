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
        var SequenceInstance = (function (_super) {
            __extends(SequenceInstance, _super);
            function SequenceInstance(target) {
                _super.call(this, target);
                /**
                 * 已播放效果的持续时间
                 */
                this.currentInstanceDuration = 0;
                this.currentSetIndex = -1;
                this.isPaused = false;
            }
            Object.defineProperty(SequenceInstance.prototype, "durationWithoutRepeat", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var _duration = 0;
                    var n = this.childSets.length;
                    for (var i = 0; i < n; i++) {
                        var instances = this.childSets[i];
                        _duration += instances[0].actualDuration;
                    }
                    return _duration;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            SequenceInstance.prototype._setPlayheadTime = function (value) {
                this._setPlayheadTime(value);
                var i, j, k, l = 0;
                var compositeDur = (this.effect).compositeDuration;
                var firstCycleDur = compositeDur + this.startDelay + this.repeatDelay;
                var laterCycleDur = compositeDur + this.repeatDelay;
                var totalDur = firstCycleDur + laterCycleDur * (this.repeatCount - 1);
                var iterationPlayheadTime;
                if (value <= firstCycleDur) {
                    iterationPlayheadTime = Math.min(value - this.startDelay, compositeDur);
                    this.playCount = 1;
                }
                else {
                    if (value >= totalDur && this.repeatCount != 0) {
                        iterationPlayheadTime = compositeDur;
                        this.playCount = this.repeatCount;
                    }
                    else {
                        var valueAfterFirstCycle = value - firstCycleDur;
                        iterationPlayheadTime = valueAfterFirstCycle % laterCycleDur;
                        iterationPlayheadTime = Math.min(iterationPlayheadTime, compositeDur);
                        this.playCount = 1 + valueAfterFirstCycle / laterCycleDur;
                    }
                }
                if (this.activeEffectQueue && this.activeEffectQueue.length > 0) {
                    var cumulativeDuration = 0;
                    var activeLength = this.activeEffectQueue.length;
                    for (i = 0; i < activeLength; ++i) {
                        var setToCompare = this.playReversed ? (activeLength - 1 - i) : i;
                        var childEffectInstances;
                        var startTime = cumulativeDuration;
                        var endTime = cumulativeDuration + this.childSets[setToCompare][0].actualDuration;
                        cumulativeDuration = endTime;
                        if (startTime <= iterationPlayheadTime && iterationPlayheadTime <= endTime) {
                            this.endEffectCalled = true;
                            if (this.currentSetIndex == setToCompare) {
                                for (j = 0; j < this.currentSet.length; j++)
                                    this.currentSet[j].playheadTime = (iterationPlayheadTime - startTime);
                            }
                            else if (setToCompare < this.currentSetIndex) {
                                if (this.playReversed) {
                                    for (j = 0; j < this.currentSet.length; j++)
                                        this.currentSet[j].end();
                                    for (j = this.currentSetIndex - 1; j > setToCompare; --j) {
                                        childEffectInstances = this.activeEffectQueue[j];
                                        for (k = 0; k < childEffectInstances.length; k++) {
                                            if (this.playReversed)
                                                childEffectInstances[k].playReversed = true;
                                            childEffectInstances[k].play();
                                            childEffectInstances[k].end();
                                        }
                                    }
                                }
                                else {
                                    for (j = 0; j < this.currentSet.length; j++) {
                                        this.currentSet[j].playheadTime = 0;
                                        this.currentSet[j].stop();
                                    }
                                    for (j = this.currentSetIndex - 1; j > setToCompare; --j) {
                                        childEffectInstances = this.activeEffectQueue[j];
                                        for (k = 0; k < childEffectInstances.length; k++) {
                                            childEffectInstances[k].play();
                                            childEffectInstances[k].stop();
                                        }
                                    }
                                }
                                this.currentSetIndex = setToCompare;
                                this.playCurrentChildSet();
                                for (k = 0; k < this.currentSet.length; k++) {
                                    this.currentSet[k].playheadTime = (iterationPlayheadTime - startTime);
                                    if (this.isPaused)
                                        this.currentSet[k].pause();
                                }
                            }
                            else {
                                if (this.playReversed) {
                                    for (j = 0; j < this.currentSet.length; j++) {
                                        this.currentSet[j].playheadTime = 0;
                                        this.currentSet[j].stop();
                                    }
                                    for (k = this.currentSetIndex + 1; k < setToCompare; k++) {
                                        childEffectInstances = this.activeEffectQueue[k];
                                        for (l = 0; l < childEffectInstances.length; l++) {
                                            childEffectInstances[l].playheadTime = 0;
                                            childEffectInstances[l].stop();
                                        }
                                    }
                                }
                                else {
                                    var currentEffectInstances = this.currentSet.concat();
                                    for (j = 0; j < currentEffectInstances.length; j++)
                                        currentEffectInstances[j].end();
                                    for (k = this.currentSetIndex + 1; k < setToCompare; k++) {
                                        childEffectInstances = this.activeEffectQueue[k];
                                        for (l = 0; l < childEffectInstances.length; l++) {
                                            childEffectInstances[l].play();
                                            childEffectInstances[l].end();
                                        }
                                    }
                                }
                                this.currentSetIndex = setToCompare;
                                this.playCurrentChildSet();
                                for (k = 0; k < this.currentSet.length; k++) {
                                    this.currentSet[k].playheadTime = (iterationPlayheadTime - startTime);
                                    if (this.isPaused)
                                        this.currentSet[k].pause();
                                }
                            }
                            this.endEffectCalled = false;
                            break;
                        }
                    }
                }
            };
            /**
             * @inheritDoc
             */
            SequenceInstance.prototype.play = function () {
                this.isPaused = false;
                this.activeEffectQueue = [];
                this.currentSetIndex = this.playReversed ? this.childSets.length : -1;
                var n = 0;
                var i = 0;
                var m = 0;
                var j = 0;
                n = this.childSets.length;
                for (i = 0; i < n; i++) {
                    var instances = this.childSets[i];
                    this.activeEffectQueue.push(instances);
                }
                _super.prototype.play.call(this);
                if (this.activeEffectQueue.length == 0) {
                    this.finishRepeat();
                    return;
                }
                this.playNextChildSet();
            };
            /**
             * @inheritDoc
             */
            SequenceInstance.prototype.pause = function () {
                _super.prototype.pause.call(this);
                this.isPaused = true;
                if (this.currentSet && this.currentSet.length > 0) {
                    var n = this.currentSet.length;
                    for (var i = 0; i < n; i++) {
                        this.currentSet[i].pause();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            SequenceInstance.prototype.stop = function () {
                this.isPaused = false;
                if (this.activeEffectQueue && this.activeEffectQueue.length > 0) {
                    var queueCopy = this.activeEffectQueue.concat();
                    this.activeEffectQueue = null;
                    var currentInstances = queueCopy[this.currentSetIndex];
                    if (currentInstances) {
                        var currentCount = currentInstances.length;
                        for (var i = 0; i < currentCount; i++)
                            currentInstances[i].stop();
                    }
                    var n = queueCopy.length;
                    for (var j = this.currentSetIndex + 1; j < n; j++) {
                        var waitingInstances = queueCopy[j];
                        var m = waitingInstances.length;
                        for (var k = 0; k < m; k++) {
                            var instance = waitingInstances[k];
                            instance.effect.deleteInstance(instance);
                        }
                    }
                }
                _super.prototype.stop.call(this);
            };
            /**
             * @inheritDoc
             */
            SequenceInstance.prototype.resume = function () {
                _super.prototype.resume.call(this);
                this.isPaused = false;
                if (this.currentSet && this.currentSet.length > 0) {
                    var n = this.currentSet.length;
                    for (var i = 0; i < n; i++) {
                        this.currentSet[i].resume();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            SequenceInstance.prototype.reverse = function () {
                _super.prototype.reverse.call(this);
                if (this.currentSet && this.currentSet.length > 0) {
                    var n = this.currentSet.length;
                    for (var i = 0; i < n; i++) {
                        this.currentSet[i].reverse();
                    }
                }
            };
            /**
             * 中断当前正在播放的所有效果，跳过尚未开始播放的所有效果，并立即跳至最终的复合效果。
             */
            SequenceInstance.prototype.end = function () {
                this.endEffectCalled = true;
                if (this.activeEffectQueue && this.activeEffectQueue.length > 0) {
                    var queueCopy = this.activeEffectQueue.concat();
                    this.activeEffectQueue = null;
                    var currentInstances = queueCopy[this.currentSetIndex];
                    if (currentInstances) {
                        var currentCount = currentInstances.length;
                        for (var i = 0; i < currentCount; i++) {
                            currentInstances[i].end();
                        }
                    }
                    var n = queueCopy.length;
                    for (var j = this.currentSetIndex + 1; j < n; j++) {
                        var waitingInstances = queueCopy[j];
                        var m = waitingInstances.length;
                        for (var k = 0; k < m; k++) {
                            (waitingInstances[k]).playWithNoDuration();
                        }
                    }
                }
                this.isPaused = false;
                _super.prototype.end.call(this);
            };
            /**
             * @inheritDoc
             */
            SequenceInstance.prototype.onEffectEnd = function (childEffect) {
                for (var i = 0; i < this.currentSet.length; i++) {
                    if (childEffect == this.currentSet[i]) {
                        this.currentSet.splice(i, 1);
                        break;
                    }
                }
                if (this.endEffectCalled)
                    return;
                if (this.currentSet.length == 0) {
                    if (false == this.playNextChildSet())
                        this.finishRepeat();
                }
            };
            SequenceInstance.prototype.playCurrentChildSet = function () {
                var childEffect;
                var instances = this.activeEffectQueue[this.currentSetIndex];
                this.currentSet = [];
                for (var i = 0; i < instances.length; i++) {
                    childEffect = instances[i];
                    this.currentSet.push(childEffect);
                    childEffect.playReversed = this.playReversed;
                    childEffect.startEffect();
                }
                this.currentInstanceDuration += childEffect.actualDuration;
            };
            SequenceInstance.prototype.playNextChildSet = function (offset) {
                if (offset === void 0) { offset = 0; }
                if (!this.playReversed) {
                    if (!this.activeEffectQueue || this.currentSetIndex++ >= this.activeEffectQueue.length - 1) {
                        return false;
                    }
                }
                else {
                    if (this.currentSetIndex-- <= 0)
                        return false;
                }
                this.playCurrentChildSet();
                return true;
            };
            return SequenceInstance;
        })(gui.CompositeEffectInstance);
        gui.SequenceInstance = SequenceInstance;
        SequenceInstance.prototype.__class__ = "egret.gui.SequenceInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
