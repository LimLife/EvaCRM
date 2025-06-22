import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useStyledOverrides } from "../useStyledOverrides";


interface INavBarStyles extends IOverrideProps
{
    nameComponent?: string;
}

const baseNavBar: CSSObject = {
    display: 'flex',
    flexDirection: 'row',
};

const NavBar = styled.nav<INavBarStyles>`
${({ overrideStyles }) =>
    {
        const merged = useStyledOverrides(baseNavBar, overrideStyles);
        return merged;
    }}`;

export default NavBar;