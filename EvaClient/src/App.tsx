import { Link } from "react-router-dom";
import AppRoutes from './routes/AppRoutes.tsx';
import * as UI from "./styles/UI.ts";
function App()
{
  return (
    <>
      <UI.NavBar id="nav-menu">
        <nav about="editor">
          <Link to='/editor-monaco'>Editor</Link>
        </nav>
        <nav about="main">
          <Link to='/'>Main</Link>
        </nav>
      </UI.NavBar>
      <main>
        <AppRoutes />
      </main>
    </>
  )
}

export default App
