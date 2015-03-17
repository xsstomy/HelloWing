var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var TransformUtil = (function () {
            function TransformUtil() {
            }
            /**
             * 将显示对象按照给定的转换中心调整位置
             * @param obj 要转换的显示对象
             * @param transformCenter 转换中心点，以显示对象为坐标系
             * @param translation 新的转换中心的位置，以显示对象的父容器为坐标系
             * @param scaleX 新的缩放值scaleX，如果为NaN则不设置
             * @param scaleY 新的缩放值scaleY，如果为NaN则不设置
             * @param rotation 新的旋转角度，如果为NaN则不设置
             */
            TransformUtil.transformAround = function (obj, transformCenter, translation, scaleX, scaleY, rotation) {
                if (translation === void 0) { translation = null; }
                if (scaleX === void 0) { scaleX = NaN; }
                if (scaleY === void 0) { scaleY = NaN; }
                if (rotation === void 0) { rotation = NaN; }
                if (translation == null && transformCenter != null) {
                    egret.Point.identity.x = transformCenter.x;
                    egret.Point.identity.y = transformCenter.y;
                    var xformedPt = TransformUtil.transformPointToParent(obj, egret.Point.identity);
                }
                if (!isNaN(rotation))
                    obj.rotation = rotation;
                if (!isNaN(scaleX))
                    obj.scaleX = scaleX;
                if (!isNaN(scaleY))
                    obj.scaleY = scaleY;
                if (transformCenter == null) {
                    if (translation != null) {
                        obj.x = translation.x;
                        obj.y = translation.y;
                    }
                }
                else {
                    egret.Point.identity.x = transformCenter.x;
                    egret.Point.identity.y = transformCenter.y;
                    var postXFormPoint = TransformUtil.transformPointToParent(obj, egret.Point.identity);
                    if (translation != null) {
                        obj.x += translation.x - postXFormPoint.x;
                        obj.y += translation.y - postXFormPoint.y;
                    }
                    else {
                        obj.x += xformedPt.x - postXFormPoint.x;
                        obj.y += xformedPt.y - postXFormPoint.y;
                    }
                }
            };
            TransformUtil.transformPointToParent = function (obj, localPosition) {
                if (localPosition === void 0) { localPosition = null; }
                var resultPoint = new egret.Point();
                if (localPosition) {
                    resultPoint.x = localPosition.x;
                    resultPoint.y = localPosition.y;
                }
                if (obj.parent) {
                    obj.localToGlobal(resultPoint.x, resultPoint.y, resultPoint);
                    obj.parent.globalToLocal(resultPoint.x, resultPoint.y, resultPoint);
                }
                return resultPoint;
            };
            return TransformUtil;
        })();
        gui.TransformUtil = TransformUtil;
        TransformUtil.prototype.__class__ = "egret.gui.TransformUtil";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
