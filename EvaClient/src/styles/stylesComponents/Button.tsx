import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useMergedOverrideStyles } from "../hooksStyle/useMergedOverrideStyles";

interface IButtonStyles extends IOverrideProps
{
    nameComponent?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const baseButton: CSSObject = {
    flex: 1,
    borderLeft: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: "20px"
};
export const ButtonStyle: Record<string, CSSObject> = { button: baseButton }
const Button = styled.button<IButtonStyles>`
${({ $overrideStyles, nameComponent = 'button' }) =>
    {
        const merged = useMergedOverrideStyles(nameComponent, baseButton, $overrideStyles);
        return merged;
    }}`;

export default Button;