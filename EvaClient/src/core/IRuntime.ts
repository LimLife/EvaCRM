import React from "react";
import { useAppStore } from './sharedStore';
import { eventBus } from "./eventBus";
export default interface Runtime
{
    React: typeof React;
    useAppStore: typeof useAppStore;
    eventBus: typeof eventBus;
}