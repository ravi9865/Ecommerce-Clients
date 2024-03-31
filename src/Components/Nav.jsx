import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    setToggle(!toggle);
    localStorage.clear();
    navigate("/signup");
  };
  const [toggle, setToggle] = useState(false)
  const dropDownProfile = () =>{
    setToggle(!toggle);
  }
  return (
    <div className="navbar">
      <ul>
        <img
          className="brand-logo"
          src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png"
          alt="logo"
        />
      </ul>
      {auth ? (
        <ul className="navbar-ul">
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Product</Link>
          </li>
          <li>
            <Link to={"/update"}>Update Product</Link>
          </li>

          <li>
            <div className="dropdownProfile" onClick={(e)=>dropDownProfile(e)}>
                <AccountCircleIcon fontSize="large" />
            </div>
            <div className="navigationProfile positionNavigation" style={{display:toggle?"flex":""}}>
              <h3 onClick={()=>setToggle(!toggle)}>{JSON.parse(auth).name}</h3>
              <Link to={"/profile"} onClick={()=>setToggle(!toggle)}>
                Products
              </Link>
              <Link onClick={logout} to={"/signup"}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      ) : (
        <ul className="navbar-ul">
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
          <li>
            <Link to={"/login"}>Login </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
