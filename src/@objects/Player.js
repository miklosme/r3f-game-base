import GameObject from '@engine/GameObject';
import Sprite from '@engine/Sprite';
import spriteSheets from '../spriteSheets';

export default function Player({ x, y }) {
    return (
        <GameObject displayName="Player" x={x} y={y}>
            <Sprite spriteSheet={spriteSheets.player} />
        </GameObject>
    );
}
