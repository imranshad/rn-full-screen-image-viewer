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
const utils_1 = require("../utils");
const CACHE_SIZE = 50;
const imageDimensionsCache = (0, utils_1.createCache)(CACHE_SIZE);
const useImageDimensions = (image) => {
    const [dimensions, setDimensions] = (0, react_1.useState)(null);
    const getImageDimensions = (image) => {
        return new Promise((resolve) => {
            if (typeof image == "number") {
                const cacheKey = `${image}`;
                let imageDimensions = imageDimensionsCache.get(cacheKey);
                if (!imageDimensions) {
                    const { width, height } = react_native_1.Image.resolveAssetSource(image);
                    imageDimensions = { width, height };
                    imageDimensionsCache.set(cacheKey, imageDimensions);
                }
                resolve(imageDimensions);
                return;
            }
            // @ts-ignore
            if (image.uri) {
                const source = image;
                const cacheKey = source.uri;
                const imageDimensions = imageDimensionsCache.get(cacheKey);
                if (imageDimensions) {
                    resolve(imageDimensions);
                }
                else {
                    // @ts-ignore
                    react_native_1.Image.getSizeWithHeaders(source.uri, source.headers, (width, height) => {
                        imageDimensionsCache.set(cacheKey, { width, height });
                        resolve({ width, height });
                    }, () => {
                        resolve({ width: 0, height: 0 });
                    });
                }
            }
            else {
                resolve({ width: 0, height: 0 });
            }
        });
    };
    let isImageUnmounted = false;
    (0, react_1.useEffect)(() => {
        getImageDimensions(image).then((dimensions) => {
            if (!isImageUnmounted) {
                setDimensions(dimensions);
            }
        });
        return () => {
            isImageUnmounted = true;
        };
    }, [image]);
    return dimensions;
};
exports.default = useImageDimensions;
