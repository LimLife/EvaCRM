import { createSlice } from '@reduxjs/toolkit';
import { apiService } from './apiService';
import { loggerService } from './loggerService';
import { IInitialState } from './ReduxInterfaces/IInitialState';

const initialState: IInitialState = {
    services: {
        apiService,
        loggerService,
    },
    components: {},
    dependencies: {},
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setComponent: (state, action) =>
        {
            const { name, component } = action.payload;
            state.components[name] = component;
        },
        setDependencies: (state, action) =>
        {
            const { name, dependencies } = action.payload;
            state.dependencies[name] = dependencies;
        },
    },
});

export const { setComponent, setDependencies } = servicesSlice.actions;
export default servicesSlice.reducer;