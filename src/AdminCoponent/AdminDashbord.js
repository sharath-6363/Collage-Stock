import React from "react";
import "../AllCss/dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoPricetags } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

export default function AdminDashbord() {
  var navigate = useNavigate()
  const [getcust, setgetcust] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState([]);
  const [respon, setrespon] = useState([])
  const [orders, setorders] = useState([])

  const handeleorder = () => {
    navigate('/adminmain/approveforall')
  }
  const handeleproduct = () => {
    navigate('/adminmain/addinventory')
  }
  const handelecategory = () => {
    navigate('/adminmain/category')
  }
  const handelecustomer = () => {
    navigate('/adminmain/addstaff')
  }
  const handlesupplier = () => {
    navigate("/adminmain/addsupplier")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAddSupplier");
        setgetcust(response.data);
        const respons = await axios.get("http://localhost:8080/getInventory");
        setProductData(respons.data);
        const responsee = await axios.get("http://localhost:8080/getOrders");
        setOrder(responsee.data);
        const responee = await axios.get("http://localhost:8080/getOrders");
        const rss = responee.data.filter((item) => (item.status === "Delivered"))
        setorders(rss);
        const responss = await axios.get("http://localhost:8080/getCategory");
        setCategories(responss.data);
        const respon = await axios.get("http://localhost:8080/getStaff");
        setrespon(respon.data);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching Category. Please try again later.");
      }
    }
    fetchData()
  }, [])
  return (
    <div className="container">
      <div className=" dashboard">
        <div className="card  text-center p-3 m-3  box" onClick={handeleproduct}>
          <MdOutlineInventory className="fs-1 mx-auto  textbg" />
          <h2>Items</h2>
          <h3>{productData.length}</h3>
        </div>
        <div className="card  text-center p-4 m-3 box" onClick={handeleorder}>
          <LuPackageCheck className="fs-1 mx-auto  textbg" />

          <h2>Orders</h2>
          <h3>{order.length}</h3>
        </div>
        <div className="card  text-center p-4 m-3 box" onClick={handelecategory}>
          <IoPricetags className="fs-1 mx-auto  textbg" />
          <h2>Categorys</h2>
          <h3>{categories.length}</h3>
        </div>
        <div className="card  text-center p-4 m-3  box" onClick={handlesupplier}>
          <BsFillPeopleFill className="fs-1 mx-auto  textbg" />
          <h2>Suppliers</h2>
          <h3>{getcust.length}</h3>
        </div>
        <div className="card  text-center p-4 m-3  box" onClick={handelecustomer}>
          <BsFillPersonPlusFill className="fs-1 mx-auto  textbg" />

          <h2>Staff</h2>
          <h3>{respon.length}</h3>
        </div>
        <div className="card  text-center p-4 m-3  box">
          <TbTruckDelivery className="fs-1 mx-auto  textbg" />
          <h2>Delivered Orders</h2>
          <h3>
            {orders.length}
          </h3>
        </div>
      </div>
    </div>
  );
}
