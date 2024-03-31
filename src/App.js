import React from 'react';
import Nav from './Components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './Components/Products';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponents from './Components/PrivateComponents';
import Login from './Components/Login';
import AddProducts from './Components/AddProducts';
import ProductList from './Components/ProductList';
import UpdateProducts from './Components/UpdateProduct';

function App() {
  const BASE_URl = 'https://ecommerce-backend-5ul7.onrender.com'
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        {/* <h1>E-Dashboard</h1> */}
        <Routes>
          <Route element={<PrivateComponents/>}>
            <Route path='/' element={<ProductList baseUrl={BASE_URl}/>}></Route>
            <Route path='/add' element={<AddProducts baseUrl={BASE_URl}/>}></Route>
            <Route path='/update/:id' element={<UpdateProducts baseUrl={BASE_URl}/>}></Route>
            <Route path='/logout' element={<Products baseUrl={BASE_URl}/>}></Route>
            <Route path='/profile' element={<Products baseUrl={BASE_URl}/>}></Route>
          </Route>
          <Route path='/signup' element={<SignUp baseUrl={BASE_URl}/>}></Route>
          <Route path='/login' element={<Login baseUrl={BASE_URl}/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    
  );
}
export default App;