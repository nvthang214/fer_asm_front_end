import RelatedProduct from "./RelatedProduct";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [slug, setSlug] = useState("");
    const RelatedContext = createContext();
    const [imageURLs, setImageURLs] = useState("");
    const [exception, setException] = useState(true);
    useEffect(() => {
        setSlug(window.location.pathname.split("/")[2]);
    });

    useEffect(() => {
        if (slug) {
            axios
                .get(`http://localhost:3001/products/${slug}`)
                .then((res) => {
                    setProduct(res.data);
                    setImageURLs(res.data.image?.[0]);
                })
                .catch((err) => {
                    console.error(err);
                    setException(false);
                });
            axios.get(`http://localhost:3001/categories`).then((res) => {
                setCategory(res.data);
            });

            axios.get("http://localhost:3001/products").then((res) => {
                setRelatedProducts(res.data);
            });
        }
    }, [slug]);

    const getCategoryName = (id) => {
        return category.find((c) => c.id === id)?.name;
    };

    function getRelatedProducts() {
        let count = 0;
        return relatedProducts.filter(
            (p) =>
                p.category_id === product.category_id &&
                p.id !== product.id &&
                count++ < 4
        );
    }
    function formatPrice(price) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    }

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />

            <div className="row mb-4">
                <div className="d-none d-lg-block col-lg-1">
                    <div className="image-vertical-scroller">
                        <div className="d-flex flex-column">
                            {product.image?.map((image, i) => {
                                return (
                                    <img
                                        key={i}
                                        className="border rounded mb-2"
                                        style={{
                                            boxShadow:
                                                imageURLs === image
                                                    ? "1px 5px 1px #adaaaa"
                                                    : null,

                                            cursor: "pointer",
                                            margin:
                                                imageURLs === image
                                                    ? "5px"
                                                    : null,
                                        }}
                                        alt=""
                                        onClick={() => setImageURLs(image)}
                                        src={image}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <img
                                className="border rounded ratio ratio-1x1"
                                alt=""
                                src={imageURLs || product.image?.[0]}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="d-flex flex-column h-100">
                        <h2 className="mb-1">{product.name}</h2>
                        <h4 className="text-muted mb-4">
                            <small>{formatPrice(product.price)} </small>
                        </h4>

                        <div className="row g-3 mb-4">
                            <div className="col">
                                {product.stock > 0 ? (
                                    <button className="btn btn-outline-dark py-2 w-100">
                                        <i className="fas fa-cart-plus" />
                                        Thêm vào giỏ hàng
                                    </button>
                                ) : (
                                    <button className="btn btn-outline-danger disabled py-2 w-100">
                                        Hết hàng
                                    </button>
                                )}
                            </div>
                        </div>

                        <h5 className="mb-0">
                            <i className="fas fa-info-circle" />
                            &nbsp; Chi tiết sản phẩm
                        </h5>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-4">
                                <i className="fas fa-tags" />
                                &nbsp; Chủng loại
                            </dt>
                            <dd className="col-sm-8 mb-3 ">
                                {getCategoryName(
                                    category.find(
                                        (c) => c.id === product.category_id
                                    )?.parent_id
                                )
                                    ? getCategoryName(
                                          category.find(
                                              (c) =>
                                                  c.id === product.category_id
                                          )?.parent_id
                                      ) + " / "
                                    : ""}
                                {getCategoryName(product.category_id) + " / "}
                                {product.name}
                            </dd>

                            <dt className="col-sm-4">
                                <i className="fas fa-microchip" />
                                &nbsp; Dung Lượng
                            </dt>
                            <dd className="col-sm-8 mb-3">{product.storage}</dd>

                            <dt className="col-sm-4">
                                <i className="fas fa-box" />
                                &nbsp; Kho Hàng
                            </dt>
                            <dd className="col-sm-8 mb-3">
                                {product.stock} sản phẩm
                            </dd>
                        </dl>

                        <h5 className="mb-0">Mô tả sản phẩm</h5>
                        <hr />
                        <p className="lead flex-shrink-0">
                            <small>{product.description}</small>
                        </p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 mb-4">
                    <hr />
                    <h4 className="text-muted my-4">
                        <i className="fas fa-box-open" />
                        &nbsp; Sản phẩm liên quan
                    </h4>
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
                        <RelatedContext.Provider value={{ setSlug }}>
                            {getRelatedProducts().map((p) => (
                                <RelatedProduct
                                    context={RelatedContext}
                                    key={p.id}
                                    product={p}
                                />
                            ))}
                        </RelatedContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
