import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../AllCss/category.css"
export default function Category() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [acategory, setacategory] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getCategory");
        setCategories(response.data);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching categories. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const HandlePost = async (e) => {
    if (!category) {
      alert("Please enter a category");
      
    }else{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/postCategory", {
        id: id,
        categorys: category.trim()
      });
      if (response.status === 200) {
        alert("Category added successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the category. Please try again later.");
    }
  };
  }
  const handleDelete = async (id) => {
    if (!id) {
      alert ("Enter a unique Id for the category you want to delete")
    }else{
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:8080/deleteCategory/${id}`);
        alert("Category deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the category. Please try again later.");
    }
  }; 
}
  const handleViewProducts = async (itemcategory) => {
    setacategory(itemcategory)
    try {
      const response = await axios.get(`http://localhost:8080/getcat/${itemcategory}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching products. Please try again later.");
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <h3 className='text-center mt-5 text-white rounded-5 p-2'style={{backgroundColor: "#A0153E"}}>CATEGORIES</h3>
      </div>
      <div className='card w-75 mx-auto mt-2 shadow   '>
        <div className='card1 mt-3 mx-5 d-flex  '>
          <input
            type="text"
            className="form-control w-50 "
            placeholder=" Category ID (for delete only)"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            className="form-control mx-4 w-50"
            placeholder=" Category Name "
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className='text-center mb-2'>
          <button className="btn btn-danger w-25 mt-3 mx-2" 
          onClick={() => handleDelete(id)}>Delete</button>
          <button className="btn btn-primary w-25 mt-3 mx-2"
           onClick={HandlePost}>Add</button>
        </div>
      </div>
      <div className='d-flex sh'>
        <div className='card w-50 mt-3 mx-4 p-3 tableview'>
          <table className='table table-bordered text-center'>
            <thead className=' table-primary'>
              <tr>
                <th> ID</th>
                <th> Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.categorys}</td>
                  <td><button className='btn btn-outline-primary' onClick={() => handleViewProducts(item.categorys)}>View Products</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, i) => (
                      <li className="nav-item" key={i}>
                        <button className="btn btn-primary mx-2 text-center" onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="nav-item">
                      <button className="btn btn-primary mx-2 text-center"
                        onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          )}
        </div>
        <div className='card w-50 m-3 mx-4 p-3 catview'>
          <p ><strong>Products in - </strong>{acategory}</p >
          <table className='table table-bordered text-center'>
            <thead className='table-primary'>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.itemName}</td>
                  <td>{product.itemPrice}</td>
                  <td>{product.itemcategory}</td>
                  <td>{product.itemQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
