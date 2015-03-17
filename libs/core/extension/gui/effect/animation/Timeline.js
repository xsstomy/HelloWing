var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var Timeline = (function () {
            function Timeline() {
            }
            Timeline.pulse = function () {
                if (Timeline.startTime < 0) {
                    Timeline.startTime = egret.getTimer();
                    Timeline._currentTime = 0;
                    return Timeline._currentTime;
                }
                Timeline._currentTime = egret.getTimer() - Timeline.startTime;
                return Timeline._currentTime;
            };
            Object.defineProperty(Timeline, "currentTime", {
                get: function () {
                    if (Timeline._currentTime < 0) {
                        var retVal = Timeline.pulse();
                        return Timeline.pulse();
                    }
                    return Timeline._currentTime;
                },
                enumerable: true,
                configurable: true
            });
            Timeline.startTime = -1;
            Timeline._currentTime = -1;
            return Timeline;
        })();
        gui.Timeline = Timeline;
        Timeline.prototype.__class__ = "egret.gui.Timeline";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
