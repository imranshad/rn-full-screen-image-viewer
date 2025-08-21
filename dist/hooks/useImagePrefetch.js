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
const react_native_1 = require("react-native");
const useImagePrefetch = (images) => {
    (0, react_1.useEffect)(() => {
        images.forEach((image) => {
            //@ts-ignore
            if (image.uri) {
                //@ts-ignore
                return react_native_1.Image.prefetch(image.uri);
            }
        });
    }, []);
};
exports.default = useImagePrefetch;
