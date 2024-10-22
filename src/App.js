import React, { useState } from "react";
import { Product } from "./model/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Cloudinary } from "cloudinary-core";
const App = () => {
    const [formData, setFormData] = useState(Product);
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleImageChange = (e) => {
        setImages(e.target.files); // Lấy tất cả file ảnh từ input
    };
    console.log("images", images);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploaders = Array.from(images).map((image) => {
            return image.File;
        });

        setImageURLs(uploaders);

        // Cập nhật thời gian và POST sau khi formData đã được cập nhật
        const updatedFormData = {
            ...formData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            image: imageURLs,
        };
        const urls = await Promise.all(uploaders);
        setFormData(urls);

        axios
            .post("http://localhost:3001/products", updatedFormData)

            .then((res) => {
                console.log(res.data); // id sẽ được trả về từ server nếu json-server tự động tạo id
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-control">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                ></textarea>
                <input
                    type="text"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    placeholder="Category ID"
                />
                <input
                    type="file"
                    name="image"
                    multiple
                    onChange={handleImageChange}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default App;
