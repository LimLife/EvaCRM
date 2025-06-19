
import React from 'react';
import Runtime from './IRuntime';
import { useAppStore } from './sharedStore';
import { eventBus } from './eventBus';



export const runtime: Runtime = {
    React,
    useAppStore,
    eventBus
};


