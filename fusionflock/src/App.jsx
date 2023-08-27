import './App.css';
import Signup from './pages/Signup'
import Home from './pages/Home';
import Signin from './pages/Signin';

import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/api/users/signup' element={<Signup />}></Route>
      <Route path='/api/users/signin' element={<Signin />}></Route>
    </Routes>
  );
}

export default App;
