import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseFileLabelStyles: CSSObject = {
    cursor: "pointer",
    userSelect: "none",
    fontWeight: 400
};

export interface IFileLabelProps extends IOverrideProps
{
    componentName?: string;
}
const FileLabel = styled.div <IFileLabelProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseFileLabelStyles, $overrideStyles);
        return merged;
    }}`;

export default FileLabel;