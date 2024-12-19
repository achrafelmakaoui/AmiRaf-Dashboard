import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Intro from './components/Intro/Intro'
import Login from './components/Login/Login'
import DashLandingPage from './components/DashLandPage/DashLandingPage';
import Sideber from './components/Sidebar/Sidebar';
import './App.css'
import TransactionUI from './components/OrderUI/OrderUI';
import ShopUI from './components/ProductUI/ProductUI';
import SettingUI from './components/SettingUI/SettingUI';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './components/redux/userRedux';
import UsersUI from './components/UsersUI/UsersUI';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser?.isAdmin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser && introComplete) {
      navigate('/login');
    } else if (!currentUser && !introComplete) {
      navigate('/intro');
    }
  }, [currentUser, introComplete, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    setIntroComplete(false);
    navigate('/intro');
  };

  return (
    <div className="App">
      {currentUser && (isAdmin) && <Sideber onLogout={handleLogout} />}
      <Routes>
        {isAdmin ? 
          (
            <>
              <Route path="/" element={<><DashLandingPage/></>}/>
              <Route path="/users" element={<><UsersUI/></>}/>
              <Route path="/transaction" element={<><TransactionUI/></>}/>
              <Route path="/Products" element={<><ShopUI/></>}/>
              <Route path="/Setting" element={<><SettingUI/></>}/>
              <Route path="/intro" element={<Intro onComplete={() => setIntroComplete(true)} />}/>
            </>
          )
          :
          (
            <>
              <Route path="/intro" element={<><Intro onComplete={() => setIntroComplete(true)}/></>}/>
              <Route path="/login" element={<><Login/></>}/>
            </>
          )
        }
        <Route path='/login' element={currentUser  ? <Navigate to='/'/> : <Navigate to="/login" />} />
        <Route path='*' element={currentUser  ? <Navigate to='/'/> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
