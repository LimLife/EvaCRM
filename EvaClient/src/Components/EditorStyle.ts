import styled from 'styled-components';


interface PanelProps {
  width: number;
}

interface ResizeHandleProps {
  width: number;
  onMouseDown: (e: React.MouseEvent) => void;
}


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;


const LeftPanel = styled.div<PanelProps>`
  width: ${({ width }) => `${width}px`};
  height: 100%;
  padding: 10px;
  border-right: 1px solid #ccc;
`;


const RightPanel = styled.div<PanelProps>`
  width: ${({ width }) => `calc(100% - ${width}px)`};
  flex: 1;
  padding: 10px;
  border-left: 1px solid #ccc;
`;


const ResizeHandle = styled.div<ResizeHandleProps>`
  position: absolute;
  left: ${({ width }) => `${width}px`};
  cursor: ew-resize;
  width: 5px;
  margin-left: 29px;
  height: 100%;
  background-color: #c3dced;
`;


export {Container, LeftPanel, RightPanel, ResizeHandle};