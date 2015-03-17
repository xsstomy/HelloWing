var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by xiashishi on 15/3/17.
 */
var HelloWing = (function (_super) {
    __extends(HelloWing, _super);
    function HelloWing() {
        _super.call(this);
        this.skinName = content.HelloWingSkin;
    }
    HelloWing.prototype.partAdded = function (name, instance) {
        _super.prototype.partAdded.call(this, name, instance);
        if (instance == this.startButton) {
            egret.Tween.get(this.startButton).to({ y: 0 }, 1000, egret.Ease.backInOut);
        }
    };
    return HelloWing;
})(egret.gui.SkinnableComponent);
HelloWing.prototype.__class__ = "HelloWing";
