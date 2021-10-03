import React, { forwardRef, memo, useMemo } from 'react';
import * as THREE from 'three';
import useAsset from './useAsset';
import useSpriteSheetAnimation from './useSpriteSheetAnimation.js';
import { GRID_WIDTH, GRID_HEIGHT } from '../spriteSheets';

export default memo(
    forwardRef(
        (
            {
                spriteSheet,
                spriteName = 'default',
                imageSpeed = 1, // 1 second per frame
                imageIndex = 0,
                scale = 1,
                flipX = 1,
                color = '#fff',
                opacity = 1,
                offset = { x: 0, y: 0 },
                blending = THREE.NormalBlending,
                magFilter = THREE.NearestFilter,
            },
            ref,
        ) => {
            if (!spriteSheet) {
                throw new Error('SpriteSheet is required');
            }

            const image = useAsset(spriteSheet.src);

            const geometry = useMemo(() => {
                const w = spriteSheet.width / GRID_WIDTH;
                const h = spriteSheet.height / GRID_HEIGHT;
                return new THREE.PlaneBufferGeometry(w, h);
            }, [spriteSheet.width, spriteSheet.height]);

            const materialProps = useMemo(
                () => ({
                    color: new THREE.Color(color),
                    opacity,
                    blending,
                    transparent: true,
                    depthTest: false,
                    depthWrite: false,
                    fog: false,
                    flatShading: true,
                    precision: 'lowp',
                }),
                [opacity, blending, color],
            );

            const textureProps = useMemo(() => {
                const columns = image.width / spriteSheet.width;
                const rows = image.height / spriteSheet.height;
                return {
                    image,
                    repeat: new THREE.Vector2(1 / columns, 1 / rows),
                    center: new THREE.Vector2(0, 1),
                    magFilter,
                    minFilter: THREE.LinearMipMapLinearFilter,
                    onUpdate: self => (self.needsUpdate = true),
                };
            }, [spriteSheet.height, spriteSheet.width, image, magFilter]);

            const textureRef = useSpriteSheetAnimation({
                spriteSheet,
                spriteName,
                imageSpeed,
                imageIndex,
            });

            return (
                <mesh
                    ref={ref}
                    position={[offset.x, offset.y, -offset.y / 100]}
                    scale={[flipX * scale, scale, 1]}
                    geometry={geometry}
                >
                    <meshBasicMaterial attach="material" {...materialProps}>
                        <texture ref={textureRef} attach="map" {...textureProps} />
                    </meshBasicMaterial>
                </mesh>
            );
        },
    ),
);
