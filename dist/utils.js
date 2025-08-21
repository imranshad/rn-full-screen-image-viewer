"use strict";
/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceBetweenTouches = exports.createPanResponder = exports.getImageTranslateForScale = exports.getImageDimensionsByTranslate = exports.getImageTranslate = exports.getImageStyles = exports.getImageTransform = exports.splitArrayIntoBatches = exports.createCache = void 0;
const react_native_1 = require("react-native");
const createCache = (cacheSize) => ({
    _storage: [],
    get(key) {
        const { value } = this._storage.find(({ key: storageKey }) => storageKey === key) || {};
        return value;
    },
    set(key, value) {
        if (this._storage.length >= cacheSize) {
            this._storage.shift();
        }
        this._storage.push({ key, value });
    },
});
exports.createCache = createCache;
const splitArrayIntoBatches = (arr, batchSize) => arr.reduce((result, item) => {
    const batch = result.pop() || [];
    if (batch.length < batchSize) {
        batch.push(item);
        result.push(batch);
    }
    else {
        result.push(batch, [item]);
    }
    return result;
}, []);
exports.splitArrayIntoBatches = splitArrayIntoBatches;
const getImageTransform = (image, screen) => {
    if (!(image === null || image === void 0 ? void 0 : image.width) || !(image === null || image === void 0 ? void 0 : image.height)) {
        return [];
    }
    const wScale = screen.width / image.width;
    const hScale = screen.height / image.height;
    const scale = Math.min(wScale, hScale);
    const { x, y } = (0, exports.getImageTranslate)(image, screen);
    return [{ x, y }, scale];
};
exports.getImageTransform = getImageTransform;
const getImageStyles = (image, translate, scale) => {
    if (!(image === null || image === void 0 ? void 0 : image.width) || !(image === null || image === void 0 ? void 0 : image.height)) {
        return { width: 0, height: 0 };
    }
    const baseTransform = translate.getTranslateTransform();
    const transform = scale
        ? [...baseTransform, { scale }, { perspective: 1000 }]
        : baseTransform;
    return {
        width: image.width,
        height: image.height,
        transform,
    };
};
exports.getImageStyles = getImageStyles;
const getImageTranslate = (image, screen) => {
    const getTranslateForAxis = (axis) => {
        const imageSize = axis === "x" ? image.width : image.height;
        const screenSize = axis === "x" ? screen.width : screen.height;
        return (screenSize - imageSize) / 2;
    };
    return {
        x: getTranslateForAxis("x"),
        y: getTranslateForAxis("y"),
    };
};
exports.getImageTranslate = getImageTranslate;
const getImageDimensionsByTranslate = (translate, screen) => ({
    width: screen.width - translate.x * 2,
    height: screen.height - translate.y * 2,
});
exports.getImageDimensionsByTranslate = getImageDimensionsByTranslate;
const getImageTranslateForScale = (currentTranslate, targetScale, screen) => {
    const { width, height } = (0, exports.getImageDimensionsByTranslate)(currentTranslate, screen);
    const targetImageDimensions = {
        width: width * targetScale,
        height: height * targetScale,
    };
    return (0, exports.getImageTranslate)(targetImageDimensions, screen);
};
exports.getImageTranslateForScale = getImageTranslateForScale;
const createPanResponder = ({ onGrant, onStart, onMove, onRelease, onTerminate, }) => react_native_1.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: onGrant,
    onPanResponderStart: onStart,
    onPanResponderMove: onMove,
    onPanResponderRelease: onRelease,
    onPanResponderTerminate: onTerminate,
    onPanResponderTerminationRequest: () => false,
    onShouldBlockNativeResponder: () => false,
});
exports.createPanResponder = createPanResponder;
const getDistanceBetweenTouches = (touches) => {
    const [a, b] = touches;
    if (a == null || b == null) {
        return 0;
    }
    return Math.sqrt(Math.pow(a.pageX - b.pageX, 2) + Math.pow(a.pageY - b.pageY, 2));
};
exports.getDistanceBetweenTouches = getDistanceBetweenTouches;
