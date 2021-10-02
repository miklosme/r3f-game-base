import { useContext } from 'react';
import { AssetLoaderContext } from './AssetLoader';

export default function useAsset(urlOrObj) {
    const assets = useContext(AssetLoaderContext);
    try {
        let url = typeof urlOrObj === 'string' ? urlOrObj : urlOrObj.src;
        return assets.current[url];
    } catch {
        return null;
    }
}