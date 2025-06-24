import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useMergedOverrideStyles } from "../useMergedOverrideStyles";

interface ILeftPanel extends IOverrideProps
{
    nameComponent?: string;
}
const baseLeftPanel: CSSObject = {
    height: '100%',
};

export const LeftPanelStyle: Record<string, CSSObject> = { button: baseLeftPanel }
const LeftPanel = styled.div<ILeftPanel>`
${({ overrideStyles, nameComponent = "leftPanel" }) =>
    {
        const merged = useMergedOverrideStyles(nameComponent, baseLeftPanel, overrideStyles);
        return merged;
    }}`;

export default LeftPanel