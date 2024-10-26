import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import "bootstrap/dist/js/bootstrap.bundle";

function Landing() {
    const [newArrival, setNewArrival] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/products").then((res) => {
            setNewArrival(res.data);
        });
    }, []);

    function getNewArrival() {
        let count = 0;
        const data = newArrival
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .filter((product) => {
                if (count < 8) {
                    count++;
                    return product;
                }
            });
        return data;
    }

    return (
        <>
            <ScrollToTopOnMount />
            <Banner />
            <div className="d-flex flex-column bg-white py-4">
                <p className="text-center px-5">
                    Chào mừng bạn đến với cửa hàng của chúng tôi. Chúng tôi cam
                    kết cung cấp các sản phẩm chất lượng với giá cả hợp lý.
                    <br /> Hãy mua sắm ngay hôm nay để nhận ưu đãi hấp dẫn.
                </p>
                <div className="d-flex justify-content-center">
                    <Link to="/products" className="btn btn-primary" replace>
                        Xem tất cả sản phẩm
                    </Link>
                </div>
            </div>
            <h2 className="text-muted text-center mt-4 mb-3">
                Sản phẩm mới nhất
            </h2>
            <div className="container pb-5 px-lg-5">
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 px-md-5">
                    {getNewArrival().map((product) => {
                        if (product.deleted_at) return null;
                        return (
                            <FeatureProduct
                                key={product.id}
                                products={product}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Landing;
