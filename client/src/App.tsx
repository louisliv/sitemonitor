import React, { useEffect, useContext } from 'react';

import { Container } from 'react-bootstrap';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import './App.scss';

import SiteNavbar from './components/navbar';

import { Home } from './pages/home/Home';
import SystemInfo from './pages/system-info/SystemInfo';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';

import { AuthContext } from './context/auth';
import { routeData } from './utils/utils';
import api from './utils/api';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  useEffect(() => {
    async function checkAuth() {
      const path = location.pathname;
      const siteRoute = routeData[path];

      if (!siteRoute) {
        navigate('/sitemonitor/login');
        return;
      }

      try {
        await api.get('/auth/is_authenticated');
        login();

        if (path === "/sitemonitor/login") {
          navigate('/sitemonitor');
        }
      } catch (error) {
        logout();
        if (siteRoute.shouldUseAuth) {
          navigate('/sitemonitor/login');
        }
      }
    }

    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      <div className='d-flex'>
        <SiteNavbar />
        <Container fluid>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sitemonitor" element={<Home />} />
          <Route path="/sitemonitor/system-info" element={<SystemInfo />} />
          <Route path="/sitemonitor/login" element={<Login />} />
          <Route path="/sitemonitor/settings" element={<Settings />} />
        </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App;
