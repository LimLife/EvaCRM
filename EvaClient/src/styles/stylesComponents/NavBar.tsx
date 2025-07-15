import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useMergedOverrideStyles } from "../hooksStyle/useMergedOverrideStyles";


interface INavBarStyles extends IOverrideProps
{
    nameComponent?: string;
}

const baseNavBar: CSSObject = {
    display: 'flex',
    flexDirection: 'row',
};
export const NavBarStyle: Record<string, CSSObject> = { button: baseNavBar }
const NavBar = styled.nav<INavBarStyles>`
${({ $overrideStyles, nameComponent = "navBar" }) =>
    {
        const merged = useMergedOverrideStyles(nameComponent, baseNavBar, $overrideStyles);
        return merged;
    }}`;

export default NavBar;