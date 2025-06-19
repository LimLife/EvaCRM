import { FC } from 'react';
import { Service } from "./Services"
export interface IInitialState
{
    services: {
        apiService: Service;
        loggerService: Service;
    };
    components: Record<string, FC>;
    dependencies: Record<string, FC>;
}