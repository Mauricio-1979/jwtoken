import { Fragment, useState, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Dashboard from './container/Dashboard';
import Login from './container/Login';
import Register from './container/Register';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Landing from './container/Landing';
import axios from 'axios';

toast.configure();

function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try {
      const response = await axios.get('/auth/is-verify', {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json()
      
      parseRes === true ? setIsAuthenticated(true) :
      setIsAuthenticated(false)

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  },[])
  return (
    <Fragment>
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route exact path='/login' element={! isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate setAuth={setAuth} replace to='/dashboard'/>} />
          <Route exact path='/register' element={! isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate replace to='/login' />} />
          <Route exact path='/dashboard' element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate replace to='/login' />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
