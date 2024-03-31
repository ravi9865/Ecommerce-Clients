import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ProductList({baseUrl}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await getProduct();
    };
    fetchData();
  }, []);

  let getProduct = async () => {
    try {
      let result = await fetch(`${baseUrl}/products`, {
        headers: {
          authorization: `barers ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result.length > 0) {
        setProducts(result);
      } else {
        console.log("No Products Found in Database!");
      }
    } catch (error) {
      alert("Internal server Error!");
      console.log(error);
    }
  };
  let deleteProducts = async (id) => {
    // console.log(id);
    try {
      let result = await fetch(`${baseUrl}/productDelete/:${id}`, {
        method: "Delete",
        headers: {
          authorization: `barers ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        alert("Products Deleted Successfully!");
        getProduct();
      } else {
        alert("No Products Deleted!");
      }
    } catch (error) {
      alert("No Products Deleted, Internal Server!");
      console.log("Internal Server", error);
    }
  };
  const handlesearch = async (e) => {
    // console.log(e.target.value);
    let key = e.target.value;
    if (key) {
      let result = await fetch(`${baseUrl}/product/search/${key}`, {
        headers: {
          authorization: `barers ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProduct();
    }
  };
  return (
    <div className="products">
      <h1>Product List</h1>
      <input
        type="search"
        name="search"
        id="search-inp"
        placeholder="Search Products..."
        onChange={(e) => handlesearch(e)}
      />
      <div className="productsTableStyle">
        <table border={"2"} className="productsTable">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Catogery</th>
              <th>Company</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((items, index) => {
                return (
                  <tr key={items._id}>
                    <td>{index + 1}</td>
                    <td>{items.name}</td>
                    <td>{items.price}</td>
                    <td>{items.category}</td>
                    <td>{items.company}</td>
                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => {
                          const decision = window.confirm(
                            "Are you sure you want to delete?"
                          );
                          if (decision) {
                            deleteProducts(items._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        className="deleteUpdate"
                        to={"/update/" + items._id}
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h6 style={{ textAlign: "center", color: "red" }}>
                No more such records
              </h6>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
