import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseNavEditorStyles: CSSObject = {
    display: 'grid',
};

export interface INavEditorProps extends IOverrideProps
{
    componentName?: string;
}
const NavEditor = styled.div <INavEditorProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseNavEditorStyles, $overrideStyles);
        return merged;
    }}`;

export default NavEditor;