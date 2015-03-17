var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var content;
(function (content) {
    var HelloWingSkin = (function (_super) {
        __extends(HelloWingSkin, _super);
        function HelloWingSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [800, 480]);
            this.elementsContent = [this.__3_i(), this.startButton_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        Object.defineProperty(HelloWingSkin.prototype, "skinParts", {
            get: function () {
                return HelloWingSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        HelloWingSkin.prototype.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["bottom", "left", "right", "source", "top"], [0, 0, 0, "bg_background_png", 0]);
            return t;
        };
        HelloWingSkin.prototype.startButton_i = function () {
            var t = new egret.gui.Button();
            this.startButton = t;
            this.__s(t, ["label", "skinName", "x", "y"], ["开始", content.ButtonSkin, 0, 0]);
            return t;
        };
        HelloWingSkin._skinParts = ["startButton"];
        return HelloWingSkin;
    })(egret.gui.Skin);
    content.HelloWingSkin = HelloWingSkin;
    HelloWingSkin.prototype.__class__ = "content.HelloWingSkin";
})(content || (content = {}));
