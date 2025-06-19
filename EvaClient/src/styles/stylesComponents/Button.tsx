import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useStyledOverrides } from "../useStyledOverrides";

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

const Button = styled.button<IButtonStyles>`
${({ overrideStyles }) =>
    {
        const merged = useStyledOverrides(baseButton, overrideStyles);
        return merged;
    }}`;

export default Button;