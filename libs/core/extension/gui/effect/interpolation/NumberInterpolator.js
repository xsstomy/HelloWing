var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var NumberInterpolator = (function () {
            function NumberInterpolator() {
            }
            NumberInterpolator.getInstance = function () {
                if (!NumberInterpolator.theInstance)
                    NumberInterpolator.theInstance = new NumberInterpolator();
                return NumberInterpolator.theInstance;
            };
            NumberInterpolator.prototype.interpolate = function (fraction, startValue, endValue) {
                if (fraction == 0)
                    return startValue;
                else if (fraction == 1)
                    return endValue;
                return startValue + (fraction * (endValue - startValue));
            };
            NumberInterpolator.prototype.increment = function (baseValue, incrementValue) {
                return baseValue + incrementValue;
            };
            NumberInterpolator.prototype.decrement = function (baseValue, decrementValue) {
                return baseValue - decrementValue;
            };
            return NumberInterpolator;
        })();
        gui.NumberInterpolator = NumberInterpolator;
        NumberInterpolator.prototype.__class__ = "egret.gui.NumberInterpolator";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
