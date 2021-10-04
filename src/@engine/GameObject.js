import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useStateFromProp from './useStateFromProp';

export default function GameObject({
    displayName,
    children,
    ...props
}) {
    const [x, setX] = useStateFromProp(props.x || 0);
    const [y, setY] = useStateFromProp(props.y || 0);
    const [z, setZ] = useStateFromProp(props.z / 100 || 0);
    const node = useRef(null);
    return (
        <group ref={node} position={[x, -y, (y + z) / 100]}>
            {children}
        </group>
    );
}
