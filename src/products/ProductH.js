import { Link } from "react-router-dom";

function ProductH(props) {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <div className="row g-0">
                    <div className="col-4">
                        <Link
                            to={`/products/${props.product.id}`}
                            href="!#"
                            replace
                        >
                            <img
                                className="rounded-start bg-dark cover w-100 h-100"
                                alt=""
                                src={props.product.image?.[0]}
                            />
                        </Link>
                    </div>
                    <div className="col-8">
                        <div className="card-body h-100">
                            <div className="d-flex flex-column h-100">
                                <h5 className="card-title text-dark text-truncate mb-1">
                                    {props.product.name}
                                </h5>
                                <span className="card-text text-muted mb-2 flex-shrink-0">
                                    {props.product.price}
                                </span>
                                <div className="mt-auto d-flex">
                                    <button className="btn btn-outline-dark ms-auto">
                                        <i className="fas fa-cart-plus" />
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductH;
