import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Authentication/Login';
import { useGlobalAuthContext } from './Context/AuthContext';
import PrivateRoute from './Authentication/PrivateRoute';

function App() {
  const { user } = useGlobalAuthContext();
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route path='*' element={<div>404 Page Not Found.</div>}></Route>
    </Routes>
  );
}
export default App;

{
  /* 
      <Route
        path='/'
        element={user ? <Home /> : <Navigate to='/login' />}
      ></Route>
  */
}
