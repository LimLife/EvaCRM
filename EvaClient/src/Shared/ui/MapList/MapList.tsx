import { MapListProps } from "./MapListProps";

export function MapList<T>({
    content,
    element,
    wrapper,
    keyExtractor = (_, i) => i,
}: MapListProps<T>)
{
    const children = content.map((item, i) => (
        <div key={keyExtractor(item, i)}>
            {element(item, i)}
        </div>
    ));

    return <>{wrapper ? wrapper(children) : children}</>;
}