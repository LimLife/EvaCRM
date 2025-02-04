import styled, { css, CSSProperties } from 'styled-components';

interface IContainer extends IOverrideProps
{
    nameComponent?: string;
}
const baseContainerStyles: IContainer = {
    display: 'flex',
    width: '100%',
    height: '100vh',
    backgroundColor: '#f0f0f0',
};

const Container = styled.div<IContainer>((props) =>
{
    let styles: CSSProperties = { ...baseContainerStyles };

    if (props.overrideStyles)
    {
        if (typeof props.overrideStyles === 'function')
        {
            styles = props.overrideStyles(styles);
        } else
        {
            styles = { ...styles, ...props.overrideStyles };
        }
    }
    return css({ ...styles });
});


interface ILeftPanel extends IOverrideProps
{
    nameComponent?: string;
}
const basePanelStyles: ILeftPanel = {
    width: 0,
    height: '100%',
    padding: '10px'
};


const LeftPanel = styled.div<ILeftPanel>((props) =>
{
    let styles: CSSProperties = { ...basePanelStyles };

    if (props.overrideStyles)
    {
        if (typeof props.overrideStyles === 'function')
        {
            styles = props.overrideStyles(styles);
        } else
        {
            styles = { ...styles, ...props.overrideStyles };
        }
    }

    return css({ ...styles });
});


interface IResizeHandleStyles extends IOverrideProps
{
    nameComponent?: string;

    onMouseDown?: (e: React.MouseEvent) => void;
};
const baseResizePanelStyles: IResizeHandleStyles = {
    position: 'absolute',
    cursor: 'ew-resize',
    width: '5px',
    height: '100%',
    backgroundColor: '#c3dced',
    marginLeft: "20px",
};



const ResizeHandle = styled.div<IResizeHandleStyles>((props) =>
{
    let styles: CSSProperties = { ...baseResizePanelStyles };

    if (props.width)
    {
        styles.left = `${props.width}px`;
    }

    if (props.overrideStyles)
    {
        if (typeof props.overrideStyles === 'function')
        {
            styles = props.overrideStyles(styles);
        } else
        {
            styles = { ...styles, ...props.overrideStyles };
        }
    }

    return css({ ...styles });
});


interface IRightPanelStyles extends IOverrideProps
{
    nameCopComponent?: string;
}
const baseRightPanel: IRightPanelStyles = {
    flex: 1,
    padding: '10px',
    borderLeft: '1px solid #ccc',
    width: "100%",
    position: 'absolute',
    left: "960px",
    marginLeft: "20px"
};

const RightPanel = styled.div<IRightPanelStyles>((props) =>
{
    let styles: CSSProperties = { ...baseRightPanel };
    if (props.width)
    {
        styles.left = `${props.width}px`;
        console.log(styles.left, props.width);
    }
    if (props.overrideStyles)
    {
        if (typeof props.overrideStyles === 'function')
        {
            styles = props.overrideStyles(styles);
        } else
        {
            styles = { ...styles, ...props.overrideStyles };
        }
    }

    return css({ ...styles });
});

export { Container, LeftPanel, RightPanel, ResizeHandle };