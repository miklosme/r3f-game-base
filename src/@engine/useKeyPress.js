import { useCallback, useEffect, useState } from 'react';

export default function useKeyPress(key) {
    const keys = Array.isArray(key) ? key : [key];
    const [stack, setStack] = useState([]);

    const handleKeyDown = useCallback(
        event => {
            if (!keys.includes(event.key)) {
                return;
            }

            setStack(prevStack => {
                if (prevStack[0] === event.key) {
                    return prevStack;
                }
                return [event.key, ...prevStack];
            });
        },
        [...keys],
    );

    const handleKeyUp = useCallback(
        event => {
            if (!keys.includes(event.key)) {
                return;
            }

            setStack(prevStack => prevStack.filter(key => key !== event.key));
        },
        [...keys],
    );

    const handleWindowBlur = useCallback(() => {
        setStack([]);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleWindowBlur);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleWindowBlur);
        };
    }, [handleKeyDown, handleKeyUp, handleWindowBlur]);

    // return the last pressed key
    return stack[0];
}
