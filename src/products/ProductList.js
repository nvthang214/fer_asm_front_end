import Product from "./Product";
import ProductH from "./ProductH";
import { createContext, useContext, useEffect, useState } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const ProductContext = createContext();
const FilterContext = createContext();
function FilterMenuLeft() {
    const { conditionFilter, setConditionFilter } = useContext(FilterContext);

    const { products, categories, setCategories, setProducts, backup } =
        useContext(ProductContext);

    function getStorage() {
        const storage = backup.map((v) => v.storage);
        const uniqueStorage = [...new Set(storage)];
        return uniqueStorage;
    }

    function handleCategoryChange(e) {
        const category = e.target.value;
        if (e.target.checked) {
            setConditionFilter({
                ...conditionFilter,
                category: [...conditionFilter.category, category],
            });
        } else {
            setConditionFilter({
                ...conditionFilter,
                category: conditionFilter.category.filter(
                    (v) => v !== category
                ),
            });
        }
    }

    function handleStorageChange(e) {
        const storage = e.target.value;
        if (e.target.checked) {
            setConditionFilter({
                ...conditionFilter,
                storage: [...conditionFilter.storage, storage],
            });
        } else {
            setConditionFilter({
                ...conditionFilter,
                storage: conditionFilter.storage.filter((v) => v !== storage),
            });
        }
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
                                    <span key={v.id}>{v.name}</span>
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
                                                                onChange={(e) =>
                                                                    handleCategoryChange(
                                                                        e
                                                                    )
                                                                }
                                                                value={v2.id}
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
                                    value={v}
                                    onChange={(e) => handleStorageChange(e)}
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
                            type="number"
                            min={0}
                            className="form-control"
                            onChange={(e) => {
                                let err = false;
                                setProducts(backup);
                                if (
                                    isNaN(e.target.value.trim()) ||
                                    parseFloat(e.target.value) < 0 ||
                                    e.target.value.trim() === ""
                                ) {
                                    err = true;
                                }

                                if (!err) {
                                    setConditionFilter({
                                        ...conditionFilter,
                                        price: {
                                            ...conditionFilter.price,
                                            min: parseFloat(
                                                e.target.value.trim()
                                            ),
                                        },
                                    });
                                } else {
                                    setConditionFilter({
                                        ...conditionFilter,
                                        price: {
                                            ...conditionFilter.price,
                                            min: 0,
                                        },
                                    });
                                }
                            }}
                            placeholder="Min"
                            onBlur={(e) => {
                                if (e.target.value.trim() === "") {
                                    setConditionFilter({
                                        ...conditionFilter,
                                        price: {
                                            ...conditionFilter.price,
                                            min: 0,
                                        },
                                    });
                                }
                            }}
                        />
                        <label htmlFor="floatingInput">Từ</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                                let err = false;
                                setProducts(backup);

                                if (
                                    isNaN(e.target.value.trim()) ||
                                    parseFloat(e.target.value) < 0 ||
                                    e.target.value.trim() === ""
                                ) {
                                    err = true;
                                }

                                if (!err) {
                                    setConditionFilter({
                                        ...conditionFilter,
                                        price: {
                                            ...conditionFilter.price,
                                            max: parseFloat(
                                                e.target.value.trim()
                                            ),
                                        },
                                    });
                                } else {
                                    setConditionFilter({
                                        ...conditionFilter,
                                        price: {
                                            ...conditionFilter.price,
                                            max: Infinity,
                                        },
                                    });
                                }
                            }}
                            placeholder="Max"
                            onBlur={(e) => {
                                if (e.target.value.trim() === "") {
                                    setConditionFilter({
                                        ...conditionFilter,
                                        price: {
                                            ...conditionFilter.price,
                                            max: Infinity,
                                        },
                                    });
                                }
                            }}
                            min={0}
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
    const [backup, setBackup] = useState([]);
    const [categories, setCategories] = useState([]);
    const [conditionFilter, setConditionFilter] = useState({
        category: [],
        storage: [],
        price: {
            min: 0,
            max: Infinity,
        },
        sort: null,
        keyword: "",
    });

    // fetch data
    useState(() => {
        axios.get("http://localhost:3001/products").then((res) => {
            setProducts(res.data);
            setBackup(res.data);
        });

        axios.get("http://localhost:3001/categories").then((res) => {
            setCategories(res.data);
        });
    }, []);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    // change view type
    function changeViewType() {
        setViewType({
            grid: !viewType.grid,
        });
    }

    // filter products
    function filterProducts() {
        const filteredProducts = backup.filter((product) => {
            if (conditionFilter.category.length > 0) {
                if (!conditionFilter.category.includes(product.category_id)) {
                    return false;
                }
            }

            if (conditionFilter.storage.length > 0) {
                if (!conditionFilter.storage.includes(product.storage)) {
                    return false;
                }
            }

            if (
                conditionFilter.price.min > product.price ||
                product.price > conditionFilter.price.max
            ) {
                return false;
            }

            if (product.deleted_at) return false;

            if (
                conditionFilter.keyword.trim() !== "" &&
                !product.name
                    .toLowerCase()
                    .includes(conditionFilter.keyword.toLowerCase())
            ) {
                return false;
            }

            return true;
        });
        if (filteredProducts.length < currentPage * productsPerPage) {
            setCurrentPage(1);
        }
        setProducts(filteredProducts);
    }

    // sort products
    function sortProducts() {
        if (conditionFilter.sort) {
            products.sort((a, b) => a.price - b.price);
        } else {
            products.sort((a, b) => b.price - a.price);
        }
    }
    if (conditionFilter.sort !== null) {
        sortProducts();
    }

    // filter products when conditionFilter changes
    useEffect(() => {
        filterProducts();
    }, [conditionFilter]);

    return (
        <FilterContext.Provider value={{ conditionFilter, setConditionFilter }}>
            <ProductContext.Provider
                value={{
                    products,
                    categories,
                    setCategories,
                    setProducts,
                    backup,
                }}
            >
                <div className="container mt-5 py-4 px-xl-5">
                    <ScrollToTopOnMount />
                    <ToastContainer />
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
                                    <div className="col-lg-3 my-2">
                                        <button
                                            className={`btn btn-outline-dark ${
                                                conditionFilter.sort !== null
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                setConditionFilter({
                                                    ...conditionFilter,
                                                    sort: !conditionFilter.sort,
                                                });
                                            }}
                                        >
                                            <span>
                                                <i className="fas fa-sort"></i>
                                            </span>
                                            &nbsp; Price{" "}
                                            {conditionFilter.sort ? "↓" : "↑"}
                                        </button>
                                    </div>
                                    <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                onChange={(e) => {
                                                    setConditionFilter({
                                                        ...conditionFilter,
                                                        keyword: e.target.value,
                                                    });
                                                }}
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
                                    {currentProducts.map((product, i) => {
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
                                            {pageNumbers.map((number) => (
                                                <li
                                                    key={number}
                                                    className={`page-item ${
                                                        number === currentPage
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            paginate(number)
                                                        }
                                                        className="page-link"
                                                    >
                                                        {number}
                                                    </button>
                                                </li>
                                            ))}
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
