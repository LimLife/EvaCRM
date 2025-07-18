import { useEffect, useState } from 'react';
import { Container, NavEditor, NavMenu, NavViewProperty } from "../styles/VFSUI";
import { useVfsWrite } from './vfsHooks/useVfsWrite';
import { VFSExplorer } from './VFSExplorer';


export function FileEditor()
{
    //const { readVfsFiles, loading, error, files } = useVfsRead();
    const { writeVfsFile, saving, error: writeError } = useVfsWrite();
    const [content, setContent] = useState('');

    const createAndLoadFile = async () =>
    {
        try
        {
            await writeVfsFile({
                name: 'project',
                path: '/project',
                type: 'folder',
            });
            await writeVfsFile({
                name: 'hello.txt',
                path: '/project',
                type: 'file',
                content: 'console.log("Hi!")',
            })
            await writeVfsFile({
                name: 'projectA',
                path: '/projectA',
                type: 'folder',
            });
            await writeVfsFile({
                name: 'helloA.txt',
                path: '/projectA',
                type: 'file',
                content: 'console.log("Hi!")',
            })
            /*
            await writeVfsFile({
                name: 'Test',
                path: "/Testingsdsdsd",
                type: 'folder',
            });
            */
            //await readVfsFiles("/");
            console.log(writeError);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    useEffect(() =>
    {
        createAndLoadFile();
    }, []);

    return (
        <Container>
            <VFSExplorer />
            <NavEditor>
                <NavMenu>
                    <div id="FileName">FileName</div>
                    <div id="Search">Search</div>
                    <div id="Edit">Edit</div>
                </NavMenu>
                <NavViewProperty>
                    View-Property
                </NavViewProperty>
                <textarea aria-label='empty' rows={10} cols={50} />
            </NavEditor>
        </Container>
    );
}
