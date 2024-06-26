import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "../AllCss/AdminMain.css"
import { useNavigate } from 'react-router-dom'
import { MdOutlineInventory } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

export default function StaffMain() {
  var navigate=useNavigate()
  const hndlenavigte=()=>{
    navigate("/staffMain/")
  }
    return(
    <div className="container-fluid">
    <div className="row">
      <nav className="nav nav-tabs col-md-2 d-none d-md-block  sidebar">
        <div onClick={hndlenavigte}>
          <h3 className='font-monospace text-white ' ><Link to="/staffMain/"className='font-monospace text-white text-decoration-none '>College Stack Management System</Link></h3>
          </div>
          <hr className='w-100 text-white'></hr>
        <div className="sidebar-sticky ">
          <ul className="nav flex-column">
            <li className="nav-item">
              {/* <Link className="nav-link text-white fs-5" to='/staffMain/'></Link> */}
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to='/staffMain/staffinventory'><MdOutlineInventory/> Add Items</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to='/staffMain/createorder'><LuPackageCheck/> Create Order</Link>
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
);
}
