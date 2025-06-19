import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useStyledOverrides } from "../useStyledOverrides";


interface IRightPanelStyles extends IOverrideProps
{
    nameCopComponent?: string;
}
const baseRightPanel: CSSObject = {
    flex: 1,
    borderLeft: '1px solid #ccc',
    position: 'absolute',
    marginLeft: "20px"
};

const RightPanel = styled.div<IRightPanelStyles>`
${({ overrideStyles }) =>
    {
        const merged = useStyledOverrides(baseRightPanel, overrideStyles);
        return merged;
    }}`;

export default RightPanel;