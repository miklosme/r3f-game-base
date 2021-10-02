import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import useAsset from './useAsset';

// create geometry once and reuse
const geometry = new THREE.PlaneBufferGeometry(1, 1);

export default memo(
    forwardRef(
        (
            {
                src,

                sheet = {
                    default: [[0, 0]],
                },

                state = 'default',
                frameWidth = 16,
                frameHeight = 16,
                frameTime = 200,
                scale = 1,
                flipX = 1,
                color = '#fff',
                opacity = 1,
                offset = { x: 0, y: 0 },
                basic = true,
                blending = THREE.NormalBlending,
                magFilter = THREE.NearestFilter,
            },
            ref,
        ) => {
            if (!sheet[state]) {
                throw new Error(`Sprite state '${state}' does not exist in sheet '${src}'`);
            }

            const image = useAsset(src);
            const textureRef = useRef();

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
                const columns = image.width / frameWidth;
                const rows = image.height / frameHeight;
                return {
                    image,
                    repeat: new THREE.Vector2(1 / columns, 1 / rows),
                    center: new THREE.Vector2(0, 1),
                    magFilter,
                    minFilter: THREE.LinearMipMapLinearFilter,
                    onUpdate: self => (self.needsUpdate = true),
                };
            }, [frameHeight, frameWidth, image, magFilter]);

            return (
                <mesh
                    ref={ref}
                    position={[offset.x, offset.y, -offset.y / 100]}
                    scale={[flipX * scale, scale, 1]}
                    geometry={geometry}
                >
                    {basic ? (
                        <meshBasicMaterial attach="material" {...materialProps}>
                            <texture ref={textureRef} attach="map" {...textureProps} />
                        </meshBasicMaterial>
                    ) : (
                        <meshLambertMaterial attach="material" {...materialProps}>
                            <texture ref={textureRef} attach="map" {...textureProps} />
                        </meshLambertMaterial>
                    )}
                </mesh>
            );
        },
    ),
);
