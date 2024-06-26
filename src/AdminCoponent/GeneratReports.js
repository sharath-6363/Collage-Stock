import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function GenerateReports() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get("http://localhost:8080/getOrders");
      setOrders(ordersResponse.data);

      const inventoryResponse = await axios.get("http://localhost:8080/getInventory");
      setInventory(inventoryResponse.data);
    } catch (err) {
      console.error(err);
      alert("Data not available");
    }
  };

  const generateOrderReport = () => {
    const startDate = new Date('2024-01-01'); 
    const endDate = new Date('2024-03-31');
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    });

    const sortedOrders = filteredOrders.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    const doc = new jsPDF();
    doc.text("Order Report", 10, 10);
    doc.autoTable({ html: '#orderTable' });
    doc.save("order_report.pdf");
  };

  const generateStockLevelReport = () => {
    const doc = new jsPDF();
    doc.text("Stock Level Report", 10, 10);
    doc.autoTable({ html: '#inventoryTable' });
    doc.save("stock_level_report.pdf");
  };
  return (
    <div>
      <div className="container">
        <h1 className="my-5">Generate Reports</h1>
        <div className="row">
          <div className="col-md-8">
            <button className="btn btn-primary mb-3" onClick={generateOrderReport}>Generate Order Report</button>
            <table id="orderTable" className='table table-bordered'>
              <thead className='table-primary'>
                <tr>
                  <th>Order ID</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Order Date</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Delivered Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.itemName}</td>
                    <td>{order.itemQuantity}</td>
                    <td>{order.date}</td> {/* Corrected to use order date */}
                    <td>{order.itemPrice}</td>
                    <td>{order.itemTotal}</td>
                    <td>{order.deliveredData}</td> {/* Corrected to use delivered date */}
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary mb-3" onClick={generateStockLevelReport}>Generate Stock Level Report</button>
            <table id="inventoryTable" className='table table-bordered'>
              <thead className='table-primary'>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.itemId}>
                    <td>{item.itemName}</td>
                    <td>{item.itemQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
