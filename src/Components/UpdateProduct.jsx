import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProducts({baseUrl}) {
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await getProductsDetails();
    };
    fetchData();
  }, []);
  const getProductsDetails = async () => {
    // console.log(param);
    try {
      let result = await fetch(`${baseUrl}/product/${param.id}`, {
        headers: {
          authorization: `barers ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      // console.log(result);
      if (result) {
        setName(result.name);
        setprice(result.price);
        setCategory(result.category);
        setCompany(result.company);
      } else {
        alert("No Update Avilable");
      }
    } catch (error) {
      alert("Internal server Error!");
      console.log(error);
    }
  };
  const handleUpdateProducts = async () => {
    // console.log("Update Product", name, price, category, company);
    try {
      let result = await fetch(`${baseUrl}/product/${param.id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          authorization: `barers ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ name, price, category, company }),
      });
      result = await result.json();
      // console.log(result);
      if (result.modifiedCount > 0) {
        alert("Products Updated Successfully...");
        navigate("/");
      } else {
        alert("Products Not Updated!");
      }
    } catch (error) {
      alert("Internal server Error!");
      console.log(error);
    }
  };
  return (
    <div className="add_products">
      <h1>Update Products</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter the Prodct Name"
      />
      {error && !name && <span>Please enter Name</span>}
      <input
        value={price}
        onChange={(e) => setprice(e.target.value)}
        type="text"
        placeholder="Enter the Price"
      />
      {error && !price && <span>Please enter price</span>}
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        placeholder="Enter the Catogery"
      />
      {error && !category && <span>Please enter catogery</span>}
      <input
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        type="text"
        placeholder="Enter the Company"
      />
      {error && !company && <span>Please enter company</span>}
      <button onClick={() => handleUpdateProducts()} type="button">
        Update Products
      </button>
    </div>
  );
}
