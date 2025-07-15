import styled, { CSSObject } from "styled-components";
import { IOverrideProps } from "../toolsStyle/type";
import { useStyledOverrides } from "../hooksStyle/useStyledOverrides";

interface IInputStyles extends IOverrideProps
{
    nameComponent?: string;
}

const baseInput: CSSObject = {
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: '16px',
    outline: 'none',
    width: '100%'
};

const Input = styled.input<IInputStyles>`
${({ $overrideStyles }) =>
    {
        return useStyledOverrides(baseInput, $overrideStyles);
    }}
     &::placeholder{
            color: black
        }  
    `;

export default Input;