import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function StaffInventryManage() {
    const [showPopup, setShowPopup] = useState(false);
    const [id, setId] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [barcode, setBarcode] = useState("");
    const [errormsg, seterrormsg] = useState("");
    const [inventory, setinventory] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [categories, setCategories] = useState([]);
    const [filteredPrcoducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const handleAdd = async (e) => {
      e.preventDefault();
      if (
        !image ||
        !name ||
        !category ||
        !description ||
        !quantity ||
        !price ||
        !barcode
      ) {
        seterrormsg("Please fill all the fields");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/postInventory",
            {
              itemImage: image,
              itemName: name,
              itemcategory: category,
              itemDescription: description,
              itemQuantity: quantity,
              itemPrice: price,
              itembarcode: barcode,
            }
          );
          if (response.status === 200) {
            alert("Item Added Successfully");
            setId("");
            setImage("");
            setName("");
            setCategory("");
            setDescription("");
            setQuantity("");
            setPrice("");
            setBarcode("");
            setShowPopup(false);
          }
        } catch (error) {
          alert("Error Occured");
        }
      }
    };
    const handleEdit = (index) => {
      const edit = inventory[index];
      setId(edit.id);
      setImage(edit.itemImage);
      setName(edit.itemName);
      setCategory(edit.itemcategory);
      setDescription(edit.itemDescription);
      setQuantity(edit.itemQuantity);
      setPrice(edit.itemPrice);
      setBarcode(edit.itembarcode);
      setEditIndex(index);
  
      setShowPopup(true);
    };
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:8080/getInventory");
          setinventory(response.data);
          setFilteredProducts(response.data); 
          response.data.map((item) => {
            if ((parseInt(item.itemQuantity)) < 10) {
              toast.error(`"${item.itemName}" quantity is low `,{theme:"colored"});
            }
          })
        } catch (error) {
          console.error("Error fetching products:", error);
          alert("An error occurred while fetching Products. Please try again later.");
        }
      };
      fetchProducts();
    }, []);
    const handcancel = () => {
      setId("");
      setImage("");
      setName("");
      setCategory("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setBarcode("");
      setShowPopup(false);
      setEditIndex(null);
    };
    const handleMedia = (e) => {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    };
    // const handleReject = async (id) => {
    //   try {
    //     const confirmed = window.confirm(
    //       "Are you sure you want to delete this Product?"
    //     );
    //     if (confirmed) {
    //       await axios.delete(`http://localhost:8080/deleteInventory/${id}`);
    //       alert("Product  Deleted");
    //       window.location.reload();
    //     }
    //   } catch (error) {
    //     console.error("Error deleting Product:", error);
    //   }
    // };
  
    const handleput = async (e) => {
      e.preventDefault();
      if (
        !image ||
        !name ||
        !category ||
        !description ||
        !quantity ||
        !price ||
        !barcode
      ) {
        seterrormsg("Please fill all the fields");
      } else {
        try {
          const response = await axios.put("http://localhost:8080/putInventory", {
            id: id,
            itemImage: image,
            itemName: name,
            itemcategory: category,
            itemDescription: description,
            itemQuantity: quantity,
            itemPrice: price,
            itembarcode: barcode,
          });
          if (response.status === 200) {
            alert("Item Updated Successfully");
            setId("");
            setImage("");
            setName("");
            setCategory("");
            setDescription("");
            setQuantity("");
            setPrice("");
            setBarcode("");
            setShowPopup(false);
          }
        } catch (error) {
          console.error("Error updating Product:", error);
        }
      }
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/getCategory");
          setCategories(response.data);
        } catch (error) {
          console.error("Error:", error);
          alert(
            "An error occurred while fetching categories. Please try again later."
          );
        }
      };
      fetchData();
    }, []);
  
  
    const handleSearch = (e) => {
      e.preventDefault();
      const searchTerm = searchQuery.toLowerCase();
      const filteredProducts = inventory.filter(product => {
        const productName = product.itemName ? product.itemName.toLowerCase() : "";
        const productCategory = product.itemCategory ? product.itemCategory.toLowerCase() : "";
        return productName.includes(searchTerm) || productCategory.includes(searchTerm);
      });
      setFilteredProducts(filteredProducts);
    };
    
    return (
      <div>
        <div className="container">
          <h3 className="text-center text-white  p-2 mt-5 rounded-5"style={{backgroundColor: "#A0153E"}}>Add Inventory</h3>
          <div className="card w-100 mt-5 p-2 bg-light ">
          
            <div>
              <form onSubmit={(e) => handleSearch(e)}>
                <div className="input-group w-50 mx-auto">
                  <input type="search"
                    className="form-control rounded "
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                  <button type="button" className="btn btn-outline-primary"
                    onClick={handleSearch} data-mdb-ripple-init>search</button>
                </div>
              </form>
            </div>
            <span className="addbutton">
              <button
                className="btn btn-success"
                onClick={() => setShowPopup(true)}
              >
                + Add
              </button>
            </span>
            <table className="table table-bordered mt-5 text-center">
              <thead className="table-primary">
                <tr>
                  <th>Id ↑↓</th>
                  <th>Image ↑↓</th>
                  <th>Name ↑↓</th>
                  <th>Category ↑↓</th>
                  <th>Description↑↓</th>
                  <th>Quantity ↑↓</th>
                  <th>Price ₹</th>
                  <th>Action ↑↓</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrcoducts
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        <img
                          src={item.itemImage}
                          alt="itemimage"
                          className="itemimage"
                        ></img>
                      </td>
                      <td>{item.itemName}</td>
                      <td>{item.itemcategory}</td>
                      <td>{item.itemDescription}</td>
                      <td>{item.itemQuantity}</td>
                      <td>{item.itemPrice}</td>
                      <td>
                        <button
                          className="btn btn-primary text-center mx-2"
                          onClick={() => handleEdit(index)}
                        >
                          <FaEdit className="fs-4" />
                        </button>
                        {/* <button
                          className="btn btn-danger"
                          onClick={() => handleReject(item.id)}
                        >
                          <MdDelete className="fs-4" />
                        </button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {inventory.length > itemsPerPage && (
              <div className="pagination">
                <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                  <div className="container-fluid">
                    <ul className="navbar-nav mx-auto">
                      <li className="nav-item">
                        <button
                          className="btn btn-primary mx-2 text-center"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from(
                        { length: Math.ceil(inventory.length / itemsPerPage) },
                        (_, i) => (
                          <li className="nav-item" key={i}>
                            <button
                              className="btn btn-primary mx-2 text-center"
                              onClick={() => paginate(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        )
                      )}
                      <li className="nav-item">
                        <button
                          className="btn btn-primary mx-2 text-center"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={
                            currentPage ===
                            Math.ceil(inventory.length / itemsPerPage)
                          }
                        >
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
  
        {showPopup && (
          <div className="popup">
            <div className="popup_inner w-50  text-center">
              <h2>Add Inventory</h2>
              <form>
                <input
                  type="file"
                  placeholder="Image"
                  className="form-control m-2"
                  onChange={handleMedia}
                />
  
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control m-2"
                />
                <select
                  className="form-select m-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={""}>Select Category</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.categorys}>
                      {item.categorys}
                    </option>
                  ))}
                </select>
  
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control m-2"
                />
  
                <input
                  type="text"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control m-2"
                />
  
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control m-2"
                />
  
                {/* <input
                  type="text"
                  placeholder="Bar Code"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="form-control w-100 m-2 "
                /> */}
                {editIndex !== null ? (
                  <button
                    type="submit"
                    className="btn btn-primary mx-4 w-25"
                    onClick={handleput}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-success w-25 mx-4"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                )}
                <button className="btn btn-danger w-25 mx-4" onClick={handcancel}>
                  Cancel
                </button>
                <p className="text-danger text-center">{errormsg}</p>
              </form>
            </div>
          </div>
        )}
        <ToastContainer/>   
      </div>
    );
  }
  