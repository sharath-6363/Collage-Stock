import React from 'react'
import { useState, useEffect } from 'react';
import "../AllCss/addstaff.css"
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
export default function AddStaff() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [Id, setId] = useState("");
  const [Branch, setBranch] = useState("");
  const [staffdata, setstaffdata] = useState([])

  const handlePost = async () => {
    if (name === "" || email === "" || phone === "" || password === "" || Branch === "") {
      alert("Please fill all the fields");
    }
    else {
      try {
        const response = await axios.post("http://localhost:8080/postStaff", {
          name: name,
          email: email,
          phone: phone,
          password: password,
          department: Branch
        })
        if (response.status === 200) {

          alert("Successfully Added");
        }
        setname("")
        setemail("")
        setphone("")
        setpassword("")
        setBranch("")

      }
      catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
  }
  const handelput = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || password === "" || Branch === "") {
      alert("Please fill all the fields");
    }
    else {
      try {
        const response = await axios.put("http://localhost:8080/putStaff", {
          id: Id,
          name: name,
          email: email,
          phone: phone,
          password: password,
          department: Branch
        })
        if (response.status === 200) {
          alert("Successfully Updated");
        }
        setname("")
        setemail("")
        setphone("")
        setpassword("")
        setBranch("")
      }
      catch (error) {
        console.log(error);
        alert("Something went wrong : Update cancelled");
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getStaff");
        setstaffdata(response.data);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching Staff. Please try again later.");
      }
    };
    fetchData();
  }, []);
  const handleEdit = (index) => {
    if (staffdata[index]) {
      const edit = staffdata[index];
      setId(edit.id);
      setname(edit.name);
      setemail(edit.email);
      setphone(edit.phone);
      setpassword(edit.password);
      setBranch(edit.department);
    } else {
      console.error(`No staff data found at index ${index}`);
    }
  }
  
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this data")
    if (confirm) {
      axios.delete(`http://localhost:8080/deleteStaff/${id}`).then(res => {
        alert("Successfully Deleted")
        window.location.reload()
      })
    } else {
      alert("Delete Failed")
    }
  }
  const handlecancel=()=>{
    setname("")
    setemail("")
    setphone("")
    setpassword("")
    setBranch("")
  }
  return (
    <div>
      <div>
        <div>
          <h3 className='text-center mt-5 p-2 text-white rounded-5'style={{backgroundColor: "#A0153E"}}>Add Staff</h3>
        </div>
        <div className='bgcolloring p-2 d-flex justify-content-center m-2 mt-5'>
          <div className='card w-100 carddata p-2'>
            <table className=' table table-bordered text-center table-responsive'>
              <thead className='table-primary table-bordered'>
                <tr>
                  <th>ID ↑↓</th>
                  <th>Name ↑↓</th>
                  <th>Email ↑↓</th>
                  <th>Phone ↑↓</th>
                  <th>Branch ↑↓</th>
                  <th>Password ↑↓</th>
                  <th>Action ↑↓</th>
                </tr>
              </thead>
              <tbody className='overflow-hidden card-res'>
                {staffdata.map((staff, index) => (
                  <tr key={index}>
                    <td>{staff.id}</td>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.department}</td>
                    <td>{staff.password}</td>
                    <td>
                      <div className='text-center d-flex'>
                        <button className='border-0 bg-white mx-2 text-center' onClick={()=>handleEdit(index)}><CiEdit className='fs-3 ciedit' />
                        </button>
                        <button className='border-0 bg-white text-center' onClick={() => handleDelete(staff.id)}><AiFillDelete className='fs-3 cdelete' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                <div className="container-fluid">
                  <ul className="navbar-nav mx-auto">
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className='card  p-3 px-2 mx-3 tabledata'>
            <span className='fs-4 text-end ' onClick={handlecancel}>&times;</span>
            <div className='card-header'>
              <input
                type='text'
                className='form-control mb-2'
                placeholder='Name'
                value={name}
                style={{ width: '100%' }}
                onChange={(e) => setname(e.target.value)}
                required
              />
              <input
                type='email'
                className='form-control mb-2'
                placeholder='Email'
                value={email}
                required
                onChange={(e) => setemail(e.target.value)}
                style={{ width: '100%' }}
              />
              <input
                type='text'
                className='form-control mb-2'
                placeholder='Branch Name'
                value={Branch}
                required
                onChange={(e) => setBranch(e.target.value)}
                style={{ width: '100%' }}
              />
              <input
                type='text'
                className='form-control mb-2'
                placeholder='Phone'
                value={phone}
                required
                onChange={(e) => setphone(e.target.value)}
                style={{ width: '100%' }}
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder='Password'
                value={password}
                required
                onChange={(e) => setpassword(e.target.value)}
                style={{ width: "100%" }}
              />
              <div className='text-center'>
                <button className='btn btn-primary mx-2' onClick={handlePost}>Add</button>
                <button className='btn btn-primary ' onClick={handelput}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
