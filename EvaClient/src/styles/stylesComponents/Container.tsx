import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useMergedOverrideStyles } from "../useMergedOverrideStyles";

const baseContainerStyles: CSSObject = {
    display: 'flex',
    position: "absolute",
    flexDirection: 'column'
};

export interface IContainerProps extends IOverrideProps
{
    componentName?: string;
}
export const ContainerStyle: Record<string, CSSObject> = { button: baseContainerStyles }
const Container = styled.div <IContainerProps>`
${({ overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseContainerStyles, overrideStyles);
        return merged;
    }}`;

export default Container;