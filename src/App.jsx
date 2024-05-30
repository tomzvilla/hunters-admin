import './App.css'
import { Routes, Route } from "react-router-dom"


// components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
// pages
import AmmoList from './components/AmmoList'
import SupplierList from './components/SupplierList'
import Home from './pages/Home';

function App() {

  return (
    <div className="app">
      <Navbar/>
      <Sidebar/>
      <div className='mainContent'>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="ammoList" element={ <AmmoList/>} />
          <Route path="supplierList" element={ <SupplierList/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
