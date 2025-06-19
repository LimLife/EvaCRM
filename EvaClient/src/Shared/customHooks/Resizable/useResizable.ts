import { useCallback, useEffect, useState } from "react";
import { ResizableOptions } from "./ResizableOptions";


export function useResizable({ initialWith = 1920, maxWidth = 500, minWidth = 500 }: ResizableOptions)
{
    const [width, setWidth] = useState<number>(initialWith);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const computedMin = minWidth ?? 100;
    const computedMax = maxWidth ?? window.innerWidth

    const handleMouseMove = useCallback((e: MouseEvent) =>
    {
        if (isResizing)
        {
            const newWidth = e.clientX;
            if (newWidth < computedMin || newWidth > computedMax) return;
            setWidth(newWidth);
        }
    }, [isResizing, computedMin, computedMax]);

    const handleMouseUp = useCallback(() =>
    {
        setIsResizing(false);
        document.body.style.cursor = 'default';
    }, []);

    const handleMouseDown = useCallback(() =>
    {
        setIsResizing(true);
        document.body.style.cursor = 'ew-resize';
    }, []);

    useEffect(() =>
    {
        if (isResizing)
        {
            document.addEventListener('pointermove', handleMouseMove);
            document.addEventListener('pointerup', handleMouseUp);
        } else
        {
            document.removeEventListener('pointermove', handleMouseMove);
            document.removeEventListener('pointerup', handleMouseUp);
        }

        return () =>
        {
            document.removeEventListener('pointermove', handleMouseMove);
            document.removeEventListener('pointerup', handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    return {
        width,
        isResizing,
        handleMouseDown,
    };
}
