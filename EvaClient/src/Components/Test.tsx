import { useEffect } from "react";


const Test = () =>
{
    function Ex() { console.log("Hello world"); }
    useEffect(() => { }, []);
    Ex();
    return (<>
        {'Hello World!!!'}
    </>)
}

export default Test;