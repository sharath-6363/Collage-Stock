import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { staffcontext } from '../staffcontext';

export default function ViewOrders() {
  const [getdata, setgetdata] = useState([]);
  const [status, setStatus] = useState("");
  const { staffcont } = useContext(staffcontext);
  const [dates, setDates] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setDates(currentDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getOrders");
        setgetdata(response.data);
      } catch (err) {
        console.error(err);
        alert("Data not available");
      }
    };
    fetchData();
  }, []);

  

  const handleOnChange = (e, item) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    handlePut(item, newStatus);
    if (newStatus === 'Delivered') {
      addQuantity(item);
    }
  };

  const addQuantity = async (item) => {
    try {
      const inventoryResponse = await axios.get('http://localhost:8080/getInventory');

      const currentQuantity = inventoryResponse.data.filter((items) => items.itemName === item.itemName && items.itemQuantity);

      const newQuantity = parseInt(currentQuantity[0].itemQuantity) + parseInt(item.itemQuantity);
      const updateResponse = await axios.put('http://localhost:8080/putInventory', {
        id: item.itemId,
        itemQuantity: newQuantity,
        itemImage: currentQuantity[0].itemImage,
        itemName: currentQuantity[0].itemName,
        itemPrice: currentQuantity[0].itemPrice,
        itemDescription: currentQuantity[0].itemDescription,
        date: currentQuantity[0].date,
        itemcategory: currentQuantity[0].itemcategory,
      });
      if (updateResponse.status === 200) {

        console.log("Inventory updated successfully.");
      }
    } catch (err) {
      console.error(err);
      console.log("Data not Updated");
    }
  };

  const handlePut = async (item, newStatus) => {
    try {
      const response = await axios.put("http://localhost:8080/putOrders", {
        id: item.id,
        suppliName: item.suppliName,
        suppliId: item.suppliId,
        suppliphone: item.suppliphone,
        suppliaddress: item.suppliaddress,
        itemId: item.itemId,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemQuantity: item.itemQuantity,
        itemTotal: item.itemTotal,
        date: item.date,
        deliveredData: dates,
        status: newStatus
      });

      if (response.status === 200) {
        alert("Status Updated");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Data not Updated");
    }
  };

  return (
    <div>
      <div>
        <h3 className='text-center mt-5 text-white rounded-5 p-2' style={{ backgroundColor: "#A0153E" }}>View Orders</h3>
      </div>
      <div className='container mt-5'>
        <div className='card w-100 p-4'>
          <table className='table table-bordered'>
            <thead className='table-primary'>
              <tr>
                <th>Order ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {getdata.filter(item => item.status !== "Reject" && item.status !== "Delivered" && item.suppliName === (staffcont && staffcont.name))
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.itemName}</td>
                    <td>{item.itemQuantity}</td>
                    <td>{item.itemPrice}</td>
                    <td>{item.itemTotal}</td>
                    <td>
                      <select className='form-select'
                        value={status}
                        onChange={(e) => handleOnChange(e, item)}>
                        <option value="Select Status">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                      </select>
                    </td>
                    <td>{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
