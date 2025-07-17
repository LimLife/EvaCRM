import { ReactNode } from "react";

export interface MapListProps<T>
{
    content: T[];
    element: (item: T, index: number) => ReactNode;
    wrapper?: (children: ReactNode) => ReactNode;
    keyExtractor?: (item: T, index: number) => string | number;
}