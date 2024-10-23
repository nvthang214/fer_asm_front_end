import React, { useState } from "react";
import { Product } from "./model/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Upload } from "./util/Upload";
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
        setImages(e.target.files);
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

        axios
            .post("http://localhost:3001/products", updatedFormData)
            .then((res) => {
                console.log(res.data);
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
            <div>
                {imageURLs.map((url) => (
                    <img src={url} alt="product" key={url} />
                ))}
            </div>
        </div>
    );
};

export default App;
