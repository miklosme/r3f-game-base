import React, { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useStateFromProp from './useStateFromProp';

export const AssetLoaderContext = createContext(null);

const createRegExp = (extensions) => new RegExp(`^.*\\.(${extensions})$`, 'i');

const imageRegExp = createRegExp('jpg|png|gif');
const audioRegExp = createRegExp('wav|mp3|ogg');

function loadAsset(url) {
    return new Promise((resolve, reject) => {
        let asset;
        if (imageRegExp.test(url)) asset = new Image();
        else if (audioRegExp.test(url)) asset = new Audio();

        function handleLoad(event) {
            if (event.type === 'error') {
                reject();
                return;
            }
            resolve(asset);
        }
        asset.onload = handleLoad;
        asset.oncanplaythrough = handleLoad;
        asset.onerror = handleLoad;
        asset.src = url;
    });
}

// define asset store in module scope, so it can be accessed
// from both dom and webgl reconcilers.
const assets = {
    current: {},
};

export function AssetLoaderProvider({
    children
}) {
    return (
        <AssetLoaderContext.Provider value={assets}>
            {children}
        </AssetLoaderContext.Provider>
    );
}

export default function AssetLoader({
    urls: urlsProp,
    placeholder,
    children
}) {
    const [urls, setUrls] = useStateFromProp(urlsProp);
    const [count, setCount] = useState(0);
    const uniqueUrls = useRef();
    uniqueUrls.current = new Set(urls);
    const timeout = useRef();
    const mounted = useRef(true);

    useLayoutEffect(() => () => {
        mounted.current = false;
    }, []);

    useEffect(() => {
        (async () => {
            for (const url of uniqueUrls.current) {
                try {
                    const asset = await loadAsset(url);
                    assets.current[url] = asset;
                    if (mounted.current) setCount(current => current + 1);
                } catch {
                    // eslint-disable-next-line no-console
                    console.error('Error loading asset:', url);
                }
            }
            clearTimeout(timeout.current);
        })();
    }, [urls]);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            // sometimes after WDS triggers a reload, not all assets are being reloaded here.
            const delay = 2000 + uniqueUrls.current.size * 100;
            timeout.current = setTimeout(() => {
                setCount(0);
                setUrls(urls.slice());
                // eslint-disable-next-line no-console
                console.warn('AssetLoader failed loading after timeout.');
            }, delay);
            return () => clearTimeout(timeout.current);
        }
        return undefined;
    }, [urls, setUrls]);

    if (count < uniqueUrls.current.size) {
        return placeholder ? (placeholder
        ) : null;
    }

    return <AssetLoaderProvider>{children}</AssetLoaderProvider>;
}
