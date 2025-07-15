import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useStyledOverrides } from "../../hooksStyle/useStyledOverrides";


const baseTreeItemStyles: CSSObject = {
    margin: "2px",
};

export interface ITreeItemProps extends IOverrideProps
{
    componentName?: string;
}
const TreeItem = styled.ul <ITreeItemProps>`
${({ $overrideStyles }) =>
    {
        return useStyledOverrides(baseTreeItemStyles, $overrideStyles);
    }}`;

export default TreeItem;