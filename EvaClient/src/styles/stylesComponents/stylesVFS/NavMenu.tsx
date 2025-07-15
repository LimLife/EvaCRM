import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseNavMenuStyles: CSSObject = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
};

export interface INavMenuProps extends IOverrideProps
{
    componentName?: string;
}
const NavMenu = styled.div <INavMenuProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseNavMenuStyles, $overrideStyles);
        return merged;
    }}`;

export default NavMenu;