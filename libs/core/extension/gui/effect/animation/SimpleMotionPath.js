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
        var SimpleMotionPath = (function (_super) {
            __extends(SimpleMotionPath, _super);
            /**
             * 构造函数。您可以同时指定 valueFrom 和 valueTo 参数，
             * 也可以在指定 valueBy 参数的同时指定 valueFrom 或 valueTo 参数。
             * 如果忽略这些参数，则会从效果目标计算它们。
             *  @param property 正在设置动画的属性的名称。
             *  @param valueFrom 属性的初始值。
             *  @param valueTo 属性的最终值。
             *  @param valueBy 用于指定 delta 的可选参数，该 delta 用于计算 from 或 to 值（如果其中一个值被忽略）。
             */
            function SimpleMotionPath(property, valueFrom, valueTo, valueBy) {
                if (property === void 0) { property = null; }
                if (valueFrom === void 0) { valueFrom = null; }
                if (valueTo === void 0) { valueTo = null; }
                if (valueBy === void 0) { valueBy = null; }
                _super.call(this);
                this.property = property;
                this.keyframes = [new gui.Keyframe(0, valueFrom), new gui.Keyframe(NaN, valueTo, valueBy)];
            }
            Object.defineProperty(SimpleMotionPath.prototype, "valueFrom", {
                /**
                 * 动画过程中属性的起始值。
                 */
                get: function () {
                    return this.keyframes[0].value;
                },
                set: function (value) {
                    this.keyframes[0].value = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SimpleMotionPath.prototype, "valueTo", {
                /**
                 * 已命名的属性将要设置动画的值。
                 */
                get: function () {
                    return this.keyframes[this.keyframes.length - 1].value;
                },
                set: function (value) {
                    this.keyframes[this.keyframes.length - 1].value = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SimpleMotionPath.prototype, "valueBy", {
                /**
                 * 可指定用于计算 valueFrom 或 valueTo 值的 delta 的可选属性。
                 */
                get: function () {
                    return this.keyframes[this.keyframes.length - 1].valueBy;
                },
                set: function (value) {
                    this.keyframes[this.keyframes.length - 1].valueBy = value;
                },
                enumerable: true,
                configurable: true
            });
            return SimpleMotionPath;
        })(gui.MotionPath);
        gui.SimpleMotionPath = SimpleMotionPath;
        SimpleMotionPath.prototype.__class__ = "egret.gui.SimpleMotionPath";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
