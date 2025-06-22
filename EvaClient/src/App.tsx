import { Link } from "react-router-dom";
import AppRoutes from './routes/AppRoutes.tsx';

function App()
{
  return (
    <>
      <nav>
        <Link to='/editor-monaco'>Editor</Link>
        <Link to='/'>Main</Link>
      </nav>
      <main>
        <AppRoutes />
      </main>
    </>
  )
}

export default App
