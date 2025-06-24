import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useMergedOverrideStyles } from "../useMergedOverrideStyles";


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
export const RightPanelStyle: Record<string, CSSObject> = { button: baseRightPanel }
const RightPanel = styled.div<IRightPanelStyles>`
${({ overrideStyles, nameCopComponent = "rightPanel" }) =>
    {
        const merged = useMergedOverrideStyles(nameCopComponent, baseRightPanel, overrideStyles);
        return merged;
    }}`;

export default RightPanel;