"use strict";
/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageItem = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const useDoubleTapToZoom_1 = __importDefault(require("./hooks/useDoubleTapToZoom"));
const useImageDimensions_1 = __importDefault(require("./hooks/useImageDimensions"));
const utils_1 = require("./utils");
const ImageLoading_1 = require("./ImageLoading");
const SWIPE_CLOSE_OFFSET = 75;
const SWIPE_CLOSE_VELOCITY = 1.55;
const SCREEN = react_native_1.Dimensions.get("screen");
const SCREEN_WIDTH = SCREEN.width;
const SCREEN_HEIGHT = SCREEN.height;
const ImageItem = ({ imageSrc, onZoom, onRequestClose, onLongPress, delayLongPress, swipeToCloseEnabled = true, doubleTapToZoomEnabled = true, swipeCloseSensitivity, }) => {
    const scrollViewRef = (0, react_1.useRef)(null);
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const [scaled, setScaled] = (0, react_1.useState)(false);
    const imageDimensions = (0, useImageDimensions_1.default)(imageSrc);
    const handleDoubleTap = (0, useDoubleTapToZoom_1.default)(scrollViewRef, scaled, SCREEN);
    const [translate, scale] = (0, utils_1.getImageTransform)(imageDimensions, SCREEN);
    const scrollValueY = new react_native_1.Animated.Value(0);
    const scaleValue = new react_native_1.Animated.Value(scale || 1);
    const translateValue = new react_native_1.Animated.ValueXY(translate);
    const maxScale = scale && scale > 0 ? Math.max(1 / scale, 1) : 1;
    const imageOpacity = scrollValueY.interpolate({
        inputRange: [-SWIPE_CLOSE_OFFSET, 0, SWIPE_CLOSE_OFFSET],
        outputRange: [0.5, 1, 0.5],
    });
    const imagesStyles = (0, utils_1.getImageStyles)(imageDimensions, translateValue, scaleValue);
    const imageStylesWithOpacity = Object.assign(Object.assign({}, imagesStyles), { opacity: imageOpacity });
    const onScrollEndDrag = (0, react_1.useCallback)(({ nativeEvent }) => {
        var _a, _b, _c;
        const velocityY = (_b = (_a = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.velocity) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0;
        const isScaled = ((_c = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.zoomScale) !== null && _c !== void 0 ? _c : 1) > 1.02; // add tolerance to avoid sticky zoom
        onZoom(isScaled);
        setScaled(isScaled);
        // Map sensitivity (1..10) to velocity threshold [low..high].
        // Higher sensitivity => lower required velocity to close.
        const s = swipeCloseSensitivity;
        const velocityThreshold = s == null
            ? SWIPE_CLOSE_VELOCITY
            : (() => {
                const clamped = Math.max(1, Math.min(10, s));
                const minV = 0.35;
                const maxV = 2.3;
                return maxV - ((clamped - 1) / 9) * (maxV - minV);
            })();
        const shouldClose = !isScaled &&
            swipeToCloseEnabled &&
            Math.abs(velocityY) > velocityThreshold;
        if (shouldClose) {
            onRequestClose();
            return;
        }
        // Not closing or scaled -> reset vertical offset so opacity returns to 1
        if (!isScaled && swipeToCloseEnabled && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
        scrollValueY.setValue(0);
    }, [scaled]);
    const onScroll = ({ nativeEvent, }) => {
        var _a, _b, _c;
        const offsetY = (_b = (_a = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.contentOffset) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0;
        if (((_c = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.zoomScale) !== null && _c !== void 0 ? _c : 1) > 1.02) {
            return;
        }
        scrollValueY.setValue(offsetY);
    };
    const onLongPressHandler = (0, react_1.useCallback)((event) => {
        onLongPress(imageSrc);
    }, [imageSrc, onLongPress]);
    return (<react_native_1.View>
            <react_native_1.ScrollView ref={scrollViewRef} style={styles.listItem} pinchGestureEnabled showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} maximumZoomScale={maxScale} contentContainerStyle={styles.imageScrollContainer} scrollEnabled={swipeToCloseEnabled} onScrollEndDrag={onScrollEndDrag} scrollEventThrottle={1} {...(swipeToCloseEnabled && {
        onScroll,
    })}>
                {(!loaded || !imageDimensions) && <ImageLoading_1.ImageLoading />}
                <react_native_1.TouchableWithoutFeedback onPress={doubleTapToZoomEnabled ? handleDoubleTap : undefined} onLongPress={onLongPressHandler} delayLongPress={delayLongPress}>
                    <react_native_1.Animated.Image source={imageSrc} style={imageStylesWithOpacity} onLoad={() => setLoaded(true)}/>
                </react_native_1.TouchableWithoutFeedback>
            </react_native_1.ScrollView>
        </react_native_1.View>);
};
exports.ImageItem = ImageItem;
const styles = react_native_1.StyleSheet.create({
    listItem: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    imageScrollContainer: {
        height: SCREEN_HEIGHT,
    },
});
exports.default = react_1.default.memo(exports.ImageItem);
