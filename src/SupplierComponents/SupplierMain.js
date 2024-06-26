import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdHistory } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import { useNavigate } from 'react-router-dom'
export default function SupplierMain() {
  var navigate=useNavigate()
  const hndlenavigte=()=>{
    navigate("/supplierMain/")
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
                <Link className="nav-link text-white fs-5" to='/supplierMain/'><MdOutlineInventory /> View Orders</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/supplierMain/history'>History</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/supplierMain/history'><MdHistory/> History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to='/'><MdLogout/> Log-Out</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 outlets ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
