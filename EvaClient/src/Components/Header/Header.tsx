import React, { useEffect, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../Store/servicesSlice';


const urlModule = import.meta.env.VITE_URL_MODULE;

const Header: FC = () =>
{
    const dispatch = useDispatch();
    const [Component, setComponents] = useState<React.FC<IDynamicComponent>>();
    const [dependencies, setDependencies] = useState<Dependencies[]>([]);

    const createProxyComponent = (module: { default: React.ComponentType<IDynamicComponent> }) =>
    {
        const ProxyComponent: React.FC<IDynamicComponent> = (props) =>
        {
            if (props.getDependencies === undefined) return null;
            const dependenciess = props.getDependencies();
            setDependencies(dependenciess); // сюда надо загрузить
            return React.createElement(module.default);
        };
        return ProxyComponent;
    };
    useEffect(() =>
    {
        const loadComponent = async () =>
        {
            const module: { default: React.ComponentType<IDynamicComponent> } = await import(urlModule).catch(null);
            if (!module) return;

            // Прокси-компонент для управления зависимостями
            const ProxyComponent = createProxyComponent(module);
            setComponents(() => ProxyComponent);
            dispatch(
                setComponent({
                    name: "DynamicComponent",
                    component: <ProxyComponent dependencies={dependencies} />,
                })
            );
        }
        loadComponent();
    }, [dependencies]);

    return (
        <div>
            <h1>Header</h1>
            {Component && <Component dependencies={dependencies} />}
        </div>
    );
};

export default Header;