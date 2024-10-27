import React, { createContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const CardContext = createContext();

    useEffect(() => {
        axios.get("http://localhost:3001/cart").then((res) => {
            setCartItems(res.data);
        });
    }, []);

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <h5 className="mb-3">
                                            <Link
                                                to="/products"
                                                className="text-body"
                                            >
                                                <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                Tiếp tục mua hàng
                                            </Link>
                                        </h5>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Sản phẩm</p>
                                            </div>
                                        </div>
                                        <CardContext.Provider
                                            value={{ cartItems, setCartItems }}
                                        >
                                            {cartItems.map((item) => (
                                                <CartItem
                                                    key={item.id}
                                                    cart={item}
                                                    context={CardContext}
                                                />
                                            ))}
                                        </CardContext.Provider>

                                        {cartItems.length === 0 && (
                                            <div className="text-center">
                                                <h5>Giỏ hàng trống</h5>
                                            </div>
                                        )}
                                    </div>
                                    <CartSummary cart={cartItems} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
