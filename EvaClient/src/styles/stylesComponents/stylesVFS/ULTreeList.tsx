import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseULTreeListStyles: CSSObject = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
};

export interface IULTreeListProps extends IOverrideProps
{
    componentName?: string;
}
const ULTreeList = styled.ul <IULTreeListProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseULTreeListStyles, $overrideStyles);
        return merged;
    }}`;

export default ULTreeList;