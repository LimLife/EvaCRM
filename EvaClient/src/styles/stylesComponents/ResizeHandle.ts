import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useStyledOverrides } from "../useStyledOverrides";

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



const ResizeHandle = styled.div<IResizeHandleStyles>`
${({ overrideStyles }) =>
    {
        const merged = useStyledOverrides(baseResizePanelStyles, overrideStyles);
        return merged;
    }}`;

export default ResizeHandle