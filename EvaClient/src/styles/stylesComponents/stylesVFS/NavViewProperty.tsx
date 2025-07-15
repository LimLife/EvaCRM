import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseNavViewPropertyStyles: CSSObject = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
};

export interface INavViewPropertyProps extends IOverrideProps
{
    componentName?: string;
}
const NavViewProperty = styled.div <INavViewPropertyProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseNavViewPropertyStyles, $overrideStyles);
        return merged;
    }}`;

export default NavViewProperty;