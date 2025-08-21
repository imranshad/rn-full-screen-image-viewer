"use strict";
/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageLoading = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const SCREEN = react_native_1.Dimensions.get("screen");
const SCREEN_WIDTH = SCREEN.width;
const SCREEN_HEIGHT = SCREEN.height;
const ImageLoading = () => (<react_native_1.View style={styles.loading}>
        <react_native_1.ActivityIndicator size="small" color="#FFF"/>
    </react_native_1.View>);
exports.ImageLoading = ImageLoading;
const styles = react_native_1.StyleSheet.create({
    listItem: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    loading: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    imageScrollContainer: {
        height: SCREEN_HEIGHT,
    },
});
