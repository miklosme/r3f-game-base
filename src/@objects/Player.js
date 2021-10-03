import { useFrame } from '@react-three/fiber';
import GameObject from '@engine/GameObject';
import Sprite from '@engine/Sprite';
import useKeyPress from '@engine/useKeyPress';
import spriteSheets from '../spriteSheets';

export default function Player({ x, y }) {
    const key = useKeyPress(['w', 'a', 's', 'd']);

    // useFrame((state, delta) => {
    //     if (key === 'a') {

    //     } else if (key === 'd') {

    //     }
    // });

    return (
        <GameObject displayName="Player" x={x} y={y} z={1}>
            <Sprite spriteSheet={spriteSheets.player} color="#f1dc42" />
        </GameObject>
    );
}
