"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const StatusBarManager = ({ presentationStyle, }) => {
    if (react_native_1.Platform.OS === "ios" || presentationStyle !== "overFullScreen") {
        return null;
    }
    //Can't get an actual state of app status bar with default RN. Gonna rely on "presentationStyle === overFullScreen" prop and guess application status bar state to be visible in this case.
    react_native_1.StatusBar.setHidden(true);
    (0, react_1.useEffect)(() => {
        return () => react_native_1.StatusBar.setHidden(false);
    }, []);
    return null;
};
exports.default = StatusBarManager;
