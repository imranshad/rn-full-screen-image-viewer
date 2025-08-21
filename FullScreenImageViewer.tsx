/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import {
    Animated,
    StyleSheet,
    View,
    ModalProps,
    Modal,
} from "react-native";

import ImageItem from "./ImageItem";
import ImageDefaultHeader from "./ImageDefaultHeader";
import StatusBarManager from "./StatusBarManager";

import useAnimatedComponents from "./hooks/useAnimatedComponents";
import useRequestClose from "./hooks/useRequestClose";
import { ImageSource } from "./types";

export type Props = {
    imageSrc: ImageSource;
    visible: boolean;
    onRequestClose: () => void;
    onLongPress?: (image: ImageSource) => void;
    presentationStyle?: ModalProps["presentationStyle"];
    animationType?: ModalProps["animationType"];
    backgroundColor?: string;
    swipeToCloseEnabled?: boolean;
    doubleTapToZoomEnabled?: boolean;
    delayLongPress?: number;
    swipeCloseSensitivity?: number; // 1 (hard) .. 10 (easy)
};

const DEFAULT_ANIMATION_TYPE = "fade";
const DEFAULT_BG_COLOR = "#000";
const DEFAULT_DELAY_LONG_PRESS = 800;

function ImageViewing({
    imageSrc,
    visible,
    onRequestClose,
    onLongPress = () => { },
    animationType = DEFAULT_ANIMATION_TYPE,
    backgroundColor = DEFAULT_BG_COLOR,
    presentationStyle,
    swipeToCloseEnabled,
    doubleTapToZoomEnabled,
    delayLongPress = DEFAULT_DELAY_LONG_PRESS,
    swipeCloseSensitivity,
}: Props) {
    const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
    const [headerTransform] = useAnimatedComponents();

    if (!visible) {
        return null;
    }

    return (
        <Modal
            transparent={presentationStyle === "overFullScreen"}
            visible={visible}
            presentationStyle={presentationStyle}
            animationType={animationType}
            onRequestClose={onRequestCloseEnhanced}
            supportedOrientations={["portrait"]}
            hardwareAccelerated
        >
            <StatusBarManager presentationStyle={presentationStyle} />
            <View style={[styles.container, { opacity, backgroundColor }]}>
                <Animated.View style={[styles.header, { transform: headerTransform }]}>

                    <ImageDefaultHeader onRequestClose={onRequestCloseEnhanced} />
                </Animated.View>
                <ImageItem
                    onZoom={() => { }}
                    imageSrc={imageSrc}
                    onRequestClose={onRequestCloseEnhanced}
                    onLongPress={onLongPress}
                    delayLongPress={delayLongPress}
                    swipeToCloseEnabled={swipeToCloseEnabled}
                    doubleTapToZoomEnabled={doubleTapToZoomEnabled}
                    swipeCloseSensitivity={swipeCloseSensitivity}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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

const EnhancedImageViewing = (props: Props) => (
    <ImageViewing {...props} />
);

export default EnhancedImageViewing;