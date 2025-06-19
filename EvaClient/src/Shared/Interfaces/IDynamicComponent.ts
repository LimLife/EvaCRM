
declare global
{
    interface Dependencies
    {
        [key: string]: object;
    }
    interface IDynamicComponent
    {
        setDependencies?: (dependencies: []) => boolean;
        getDependencies?: () => [];
        dependencies: Dependencies[]
    }
}
export { };