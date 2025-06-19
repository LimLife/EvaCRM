import React from "react";
import Runtime from "./IRuntime";
import { RuntimeContext } from "./Context/RuntimeContext";
export function init(runtime: Runtime, Remote: React.FC): { Component: React.FC }
{
    const Component: React.FC = () => (
        <RuntimeContext.Provider value={runtime}>
            <Remote />
        </RuntimeContext.Provider>
    );

    runtime.eventBus.on('forceSelect', (id: string) =>
    {
        runtime.useAppStore.getState().setSelectedItem(id);
    });

    return { Component };
}
