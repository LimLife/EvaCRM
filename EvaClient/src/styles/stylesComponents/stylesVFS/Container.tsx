import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseContainerStyles: CSSObject = {
    display: 'grid',
    gridTemplateColumns: '2fr 5fr'
};

export interface IContainerProps extends IOverrideProps
{
    componentName?: string;
}
const Container = styled.div <IContainerProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseContainerStyles, $overrideStyles);
        return merged;
    }}`;

export default Container;