import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function useSpriteSheetAnimation({ spriteSheet, spriteName, imageSpeed, imageIndex }) {
    const textureRef = useRef();
    const [clock] = useState(() => new THREE.Clock());
    const [startIndex] = useState(imageIndex);

    useFrame(state => {
        if (!textureRef.current) {
            return;
        }

        // const frames = spriteSheet.sheet[spriteName];
        // const [firstFrame, lastFrame = firstFrame] = frames;
        // const frameLength = lastFrame[0] + 1 - firstFrame[0]; // sprite squences must not use multiple rows
        // const absoluteIndex = startIndex + (imageSpeed ? Math.floor(clock.getElapsedTime() / imageSpeed) : 0);
        // const currentIndex = absoluteIndex % frameLength;

        // const columns = textureRef.current.image.width / spriteSheet.width;
        // const rows = textureRef.current.image.height / spriteSheet.height;

        // textureRef.current.offset.setX((1 / columns) * currentIndex);
        // textureRef.current.offset.setY((-1 / rows) * firstFrame[1]);
    });

    return textureRef;
}
