import { FC,ReactNode} from "react"


const MainContainer: FC<{children:ReactNode}> = ({ children }) =>
{
    return (<>
        { children}
    </>)
}

export default MainContainer;

