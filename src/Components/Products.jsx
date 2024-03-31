import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
export default function Products({baseUrl}) {
  useEffect(() => {
    const fetchData = async () => {
      await handlesearch();
    };
    fetchData();
  }, []);
  const [products, setProduct] = useState([]);
  const handlesearch = async () => {
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    try {
      let result = await fetch(`${baseUrl}/searchProfileProduct`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `barers ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ userId }),
      });
      result = await result.json();
      console.log(result);
      if (result) {
        setProduct(result);
      } else {
        alert("No Products Found!");
      }
    } catch (error) {
      alert("Internal Server Error");
      console.log("Internal Server Error", error);
    }
  };
  return (
    <div>
      <h1>Products</h1>
      <Grid container spacing={10}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
