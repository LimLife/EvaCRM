import styled, { CSSObject } from "styled-components";
import { useStyledOverrides } from "../useStyledOverrides";
import { IOverrideProps } from "../toolsStyle/type";

const baseContainerStyles: CSSObject = {
    display: 'flex',
    position: "absolute",
    flexDirection: 'column'
};

export interface IContainerProps extends IOverrideProps
{
    componentName?: string;
}

const Container = styled.div <IContainerProps>`
${({ overrideStyles }) =>
    {
        const merged = useStyledOverrides(baseContainerStyles, overrideStyles);
        return merged;
    }}`;

export default Container;