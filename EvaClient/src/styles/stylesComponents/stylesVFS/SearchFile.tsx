import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../../toolsStyle/type";
import { useStyledOverrides } from "../../hooksStyle/useStyledOverrides";

const baseSearchFileStyles: CSSObject = {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    alignItems: 'center'
};

export interface ISearchFileProps extends IOverrideProps
{
    componentName?: string;
}
const SearchFile = styled.div <ISearchFileProps>`
${({ $overrideStyles }) =>
    {
        return useStyledOverrides(baseSearchFileStyles, $overrideStyles);
    }}`;

export default SearchFile;