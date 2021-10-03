import GameObject from '@engine/GameObject';
import Sprite from '@engine/Sprite';
import spriteSheets from '../spriteSheets';

export default function Player({ x, y }) {
    return (
        <GameObject displayName="Player" x={x} y={y} z={1}>
            <Sprite spriteSheet={spriteSheets.player} color="#f1dc42" />
        </GameObject>
    );
}
