import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function CreateOrders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [totalOrderValue, setTotalOrderValue] = useState(0);
  const [dates, setDates] = useState("");
  // const navigate = useNavigate();

  const toggleCustomerPopup = () => setShowCustomerPopup(!showCustomerPopup);
  const toggleProductPopup = () => setShowProductPopup(!showProductPopup);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAddSupplier");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        alert("An error occurred while fetching Customers. Please try again later.");
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getInventory");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("An error occurred while fetching Products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    toggleCustomerPopup();
  };

  const selectProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    toggleProductPopup();
  };

  const removeProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const handleOrder = async () => {
    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    try {
      const confirmed = window.confirm("Are you sure you want to place this Order?");
      if (confirmed) {
        for (let i = 0; i < selectedProducts.length; i++) {
          const product = selectedProducts[i];
          await axios.post("http://localhost:8080/postOrders", {
            suppliId: selectedCustomer.id,
            suppliName: selectedCustomer.name,
            suppliaddress: selectedCustomer.address,
            suppliphone: selectedCustomer.phone,
            itemId: product.id,
            itemName: product.itemName,
            itemPrice: product.itemPrice,
            itemQuantity: product.itemQuantity || 0,
            itemTotal: (product.itemPrice * (product.itemQuantity || 0)).toFixed(2),
            date: dates
          });
        }
        alert("Your order has been placed successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating orders:", error);
      alert("An error occurred while creating orders. Please try again later.");
    }
  };

  useEffect(() => {
    const totalValue = selectedProducts.reduce((total, product) => {
      return total + (product.itemPrice * (product.itemQuantity || 0));
    }, 0).toFixed(2);
    setTotalOrderValue(totalValue);
  }, [selectedProducts]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setDates(currentDate);
  }, []);

  return (
    <div>
      <div className='text-center mt-5'>
       
        <h3 className='text-center text-white p-2 mt-1 mx-2 rounded-5 'style={{backgroundColor: "#A0153E"}}>Orders</h3>
      </div>
      <div className='card mx-5'>
        <div className='d-flex mt-5 mx-5 '>
          <button className='btn btn-success m-2' onClick={toggleCustomerPopup}>Select Supplier</button>
          <button className='btn btn-success m-2' onClick={toggleProductPopup}>Select Item</button>
          {/* <button className='btn btn-success m-2' onClick={(e) => { e.preventDefault(); navigate("/main/orderlist"); }}>Order List</button> */}
        </div>
        <span className='m-3 mx-5 '>
          <p className='text-start'><strong>Supplier :</strong> {selectedCustomer ? selectedCustomer.name : 'Select a Supplier'}</p>
          <p className='text-start'><strong>Items :</strong> {selectedProducts.length > 0 ? selectedProducts.map(product => product.itemName).join(', ') : 'Select a product'}</p>
        </span>
        <div>
          <table className='table table-bordered table-secondary text-center'>
            <thead>
              <tr>
                <th>ID ↑↓</th>
                <th>Item ↑↓</th>
                <th>Quantity ↑↓</th>
                <th>Price ₹</th>
                <th>Total ↑↓</th>
                <th>Action ↑↓</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.itemName}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={product.itemQuantity || ""}
                      onChange={(e) => {
                        const updatedProducts = [...selectedProducts];
                        updatedProducts[index].itemQuantity = parseInt(e.target.value);
                        setSelectedProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>{product.itemPrice}</td>
                  <td>{(parseInt(product.itemPrice) * (parseInt(product.itemQuantity)|| 0)).toFixed(2)}</td>
                  <td>
                    <button className='btn btn-outline-danger' onClick={() => removeProduct(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className='table table-secondary text-center'>
            <thead>
              <tr>
                <th>Total Order Value :</th>
                <th className='text-success'>₹ {totalOrderValue}</th>
                <th><button className='btn btn-primary' onClick={handleOrder}>Create Order</button></th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {showCustomerPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={toggleCustomerPopup}>&times;</span>
            <h2 className="text-center">Select Supplier</h2>
            <table className='table table-hover  table-bordered'>
              <thead className='table-secondary'>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr onClick={() => selectCustomer(customer)} key={index}>
                                        <td className='text-center'>{customer.id}</td>
                    <td className='text-center'>{customer.name}</td>
                    <td className='text-center'>{customer.email}</td>
                    <td className='text-center'>{customer.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showProductPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={toggleProductPopup}>&times;</span>
            <h2 className="text-center">Select Items</h2>
            <table className='table table-hover table-bordered table-responsive overflow-y-scroll'>
              <thead className='table-secondary'>
                <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr onClick={() => selectProduct(product)} key={index}>
                    <td>{product.id}</td>
                    <td>{product.itemName}</td>
                    <td>{product.itemQuantity}</td>
                    <td>{product.itemPrice}</td>
                    <td>{(product.itemPrice * product.itemQuantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

