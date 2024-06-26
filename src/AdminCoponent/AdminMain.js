import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../AllCss/AdminMain.css"
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoPricetags } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";

import { useNavigate } from 'react-router-dom'
export default function AdminMain() {
  var navigate=useNavigate()
  const hndlenavigte=()=>{
    navigate("/adminmain/")
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="nav nav-tabs col-md-2 d-none d-md-block  sidebar">
          <div onClick={hndlenavigte}>
          <h3 className='font-monospace text-white '>College Stack Management System</h3></div>
          <hr className='w-100 text-white'></hr>
          <div className="sidebar-sticky ">
            <ul className="nav flex-column">
              <li className="nav-item">
                {/* <Link className="nav-link text-white fs-5" to='/adminmain/'></Link>  */}
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/adminmain/addinventory'> <MdOutlineInventory /> Add Items</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/adminmain/addstaff'> <BsFillPeopleFill /> Add Staffs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/adminmain/addsupplier'> <BsFillPersonPlusFill /> Add Supplier</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/adminmain/category'> <IoPricetags /> Category</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/adminmain/creatorders'> <LuPackageCheck /> Create Orders</Link></li>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-5" to='/adminmain/approveforall'><TbTruckDelivery/> Order Status</Link>
                
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/adminmain/generatreports'><LiaFileInvoiceSolid/> Reports</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link text-white fs-5" to='/'><MdLogout/> Logout</Link>

              </li>
            </ul>
          </div>
        </nav>
        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 outlets ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
