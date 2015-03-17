var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var content;
(function (content) {
    var ButtonSkin = (function (_super) {
        __extends(ButtonSkin, _super);
        function ButtonSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__4_i(), this.labelDisplay_i()];
            this.states = [
                new egret.gui.State("up", []),
                new egret.gui.State("down", [
                    new egret.gui.SetProperty("__4", "source", "start_button_down_png")
                ]),
                new egret.gui.State("disabled", [])
            ];
        }
        Object.defineProperty(ButtonSkin.prototype, "skinParts", {
            get: function () {
                return ButtonSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        ButtonSkin.prototype.labelDisplay_i = function () {
            var t = new egret.gui.Label();
            this.labelDisplay = t;
            this.__s(t, ["text", "x", "y"], ["标签", 75, 94]);
            return t;
        };
        ButtonSkin.prototype.__4_i = function () {
            var t = new egret.gui.UIAsset();
            this.__4 = t;
            t.setStyle("textAlign", "right");
            t.setStyle("textColor", 0x8B1313);
            this.__s(t, ["bottom", "left", "right", "source", "top"], [0, 0, 0, "start_button_up_png", 0]);
            return t;
        };
        ButtonSkin._skinParts = ["labelDisplay"];
        return ButtonSkin;
    })(egret.gui.Skin);
    content.ButtonSkin = ButtonSkin;
    ButtonSkin.prototype.__class__ = "content.ButtonSkin";
})(content || (content = {}));
