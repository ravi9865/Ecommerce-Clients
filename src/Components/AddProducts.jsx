import React, { useState } from "react";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const handleAddProducts = async ({baseUrl}) => {
    // console.log("hello", name, price, category, company);
    if (!name.trim() || !price.trim() || !category.trim() || !company.trim()) {
      setError(true);
      return;
    }
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("User data not found in localStorage");
      return;
    }
    const user = JSON.parse(userData);
    const userId = user._id;
    // console.log("User ID:", userId);
    try {
      let result = await fetch(`${baseUrl}/add-product`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `barers ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ name, price, category, company, userId }),
      });
      let response = await result.json();
      if (response) {
        alert("Product Added Sucessfully!");
      } else {
        alert("Product Not Added!");
      }
    } catch (error) {
      console.log("Intenal Server Error!", error);
    }
  };
  return (
    <div className="add_products">
      <h1>Add Products</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter the Prodct Name"
      />
      {error && !name && <span>Please enter Name</span>}
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
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
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        placeholder="Enter the Company"
      />
      {error && !company && <span>Please enter company</span>}
      <button onClick={() => handleAddProducts()} type="button">
        Add Products
      </button>
    </div>
  );
}
