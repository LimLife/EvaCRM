import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useMergedOverrideStyles } from "../../hooksStyle/useMergedOverrideStyles";

const baseFolderStyles: CSSObject = {
    display: 'grid',
    gridTemplateColumns: '1fr 9fr'
};

export interface IFoldersProps extends IOverrideProps
{
    componentName?: string;
}
const Folders = styled.div <IFoldersProps>`
${({ $overrideStyles, componentName = "container" }) =>
    {
        const merged = useMergedOverrideStyles(componentName, baseFolderStyles, $overrideStyles);
        return merged;
    }}`;

export default Folders;