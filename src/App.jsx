import './App.css';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
// pages
import AmmoList from './components/AmmoList';
import SupplierList from './components/SupplierList';
import Home from './pages/Home';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import NotRequireAuth from './components/NotRequireAuth';;
import PersistLogin from './components/PersistLogin';
import AmmoTypeList from './components/Lists/AmmoTypeList';
import BrandList from './components/Lists/BrandList';
import CaliberList from './components/Lists/CaliberList';
import AmmoRegistrationForm from './components/Registrations/AmmoRegistrationForm';

function App() {
  const user = useSelector(state => state.auth.user);
  return (
    <div className="app">
      <Navbar/>
      {Object.keys(user).length > 0 && <Sidebar/>}
      <div className='mainContent'>
        <Routes>
            <Route element={<PersistLogin />}>
              <Route element={<NotRequireAuth />}>
                <Route path="/login" element={<Login/>} />
              </Route>
              <Route element={<RequireAuth />}> 
                <Route path="/" element={<Home/> } />
                <Route path="/ammoList" element={<AmmoList/>} />
                <Route path="/supplierList" element={<SupplierList/>} />
                <Route path="/ammoTypeList" element={<AmmoTypeList/>} />
                <Route path="/brandList" element={<BrandList/>} />
                <Route path="/caliberList" element={<CaliberList/>} />
                <Route path="/createAmmo" element={<AmmoRegistrationForm/>} />
              </Route>
            </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
