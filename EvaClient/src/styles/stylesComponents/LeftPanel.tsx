import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useStyledOverrides } from "../useStyledOverrides";

interface ILeftPanel extends IOverrideProps
{
    nameComponent?: string;
}
const baseLeftPanel: CSSObject = {
    height: '100%',
};


const LeftPanel = styled.div<ILeftPanel>`
${({ overrideStyles }) =>
    {
        const merged = useStyledOverrides(baseLeftPanel, overrideStyles);
        return merged;
    }}`;

export default LeftPanel