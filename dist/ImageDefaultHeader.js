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
const HIT_SLOP = { top: 16, left: 16, bottom: 16, right: 16 };
const ImageDefaultHeader = ({ onRequestClose }) => (<react_native_1.SafeAreaView style={styles.root}>
        <react_native_1.TouchableOpacity style={styles.closeButton} onPress={onRequestClose} hitSlop={HIT_SLOP}>
            <react_native_1.Text style={styles.closeText}>✕</react_native_1.Text>
        </react_native_1.TouchableOpacity>
    </react_native_1.SafeAreaView>);
const styles = react_native_1.StyleSheet.create({
    root: {
        alignItems: "flex-end",
    },
    closeButton: {
        marginRight: 8,
        marginTop: 8,
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#00000077",
    },
    closeText: {
        lineHeight: 22,
        fontSize: 19,
        textAlign: "center",
        color: "#FFF",
        includeFontPadding: false,
    },
});
exports.default = ImageDefaultHeader;
