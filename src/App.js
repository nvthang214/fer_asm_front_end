import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios, { Axios } from "axios";
import { Upload } from "./util/Upload";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/detail/ProductDetail";
import Landing from "./landing/Landing";
import "./index.css";
import Template from "./template/Template";
import Cart from "./Cart/Cart";
import DashBoard from "./dashboash/DashBoard";
import AddProduct from "./dashboash/AddProduct";
import Update from "./dashboash/Update";

const App = () => {
    return (
        <BrowserRouter>
            <Template>
                <Routes>
                    <Route path="/products" element={<ProductList />}></Route>
                    <Route
                        path="/products/:slug"
                        element={<ProductDetail />}
                    ></Route>
                    <Route
                        path="/admin/dashboard"
                        element={<DashBoard />}
                    ></Route>
                    <Route path="/admin/add" element={<AddProduct />}></Route>
                    <Route
                        path="/admin/update/:slug"
                        element={<Update />}
                    ></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/" element={<Landing />}></Route>
                </Routes>
            </Template>
        </BrowserRouter>
    );
};

export default App;
