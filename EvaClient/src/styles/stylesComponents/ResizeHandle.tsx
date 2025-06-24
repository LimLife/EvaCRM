import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useMergedOverrideStyles } from "../useMergedOverrideStyles";

interface IResizeHandleStyles extends IOverrideProps
{
    nameComponent?: string;

    onMouseDown?: (e: React.MouseEvent) => void;
};
const baseResizePanelStyles: CSSObject = {
    position: 'absolute',
    cursor: 'ew-resize',
    height: '100%',
    marginLeft: "21px",
    border: "1px solid #000000",
};

export const ResizeHandleStyle: Record<string, CSSObject> = { button: baseResizePanelStyles }

const ResizeHandle = styled.div<IResizeHandleStyles>`
${({ overrideStyles, nameComponent = "resizeHandle" }) =>
    {
        const merged = useMergedOverrideStyles(nameComponent, baseResizePanelStyles, overrideStyles);
        return merged;
    }}`;

export default ResizeHandle