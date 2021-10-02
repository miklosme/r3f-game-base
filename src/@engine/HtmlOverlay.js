import React, { useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';

export default function HtmlOverlay({
    children,
    ...props
}) {
    const node = useRef();

    // useEffect(() => {
    //     if (node.current?.parentElement) {
    //         node.current.parentElement.style.pointerEvents = 'none';
    //         node.current.parentElement.style.whiteSpace = 'nowrap';
    //     }
    // });

    return (
        <Html ref={node} zIndexRange={[0, 0]} {...props}>
            {children}
        </Html>
    );
}
