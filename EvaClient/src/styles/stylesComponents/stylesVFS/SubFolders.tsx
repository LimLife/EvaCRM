import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseSubFolderStyles: CSSObject = {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr'
};

export interface ISubFoldersProps extends IOverrideProps
{
    componentName?: string;
}
const SubFolders = styled.div <ISubFoldersProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseSubFolderStyles, $overrideStyles);
        return merged;
    }}`;

export default SubFolders;