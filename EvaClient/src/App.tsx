import { Link } from "react-router-dom";
import AppRoutes from './routes/AppRoutes.tsx';
import { NavBar } from "./styles/UI";
function App()
{
  return (
    <>
      <NavBar id="nav-menu">
        <nav about="code-editor">
          <Link to='/editor-monaco'>Editor</Link>
        </nav>
        <nav about="file-editor">
          <Link to='/file-editor'>File Editor</Link>
        </nav>
        <nav about="main">
          <Link to='/'>Main</Link>
        </nav>
      </NavBar>
      <main>
        <AppRoutes />
      </main>
    </>
  )
}

export default App
