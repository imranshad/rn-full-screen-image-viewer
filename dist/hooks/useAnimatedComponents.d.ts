/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Animated } from "react-native";
declare const useAnimatedComponents: () => readonly [[{
    translateX: Animated.AnimatedValue;
}, {
    translateY: Animated.AnimatedValue;
}], [{
    translateX: Animated.AnimatedValue;
}, {
    translateY: Animated.AnimatedValue;
}], (isVisible: boolean) => void];
export default useAnimatedComponents;
