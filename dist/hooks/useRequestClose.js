"use strict";
/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useRequestClose = (onRequestClose) => {
    const [opacity, setOpacity] = (0, react_1.useState)(1);
    return [
        opacity,
        () => {
            setOpacity(0);
            onRequestClose();
            setTimeout(() => setOpacity(1), 0);
        },
    ];
};
exports.default = useRequestClose;
