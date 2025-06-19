import React, { FC } from "react";
import { runtime } from "../core/runtime";
import { loadModuleLazy } from "../utils/loadModuleLazy";
const Test: FC = () =>
{
    const ComponentA = React.lazy(() => loadModuleLazy('ComponentA'));

    return (<>
        <React.Suspense fallback={<div>Loading...</div>}>
            <ComponentA />
            <button onClick={() => runtime.eventBus.emit('forceSelect', '456')}>
                Force Select 456 (via eventBus)
            </button>
        </React.Suspense>
    </>)
}

export default Test



