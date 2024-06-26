import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { staffcontext } from '../staffcontext';

const History = () => {
  const [orders, setOrders] = useState([]);
  const {staffcont}=useContext(staffcontext)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getOrders");
        setOrders(response.data);
      } catch (error) { 
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className='text-center text-white p-2 rounded-5' style={{ backgroundColor: "#A0153E" }}>Order History</h3>
      <table className='table table-bordered text-center mt-5'>
        <thead className='table-primary'>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Delivered Date</th>
            <th>Items Name</th>
            <th>Quantity</th>
            <th>Total Amount ₹</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {orders.slice(indexOfFirstItem, indexOfLastItem).map(order => (order.status==="Delivered" && order.suppliName === staffcont.name &&
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.deliveredData}</td>
              <td>
                {order.itemName}
              </td>
              <td>{order.itemQuantity}</td>
              <td>₹  {order.itemTotal}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }, (_, i) => (
                      <li className="nav-item" key={i}>
                        <button className="btn btn-primary mx-2 text-center" onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="nav-item">
                      <button className="btn btn-primary mx-2 text-center"
                        onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          )}
    </div>
  );
};

export default History;
