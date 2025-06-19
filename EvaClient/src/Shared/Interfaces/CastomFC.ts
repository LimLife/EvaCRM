/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';

// Создаем кастомный тип, который расширяет React.FC
type CustomFC<P = {}> = React.FC<P> & {
    injectProps?: (prop: string) => void;
};

export default CustomFC;