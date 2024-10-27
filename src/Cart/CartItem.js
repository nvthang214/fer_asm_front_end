import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import formatPrice from "../util/FormatPrice";
import { Bounce, toast } from "react-toastify";

const CartItem = ({ cart, context }) => {
    const [product, setProduct] = useState([]);
    const { cartItems, setCartItems } = useContext(context);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/${cart.product_id}`)
            .then((res) => {
                setProduct(res.data);
            });
    }, [cart.product_id]);

    const handleQuantityChange = (id, quantity) => {
        axios
            .patch(`http://localhost:3001/cart/${id}`, {
                quantity: cart.quantity + quantity,
            })
            .then((res) => {
                setCartItems(
                    cartItems.map((item) =>
                        item.id === id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                );
            });
    };
    const handleRemove = (id) => {
        axios.delete(`http://localhost:3001/cart/${id}`).then((res) => {
            setCartItems(cartItems.filter((item) => item.id !== id));
            toast.success("Xóa sản phẩm thành công!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        });
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-lg-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center col-12 col-lg-7">
                        <div>
                            <img
                                src={product.image?.[0]}
                                className="img-fluid rounded-3"
                                alt="Shopping item"
                                style={{
                                    width: "65px",
                                }}
                            />
                        </div>
                        <div className="ms-3">
                            <h6>{product.name}</h6>
                            <small className="small mb-0">
                                {product.storage}
                            </small>
                        </div>
                    </div>
                    <div className="d-flex align-items-center col-12 col-lg-5 justify-content-end">
                        <div className="d-flex me-3 ">
                            <button
                                className="btn btn-sm btn-light"
                                onClick={() =>
                                    handleQuantityChange(cart.id, -1)
                                }
                            >
                                <i className="fas fa-minus"></i>
                            </button>
                            <div>
                                <p className="fw-normal mb-0 mx-1 text-center">
                                    {cart.quantity}
                                </p>
                            </div>
                            <button
                                className="btn btn-sm btn-light"
                                onClick={() => handleQuantityChange(cart.id, 1)}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div>
                            <h6 className="mb-0 mx-2">
                                {formatPrice(product.price * cart.quantity)}
                            </h6>
                        </div>
                        <button
                            className="btn btn-sm btn-light"
                            style={{
                                color: "#cecece",
                            }}
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Bạn có chắc chắn muốn xóa sản phẩm này không?"
                                    )
                                ) {
                                    handleRemove(cart.id);
                                }
                            }}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
