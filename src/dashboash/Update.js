import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Product } from "../model/Product";
import axios from "axios";
import { Upload } from "../util/Upload";

function Update() {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState(Product);
    const [imageURLs, setImageURLs] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/categories").then((res) => {
            setCategories(
                res.data.filter((category) => category.parent_id !== "")
            );
        });
    }, []);

    useEffect(() => {
        const slug = window.location.pathname.split("/").pop();
        axios.get(`http://localhost:3001/products/${slug}`).then((res) => {
            setFormData(res.data);
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

        const product = {
            ...formData,
            updated_at: new Date().toISOString(),
            image: [...formData.image, ...urls],
        };

        axios
            .put(`http://localhost:3001/products/${formData.id}`, product)
            .then((res) => {
                successToast("Cập nhật sản phẩm thành công!");
                setImages([]);
                setImageURLs([]);
                setFormData(res.data);
            });
    };

    const handleDeleteImage = (index) => {
        const newImages = formData.image.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            image: newImages,
        });

        axios
            .put(`http://localhost:3001/products/${formData.id}`, {
                ...formData,
                image: newImages,
            })
            .then((res) => {
                successToast("Xóa ảnh thành công!");
                setFormData(res.data);
            });
    };

    return (
        <div className="container my-5 py-5">
            <ToastContainer />
            <form className="d-flex">
                <div className="row g-2 col-12 col-lg-6">
                    <p className="alert alert-sm alert-secondary">
                        {" "}
                        Sửa thông tin
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
                            value={formData.description}
                            rows={7}
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
                            value={formData.price}
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
                            name="category_id"
                        >
                            <option value={formData.category_id}>
                                {
                                    categories.find(
                                        (category) =>
                                            category.id === formData.category_id
                                    )?.name
                                }
                            </option>
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
                            value={formData.stock}
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
                            value={formData.storage}
                            className="form-control"
                            id="inputZip"
                            name="storage"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row col-12 col-lg-6 px-5">
                    <div className="d-block border row rounded">
                        <p className="text-center">Ảnh sản phẩm</p>
                        {formData.image?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Ảnh ${index + 1}`}
                                className="img-thumbnail m-1"
                                onClick={(e) => {
                                    if (
                                        window.confirm(
                                            "Bạn có chắc chắn muốn xóa ảnh này không?"
                                        )
                                    ) {
                                        handleDeleteImage(index);
                                    }
                                }}
                                style={{ width: "100px", height: "100px" }}
                            />
                        ))}
                    </div>

                    <div className="d-block border row rounded mt-1">
                        <p className="text-center">Thêm</p>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Ảnh ${index + 1}`}
                                className="img-thumbnail m-1"
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
                    </div>

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

export default Update;
