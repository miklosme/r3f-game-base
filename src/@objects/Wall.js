import GameObject from '@engine/GameObject';
import Sprite from '@engine/Sprite';
import { useState } from 'react';
import spriteSheets from '../spriteSheets';

export default function Wall({ x, y }) {
    const [index] = useState(() => Math.floor(Math.random() * 6));
    return (
        <GameObject displayName="Wall" x={x} y={y}>
            <Sprite spriteSheet={spriteSheets.wall} imageSpeed={0} imageIndex={index} />
        </GameObject>
    );
}
