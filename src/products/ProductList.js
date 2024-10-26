import Product from "./Product";
import ProductH from "./ProductH";
import { createContext, useContext, useState } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import axios from "axios";

const ProductContext = createContext();
const FilterContext = createContext();
function FilterMenuLeft() {
    const { products, categories, setCategories, setProducts } =
        useContext(ProductContext);

    function getStorage() {
        const storage = products.map((v) => v.storage);
        const uniqueStorage = [...new Set(storage)];
        return uniqueStorage;
    }

    return (
        <ul className="list-group list-group-flush rounded">
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Danh mục</h5>
                <div className="d-flex flex-column">
                    {categories.map((v, i) => {
                        if (v.parent_id === "") {
                            return (
                                <div
                                    key={v.id}
                                    className="form-check border border-1 rounded py-1"
                                >
                                    <span>{v.name}</span>
                                    {
                                        <div className="d-flex flex-column ms-4 ">
                                            {categories.map((v2, i2) => {
                                                if (v2.parent_id === v.id) {
                                                    return (
                                                        <div
                                                            key={i2.id}
                                                            className="form-check"
                                                        >
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor={`categoryCheck${i2}`}
                                                            >
                                                                {v2.name}
                                                            </label>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    }
                                </div>
                            );
                        }
                    })}
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Dung Lượng</h5>
                <div className="d-flex flex-column">
                    {getStorage().map((v, i) => {
                        if (v === "0") return;
                        return (
                            <div key={i} className="form-check">
                                <input
                                    className="form-check-input ms-3"
                                    type="checkbox"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`storageCheck${i}`}
                                >
                                    {v}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-2">Khoảng giá</h5>
                <div className="d-grid d-block mb-3">
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Min"
                            defaultValue=""
                        />
                        <label htmlFor="floatingInput">Từ</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Max"
                            defaultValue=""
                        />
                        <label htmlFor="floatingInput">Đến</label>
                    </div>
                    <button className="btn btn-dark">Xóa lựa chọn</button>
                </div>
            </li>
        </ul>
    );
}

function ProductList() {
    const [viewType, setViewType] = useState({ grid: false });
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useState(() => {
        axios.get("http://localhost:3001/products").then((res) => {
            setProducts(res.data);
        });

        axios.get("http://localhost:3001/categories").then((res) => {
            setCategories(res.data);
        });
    }, []);

    function changeViewType() {
        setViewType({
            grid: !viewType.grid,
        });
    }

    return (
        <FilterContext.Provider value={products}>
            <ProductContext.Provider
                value={{ products, categories, setCategories, setProducts }}
            >
                <div className="container mt-5 py-4 px-xl-5">
                    <ScrollToTopOnMount />

                    <div className="row mb-3 d-block d-lg-none">
                        <div className="col-12">
                            <div
                                id="accordionFilter"
                                className="accordion shadow-sm"
                            >
                                <div className="accordion-item">
                                    <h2
                                        className="accordion-header"
                                        id="headingOne"
                                    >
                                        <button
                                            className="accordion-button fw-bold collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFilter"
                                            aria-expanded="false"
                                            aria-controls="collapseFilter"
                                        >
                                            Bộ lọc sản phẩm
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseFilter"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFilter"
                                >
                                    <div className="accordion-body p-0">
                                        <FilterMenuLeft />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4 mt-lg-3">
                        <div className="d-none d-lg-block col-lg-3">
                            <div className="border rounded shadow-sm">
                                <FilterMenuLeft />
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="d-flex flex-column h-100">
                                <div className="row mb-3">
                                    <div className="col-lg-3 d-none d-lg-block"></div>
                                    <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Tìm kiếm ..."
                                                aria-label="search input"
                                            />
                                            <button className="btn btn-outline-dark">
                                                <span>
                                                    <i className="fas fa-search"></i>
                                                </span>
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                            onClick={changeViewType}
                                        >
                                            <span>
                                                {viewType.grid ? (
                                                    <i className="fas fa-th-large"></i>
                                                ) : (
                                                    <i class="fas fa-th-list"></i>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={
                                        "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                                        (viewType.grid
                                            ? "row-cols-xl-2"
                                            : "row-cols-xl-3")
                                    }
                                >
                                    {products.map((product, i) => {
                                        if (product.deleted_at) return;
                                        return viewType.grid ? (
                                            <ProductH
                                                key={i}
                                                product={product}
                                            />
                                        ) : (
                                            <Product
                                                key={i}
                                                product={product}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="d-flex align-items-center mt-auto">
                                    <nav
                                        aria-label="Page navigation example"
                                        className="ms-auto"
                                    >
                                        <ul className="pagination my-0">
                                            <li className="page-item">
                                                <a
                                                    className="page-link"
                                                    href="!#"
                                                >
                                                    &laquo;
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link"
                                                    href="!#"
                                                >
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a
                                                    className="page-link"
                                                    href="!#"
                                                >
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link"
                                                    href="!#"
                                                >
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link"
                                                    href="!#"
                                                >
                                                    &raquo;
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ProductContext.Provider>
        </FilterContext.Provider>
    );
}

export default ProductList;
