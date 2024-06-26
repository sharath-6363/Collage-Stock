import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddInventory from "./AdminCoponent/AddInventory.js"
import Addstaff from "./AdminCoponent/AddStaff.js"
import AddSupplier from "./AdminCoponent/AddSupplier.js"
import AdminDashbord from "./AdminCoponent/AdminDashbord.js"
import OrderStatus from "./AdminCoponent/OrderStatus.js"
import Category from "./AdminCoponent/Category.js"
import Creatorders from "./AdminCoponent/CreatOrders.js"
import GenratReports from "./AdminCoponent/GeneratReports.js"
import Login from "./AdminCoponent/Login.js"
import AdminMain from "./AdminCoponent/AdminMain.js"
import StaffMain from './StaffComponents/StaffMain.js';
import CreatOrders from './StaffComponents/CreatOrders.js';
import StaffInventryManage from './StaffComponents/StaffInventryManage.js';
import StaffDashbord from './StaffComponents/StaffDashbord.js';
import SupplierMain from './SupplierComponents/SupplierMain.js';
import ViewOrders from './SupplierComponents/ViewOrders.js';
import UpdateOrderStatus from './SupplierComponents/UpdateOrderStatus.js';
import History from './SupplierComponents/History.js';
import { staffcontext } from './staffcontext.js';
function App() {
  const [staffcont, setStaffcont] = useState(() => {
    try {
      const item = window.localStorage.getItem('staffcont');
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error("Error parsing staffcont from localStorage:", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('staffcont', JSON.stringify(staffcont));
    } catch (error) {
      console.error("Error saving staffcont to localStorage:", error);
    }
  }, [staffcont]);
  return (
    <div className="App">
      <staffcontext.Provider value={{ staffcont, setStaffcont }}>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='adminmain' element={<AdminMain />}>
              <Route index element={<AdminDashbord />} />
              <Route path='addinventory' element={<AddInventory />} />
              <Route path='addstaff' element={<Addstaff />} />
              <Route path='addsupplier' element={<AddSupplier />} />
              <Route path='approveforall' element={<OrderStatus />} />
              <Route path='category' element={<Category />} />
              <Route path='creatorders' element={<Creatorders />} />
              <Route path='generatreports' element={<GenratReports />} />
            </Route>
            <Route path='staffMain' element={<StaffMain />}>
              <Route index element={<StaffDashbord />} />
              <Route path='staffinventory' element={<StaffInventryManage />} />
              <Route path='createorder' element={<CreatOrders />} />
            </Route>
            <Route path='supplierMain' element={<SupplierMain />}>
              <Route index element={<ViewOrders />} />
              <Route path='OrdersStatus' element={<UpdateOrderStatus />} />
              <Route path='history' element={<History />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </staffcontext.Provider>

    </div>
  );
}

export default App;
