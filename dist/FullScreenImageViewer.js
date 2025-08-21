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
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ImageItem_1 = __importDefault(require("./ImageItem"));
const ImageDefaultHeader_1 = __importDefault(require("./ImageDefaultHeader"));
const StatusBarManager_1 = __importDefault(require("./StatusBarManager"));
const useAnimatedComponents_1 = __importDefault(require("./hooks/useAnimatedComponents"));
const useRequestClose_1 = __importDefault(require("./hooks/useRequestClose"));
const DEFAULT_ANIMATION_TYPE = "fade";
const DEFAULT_BG_COLOR = "#000";
const DEFAULT_DELAY_LONG_PRESS = 800;
function ImageViewing({ imageSrc, visible, onRequestClose, onLongPress = () => { }, animationType = DEFAULT_ANIMATION_TYPE, backgroundColor = DEFAULT_BG_COLOR, presentationStyle, swipeToCloseEnabled, doubleTapToZoomEnabled, delayLongPress = DEFAULT_DELAY_LONG_PRESS, swipeCloseSensitivity, }) {
    const [opacity, onRequestCloseEnhanced] = (0, useRequestClose_1.default)(onRequestClose);
    const [headerTransform] = (0, useAnimatedComponents_1.default)();
    if (!visible) {
        return null;
    }
    return (<react_native_1.Modal transparent={presentationStyle === "overFullScreen"} visible={visible} presentationStyle={presentationStyle} animationType={animationType} onRequestClose={onRequestCloseEnhanced} supportedOrientations={["portrait"]} hardwareAccelerated>
            <StatusBarManager_1.default presentationStyle={presentationStyle}/>
            <react_native_1.View style={[styles.container, { opacity, backgroundColor }]}>
                <react_native_1.Animated.View style={[styles.header, { transform: headerTransform }]}>

                    <ImageDefaultHeader_1.default onRequestClose={onRequestCloseEnhanced}/>
                </react_native_1.Animated.View>
                <ImageItem_1.default onZoom={() => { }} imageSrc={imageSrc} onRequestClose={onRequestCloseEnhanced} onLongPress={onLongPress} delayLongPress={delayLongPress} swipeToCloseEnabled={swipeToCloseEnabled} doubleTapToZoomEnabled={doubleTapToZoomEnabled} swipeCloseSensitivity={swipeCloseSensitivity}/>
            </react_native_1.View>
        </react_native_1.Modal>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
        top: 0,
    },
    footer: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
        bottom: 0,
    },
});
const EnhancedImageViewing = (props) => (<ImageViewing {...props}/>);
exports.default = EnhancedImageViewing;
