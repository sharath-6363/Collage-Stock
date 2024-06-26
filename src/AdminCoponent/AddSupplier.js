import React from 'react';
import "../AllCss/addsupplier.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function AddSupplier() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [Id, setId] = useState("");
  const [Address, setAddress] = useState("");
  const [supplier, setsupplier] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePost = async () => {
    if (name === "" || email === "" || phone === "" || password === "" || Address === "") {
      alert("Please fill all the fields");
    }
    else {
      try {
        const response = await axios.post("http://localhost:8080/posAddSupplier", {
          name: name,
          email: email,
          phone: phone,
          password: password,
          address: Address
        })
        if (response.status === 200) {

          alert("Successfully Added");
          window.location.reload()

        }
        setname("")
        setemail("")
        setphone("")
        setpassword("")
        setAddress("")

      }
      catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
  }
  const handelput = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || password === "" || Address === "") {
      alert("Please fill all the fields");
    }
    else {
      try {
        const response = await axios.put("http://localhost:8080/putAddSupplier", {
          id: Id,
          name: name,
          email: email,
          phone: phone,
          password: password,
          address: Address
        })
        if (response.status === 200) {
          alert("Successfully Updated");
        }
        setname("")
        setemail("")
        setphone("")
        setpassword("")
        setAddress("")
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
        const response = await axios.get("http://localhost:8080/getAddSupplier");
        setsupplier(response.data);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching Supplier. Please try again later.");
      }
    };
    fetchData();
  }, []);
  const handleEdit = (index) => {
    if (supplier[index]) {
      const edit = supplier[index];
      setId(edit.id);
      setname(edit.name);
      setemail(edit.email);
      setphone(edit.phone);
      setpassword(edit.password);
      setAddress(edit.address);
    } else {
      console.error(`No Supplier data found at index ${index}`);
    }
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this data")
    if (confirm) {
      axios.delete(`http://localhost:8080/deleteAddSupplier/${id}`).then(res => {
        alert("Successfully Deleted")
        window.location.reload()
      })
    } else {
      alert("Delete Failed")
    }
  }
 const  handlclear=()=>{
  setname("")
  setemail("")
  setphone("")
  setpassword("")
  setAddress("")

 }
  return (
    <div>
      <div>
        <div>
          <h3 className='text-center mt-5 text-white p-2 rounded-5'style={{backgroundColor: "#A0153E"}}>Add Supplier</h3>
        </div>
        <div className='staff-container  d-flex justify-content-center mt-5'>
        <div className='staff-card  '>
          <table className='staff-table table table-bordered text-center '>
            <thead className='table-primary table-bordered'>
              <tr>
                <th>ID ↑↓</th>
                <th>Name ↑↓</th>
                <th>Email ↑↓</th>
                <th>Phone ↑↓</th>
                <th>Address ↑↓</th>
                <th>Password ↑↓</th>
                <th>Action ↑↓</th>
              </tr>
            </thead>
            <tbody className='overflow-hidden card-res'>
              {supplier.slice(indexOfFirstItem, indexOfLastItem).map((supplier, index) => (

                <tr key={index}>
                  <td>{supplier.id}</td>
                  <td> {supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.password}</td>
                  <td>
                    <div className='action-buttons'>
                      <button className='edit-button' onClick={(e) => handleEdit(index)}>
                        <FiEdit className='fs-3 edit-icon' />
                      </button>
                      <button className='delete-button' onClick={() => handleDelete(supplier.id)}>
                        <MdDelete className='fs-3 delete-icon' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {supplier.length > itemsPerPage && (
            <div className="pagination">
              <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                <div className="container-fluid">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <button className="btn btn-primary mx-2 text-center" onClick={() =>
                        paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: Math.ceil(supplier.length / itemsPerPage) }, (_, i) => (
                      <li className="nav-item" key={i}>
                        <button className="btn btn-primary mx-2 text-center" onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="nav-item">
                      <button className="btn btn-primary mx-2 text-center"
                        onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(supplier.length / itemsPerPage)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          )}
        </div>
          <div className='staff-form-card'>
        <span className='close-button' onClick={handlclear}>&times;</span>
        <div className='form-header'>
          <input
            type='text'
            className='form-control mb-2'
            placeholder='Name'
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type='email'
            className='form-control mb-2'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type='text'
            className='form-control mb-2'
            placeholder='Phone'
            required
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <input
            type='text'
            className='form-control mb-2'
            placeholder='Address'
            required
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%' }}
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <div className='text-center'>
            <button className='btn btn-primary mx-2 ' onClick={handlePost}>Add</button>
            <button className='btn btn-primary ' onClick={handelput}>Update</button>
          </div>
        </div>
      </div>
    </div>
      </div >
    </div >
  )
}
