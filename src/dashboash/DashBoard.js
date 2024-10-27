import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function DashBoard() {
    const [products, setProducts] = useState([]);
    const [final, setFinal] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState(false);
    const [by, setBy] = useState("updated_at");

    useEffect(() => {
        axios.get("http://localhost:3001/products").then((res) => {
            setProducts(res.data);
            setFinal(res.data);
        });
        axios.get("http://localhost:3001/categories").then((res) => {
            setCategories(res.data);
        });
    }, []);

    useEffect(() => {
        setFinal(
            products.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, products]);

    useEffect(() => {
        if (sort) {
            if (by === "updated_at") {
                setFinal(
                    final.sort((a, b) => {
                        return new Date(b.updated_at) - new Date(a.updated_at);
                    })
                );
            } else {
                // by price
                setFinal(
                    final.sort((a, b) => {
                        return a.price - b.price;
                    })
                );
            }
        } else {
            if (by === "updated_at") {
                setFinal(
                    final.sort((a, b) => {
                        return new Date(a.updated_at) - new Date(b.updated_at);
                    })
                );
            } else {
                // by price
                setFinal(
                    final.sort((a, b) => {
                        return b.price - a.price;
                    })
                );
            }
        }
    }, [by, final, sort]);
    console.log("askjhdfb");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = final.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(final.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const notify = (message) => {
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
    const notifyErr = (message) => {
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

    function getCategoryName(id) {
        return categories.find((category) => category.id === id)?.name;
    }

    function handleDelete(id) {
        return function () {
            if (
                window.confirm("Are you sure you want to delete this product?")
            ) {
                axios
                    .delete(`http://localhost:3001/products/${id}`)
                    .then((res) => {
                        notify("Product deleted successfully");
                        setProducts(
                            products.filter((product) => product.id !== id)
                        );
                    })
                    .catch((err) => {
                        notifyErr("Failed to delete product");
                    });
            }
        };
    }

    return (
        <div className="container pb-5 pt-4">
            <div className="d-flex">
                <input
                    type="text"
                    className="form-control mt-5 mb-1"
                    onChange={(e) => setSearch(e.target.value.trim())}
                    placeholder="Search"
                />
                <Link
                    to="/admin/add"
                    className="btn btn-primary btn-sm mt-5 mb-1 ms-5"
                >
                    <i className="fas fa-plus"></i> Add
                </Link>
            </div>
            <table className="table table-hover table-striped w-100">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th className="d-none d-lg-table-cell" scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">
                            Price &nbsp;
                            <i
                                className="fas fa-sort"
                                onClick={() => {
                                    setSort(!sort);
                                    setBy("price");
                                }}
                            ></i>
                        </th>
                        <th className="d-none d-lg-table-cell" scope="col">
                            Stock
                        </th>
                        <th className="d-none d-lg-table-cell" scope="col">
                            Storage
                        </th>
                        <th className="d-none d-lg-table-cell" scope="col">
                            Category
                        </th>
                        <th className="d-none d-lg-table-cell" scope="col">
                            Last update &nbsp;
                            <i
                                className="fas fa-sort"
                                onClick={() => {
                                    setSort(!sort);
                                    setBy("updated_at");
                                }}
                            ></i>
                        </th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product, index) => (
                        <tr key={product.id}>
                            <th scope="row">
                                {(currentPage - 1) * productsPerPage +
                                    index +
                                    1}
                            </th>
                            <td className="d-none d-lg-table-cell">
                                <img
                                    src={product.image?.[0]}
                                    alt={product.name}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                    }}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td className="d-none d-lg-table-cell">
                                {product.stock}
                            </td>
                            <td className="d-none d-lg-table-cell">
                                {product.storage}
                            </td>
                            <td className="d-none d-lg-table-cell">
                                {getCategoryName(product.category_id)}
                            </td>
                            <td className="d-none d-lg-table-cell">
                                {new Date(product.updated_at).toLocaleString()}
                            </td>
                            <td
                                className={
                                    product.status
                                        ? "text-success"
                                        : "text-danger"
                                }
                            >
                                {product.status === 1 ? "Active" : "Inactive"}
                            </td>
                            <td>
                                <a
                                    href={`/admin/update/${product.id}`}
                                    className="btn"
                                >
                                    <i className="fas fa-edit"></i>
                                </a>
                                <button
                                    className="btn"
                                    onClick={handleDelete(product.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="">
                <nav aria-label="Page navigation example" className="ms-auto">
                    <ul className="pagination my-0 d-flex align-items-center justify-content-center w-100">
                        {pageNumbers.map((number) => (
                            <li
                                key={number}
                                className={`page-item ${
                                    number === currentPage ? "active" : ""
                                }`}
                            >
                                <button
                                    onClick={() => paginate(number)}
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
    );
}

export default DashBoard;
