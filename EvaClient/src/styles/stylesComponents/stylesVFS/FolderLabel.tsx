import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseFolderLabelStyles: CSSObject = {
    cursor: "pointer",
    userSelect: "none",
    fontWeight: 400
};

export interface IFolderLabelProps extends IOverrideProps
{
    componentName?: string;
}
const FolderLabel = styled.div <IFolderLabelProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseFolderLabelStyles, $overrideStyles);
        return merged;
    }}`;

export default FolderLabel;