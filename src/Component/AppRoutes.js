import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CreateShipment from './CreateShipment';
import Trackorder from './Trackorder';
import AdminPanel from './Adminpanel';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-shipment" element={<CreateShipment />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/track-order/:shipmentId"  element={<Trackorder />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;