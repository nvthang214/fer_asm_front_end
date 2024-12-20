import { Link } from "react-router-dom";
import { useState } from "react";

function Header(props) {
    const [openedDrawer, setOpenedDrawer] = useState(false);
    function toggleDrawer() {
        setOpenedDrawer(!openedDrawer);
    }

    function changeNav(event) {
        if (openedDrawer) {
            setOpenedDrawer(false);
        }
    }

    return (
        <header>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container">
                    <Link className="navbar-brand" to="/" onClick={changeNav}>
                        <span className="ms-2 h2">
                            <i className="fa-brands fa-apple"></i>
                            &nbsp;Store
                        </span>
                    </Link>

                    <div
                        className={
                            "navbar-collapse offcanvas-collapse " +
                            (openedDrawer ? "open" : "")
                        }
                    >
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    to="/products"
                                    className="nav-link"
                                    replace
                                    onClick={changeNav}
                                >
                                    Khám Phá
                                </Link>
                            </li>
                        </ul>
                        <Link
                            to="/cart"
                            className="btn me-3 d-none d-lg-inline"
                            onClick={changeNav}
                        >
                            <i className="fa fa-shopping-cart"></i>
                        </Link>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a
                                    href="!#"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-user"></i>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="userDropdown"
                                >
                                    <li>
                                        <Link
                                            to="/admin/dashboard"
                                            className="dropdown-item"
                                            onClick={changeNav}
                                        >
                                            Trang Quản Lý
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="d-inline-block d-lg-none">
                        <button type="button" className="btn ">
                            <i className="fa fa-shopping-cart"></i>
                            <span className="ms-1 badge rounded-pill bg-dark">
                                0
                            </span>
                        </button>
                        <button
                            className="navbar-toggler p-0 border-0 ms-3"
                            type="button"
                            onClick={toggleDrawer}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
