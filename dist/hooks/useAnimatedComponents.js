"use strict";
/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const INITIAL_POSITION = { x: 0, y: 0 };
const ANIMATION_CONFIG = {
    duration: 200,
    useNativeDriver: true,
};
const useAnimatedComponents = () => {
    const headerTranslate = new react_native_1.Animated.ValueXY(INITIAL_POSITION);
    const footerTranslate = new react_native_1.Animated.ValueXY(INITIAL_POSITION);
    const toggleVisible = (isVisible) => {
        if (isVisible) {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(headerTranslate.y, Object.assign(Object.assign({}, ANIMATION_CONFIG), { toValue: 0 })),
                react_native_1.Animated.timing(footerTranslate.y, Object.assign(Object.assign({}, ANIMATION_CONFIG), { toValue: 0 })),
            ]).start();
        }
        else {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(headerTranslate.y, Object.assign(Object.assign({}, ANIMATION_CONFIG), { toValue: -300 })),
                react_native_1.Animated.timing(footerTranslate.y, Object.assign(Object.assign({}, ANIMATION_CONFIG), { toValue: 300 })),
            ]).start();
        }
    };
    const headerTransform = headerTranslate.getTranslateTransform();
    const footerTransform = footerTranslate.getTranslateTransform();
    return [headerTransform, footerTransform, toggleVisible];
};
exports.default = useAnimatedComponents;
