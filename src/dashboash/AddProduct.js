import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Upload } from "../util/Upload";
import { Product } from "../model/Product";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState(Product);
    const [imageURLs, setImageURLs] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/categories").then((res) => {
            setCategories(
                res.data.filter((category) => category.parent_id !== "")
            );
        });
    }, []);

    const errorToast = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const successToast = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const addImage = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages((prevImages) => [...prevImages, file]);
            e.target.value = null;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "price") {
            setFormData({
                ...formData,
                price: parseFloat(value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploader = Array.from(images).map((image) => {
            return Upload(image);
        });

        const urls = await Promise.all(uploader);
        setImageURLs(urls);

        const updatedFormData = {
            ...formData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            image: urls,
        };

        setFormData(updatedFormData);

        if (updatedFormData.name === "") {
            errorToast("Tên không được để trống!");
        } else if (updatedFormData.price < 0) {
            errorToast("Giá không được nhỏ hơn 0!");
        } else if (updatedFormData.category === "") {
            errorToast("Chọn chủng loại!");
        } else if (updatedFormData.stock === 0) {
            errorToast("Số lượng không được để trống!");
        } else if (updatedFormData.storage === "") {
            errorToast("Dung lượng không được để trống!");
        } else {
            axios
                .post("http://localhost:3001/products", updatedFormData)
                .then((res) => {
                    successToast("Thêm sản phẩm thành công!");
                    setTimeout(() => {
                        navigate("/admin/dashboard");
                    }, 3000);
                })
                .catch((err) => {
                    errorToast("Thêm sản phẩm thất bại!");
                });
        }
    };

    return (
        <div className="container my-5 py-5">
            <ToastContainer />
            <form className="d-flex">
                <div className="row g-2 col-12 col-lg-6">
                    <p className="alert alert-sm alert-secondary">
                        Thêm thông tin
                    </p>
                    <div className="">
                        <label htmlFor="inputEmail4" className="form-label">
                            Tên
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            id="inputEmail4"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="inputPassword4" className="form-label">
                            Mô tả
                        </label>
                        <textarea
                            id="inputPassword4"
                            name="description"
                            onChange={handleChange}
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="col-12 col-lg-3">
                        <label htmlFor="inputAddress" className="form-label">
                            Giá
                        </label>
                        <input
                            type="text"
                            name="price"
                            onChange={handleChange}
                            className="form-control"
                            id="inputAddress"
                            placeholder=""
                        />
                    </div>
                    <div className="col-12 col-lg-3">
                        <label htmlFor="inputState" className="form-label">
                            Chủng loại
                        </label>
                        <select
                            id="inputState"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option>Chọn..</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-lg-3">
                        <label htmlFor="inputCity" className="form-label">
                            Số lượng
                        </label>
                        <input
                            type="text"
                            name="stock"
                            onChange={handleChange}
                            className="form-control"
                            id="inputCity"
                        />
                    </div>
                    <div className="col-12 col-lg-3">
                        <label htmlFor="inputZip" className="form-label">
                            Dung Lượng
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputZip"
                            name="storage"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row col-12 col-lg-6 px-5">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Ảnh ${index + 1}`}
                            className="img-thumbnail mx-1"
                            style={{ width: "100px", height: "100px" }}
                        />
                    ))}
                    <button
                        className="btn btn-outline-secondary mt-2 text-center ms-3"
                        onClick={addImage}
                        type="button"
                        style={{ width: "50px", height: "50px" }}
                    >
                        <i className="fas fa-cloud-upload"></i>
                    </button>
                    {/* Input file ẩn */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>
            </form>

            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    type="submit"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
