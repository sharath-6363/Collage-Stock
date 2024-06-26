import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
export default function OrderStatus() {
  const [getdata, setgetdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {

    const fecthcdata = async () => {
      const responce = await axios.get("http://localhost:8080/getOrders")
      setgetdata(responce.data)
    }
    fecthcdata()

  }, [])
  return (
    <div>
      <div>
        <h3 className='text-center p-2 text-white rounded-5 mt-5' style={{ backgroundColor: "#A0153E" }}>Order Status</h3>
        <table className='table table-bordered mt-5 '>
          <thead className='table-primary text-center'>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Order Date</th>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Delivered Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {getdata.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.suppliName}</td>
                <td>{item.suppliaddress}</td>
                <td>{item.suppliphone}</td>
                <td>{item.date}</td>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td>{item.itemQuantity}</td>
                <td>{item.itemTotal}</td>
                <td>{item.status === 'Delivered' ? item.deliveredData : '-  -  -'}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {getdata.length > itemsPerPage && (
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
                  {Array.from({ length: Math.ceil(getdata.length / itemsPerPage) }, (_, i) => (
                    <li className="nav-item" key={i}>
                      <button className="btn btn-primary mx-2 text-center" onClick={() => paginate(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className="nav-item">
                    <button className="btn btn-primary mx-2 text-center"
                      onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(getdata.length / itemsPerPage)}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        )}
      </div>

    </div>
  )
}
