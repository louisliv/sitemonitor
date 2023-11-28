import { Container } from 'react-bootstrap';
import './App.scss';

import SiteNavbar from './components/navbar';

import { Home } from './pages/home/Home';
import SystemInfo from './pages/system-info/SystemInfo';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className='d-flex'>
        <SiteNavbar />
        <Container fluid>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sitemonitor" element={<Home />} />
          <Route path="/sitemonitor/system-info" element={<SystemInfo />} />
        </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App;
