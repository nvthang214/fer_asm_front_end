import React, { useContext, useState } from "react";
import formatPrice from "../util/FormatPrice";
import Popup from "reactjs-popup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartSummary = ({ cart }) => {
    const [shipping, setShipping] = useState({
        address: "",
        city: "",
        district: "",
        ward: "",
    });
    const navigate = useNavigate();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const notify = () => {
        toast.success("Thanh toán thành công", {
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
    };

    const handlePayment = () => {
        if (
            shipping.address === "" ||
            shipping.city === "" ||
            shipping.district === "" ||
            shipping.ward === ""
        ) {
            toast.error("Vui lòng điền đầy đủ thông tin giao hàng", {
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
        } else {
            if (cart.length === 0) {
                toast.error("Giỏ hàng trống", {
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
            } else if (window.confirm("Xác nhận thanh toán")) {
                cart.forEach((element) => {
                    axios.delete(`http://localhost:3001/cart/${element.id}`);
                });
                notify();
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        }
    };

    return (
        <div className="col-lg-4 mt-5">
            <div className="card rounded-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Thông tin giao hàng</h5>
                    </div>

                    {/* ship address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Địa chỉ giao hàng
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                setShipping({
                                    ...shipping,
                                    address: e.target.value,
                                })
                            }
                            id="address"
                            placeholder="1234 Main St"
                        />
                    </div>

                    {/* city */}
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                            Tỉnh/Thành phố
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                setShipping({
                                    ...shipping,
                                    city: e.target.value,
                                })
                            }
                            id="city"
                            placeholder="Tỉnh/Thành phố"
                        />
                    </div>

                    {/* state */}
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">
                            Quận/Huyện
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                setShipping({
                                    ...shipping,
                                    district: e.target.value,
                                })
                            }
                            id="state"
                            placeholder="Quận/Huyện"
                        />
                    </div>

                    {/* zip */}
                    <div className="mb-3">
                        <label htmlFor="zip" className="form-label">
                            Xã/Phường
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                setShipping({
                                    ...shipping,
                                    ward: e.target.value,
                                })
                            }
                            id="zip"
                            placeholder="Xã/Phường"
                        />
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between mb-4">
                        <p className="mb-2">Tổng cộng</p>
                        <p className="mb-2">{formatPrice(total)}</p>
                    </div>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <button
                        type="button"
                        className="btn btn-light btn-block"
                        onClick={() => {
                            handlePayment();
                        }}
                    >
                        <div className="d-flex justify-content-between">
                            <span>
                                Thanh toán{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
