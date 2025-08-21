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
const useImageDimensions_1 = __importDefault(require("./hooks/useImageDimensions"));
const usePanResponder_1 = __importDefault(require("./hooks/usePanResponder"));
const utils_1 = require("./utils");
const ImageLoading_1 = require("./ImageLoading");
const SWIPE_CLOSE_OFFSET = 75;
const SWIPE_CLOSE_VELOCITY = 1.75;
const SCREEN = react_native_1.Dimensions.get("window");
const SCREEN_WIDTH = SCREEN.width;
const SCREEN_HEIGHT = SCREEN.height;
const ImageItem = ({ imageSrc, onZoom, onRequestClose, onLongPress, delayLongPress, swipeToCloseEnabled = true, doubleTapToZoomEnabled = true, swipeCloseSensitivity, }) => {
    const imageContainer = (0, react_1.useRef)(null);
    const imageDimensions = (0, useImageDimensions_1.default)(imageSrc);
    const [translate, scale] = (0, utils_1.getImageTransform)(imageDimensions, SCREEN);
    const scrollValueY = new react_native_1.Animated.Value(0);
    const [isLoaded, setLoadEnd] = (0, react_1.useState)(false);
    const onLoaded = (0, react_1.useCallback)(() => setLoadEnd(true), []);
    const onZoomPerformed = (0, react_1.useCallback)((isZoomed) => {
        onZoom(isZoomed);
        if (imageContainer === null || imageContainer === void 0 ? void 0 : imageContainer.current) {
            imageContainer.current.setNativeProps({
                scrollEnabled: !isZoomed,
            });
        }
    }, [imageContainer]);
    const onLongPressHandler = (0, react_1.useCallback)(() => {
        onLongPress(imageSrc);
    }, [imageSrc, onLongPress]);
    const [panHandlers, scaleValue, translateValue] = (0, usePanResponder_1.default)({
        initialScale: scale || 1,
        initialTranslate: translate || { x: 0, y: 0 },
        onZoom: onZoomPerformed,
        doubleTapToZoomEnabled,
        onLongPress: onLongPressHandler,
        delayLongPress,
    });
    const imagesStyles = (0, utils_1.getImageStyles)(imageDimensions, translateValue, scaleValue);
    const imageOpacity = scrollValueY.interpolate({
        inputRange: [-SWIPE_CLOSE_OFFSET, 0, SWIPE_CLOSE_OFFSET],
        outputRange: [0.7, 1, 0.7],
    });
    const imageStylesWithOpacity = Object.assign(Object.assign({}, imagesStyles), { opacity: imageOpacity });
    const onScrollEndDrag = ({ nativeEvent, }) => {
        var _a, _b, _c, _d;
        const velocityY = (_b = (_a = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.velocity) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0;
        const offsetY = (_d = (_c = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.contentOffset) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0;
        // Map sensitivity (1..10) to velocity threshold [low..high].
        // Higher sensitivity => lower required velocity to close.
        const s = swipeCloseSensitivity;
        const velocityThreshold = s == null
            ? SWIPE_CLOSE_VELOCITY
            : (() => {
                const clamped = Math.max(1, Math.min(10, s));
                const minV = 0.4; // easiest
                const maxV = 2.5; // hardest
                return maxV - ((clamped - 1) / 9) * (maxV - minV);
            })();
        const shouldClose = (Math.abs(velocityY) > velocityThreshold &&
            offsetY > SWIPE_CLOSE_OFFSET) ||
            offsetY > SCREEN_HEIGHT / 2;
        if (shouldClose) {
            onRequestClose();
            return;
        }
        // Not closing -> reset scroll position so image opacity returns to 1
        if (imageContainer === null || imageContainer === void 0 ? void 0 : imageContainer.current) {
            imageContainer.current.scrollTo({ y: 0, animated: true });
        }
        scrollValueY.setValue(0);
    };
    const onScroll = ({ nativeEvent, }) => {
        var _a, _b;
        const offsetY = (_b = (_a = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.contentOffset) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0;
        scrollValueY.setValue(offsetY);
    };
    return (<react_native_1.ScrollView ref={imageContainer} style={styles.listItem} pagingEnabled nestedScrollEnabled showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.imageScrollContainer} scrollEnabled={swipeToCloseEnabled} {...(swipeToCloseEnabled && {
        onScroll,
        onScrollEndDrag,
    })}>
            <react_native_1.Animated.Image {...panHandlers} source={imageSrc} style={imageStylesWithOpacity} onLoad={onLoaded}/>
            {(!isLoaded || !imageDimensions) && <ImageLoading_1.ImageLoading />}
        </react_native_1.ScrollView>);
};
exports.ImageItem = ImageItem;
const styles = react_native_1.StyleSheet.create({
    listItem: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    imageScrollContainer: {
        height: SCREEN_HEIGHT * 2,
    },
});
exports.default = react_1.default.memo(exports.ImageItem);
