import { Link } from "react-router-dom";

function Product(props) {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <Link to={`/products/${props.product.id}`} href="!#" replace>
                    <img
                        className="card-img-top bg-dark cover"
                        height="200"
                        alt=""
                        src={props.product.image?.[0]}
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title text-center text-dark text-truncate">
                        {props.product.name}
                    </h5>
                    <p className="card-text text-center text-muted mb-0">
                        {props.product.price} VND
                    </p>
                    <div className="d-grid d-block">
                        <button className="btn btn-outline-dark mt-3">
                            <i className="fas fa-cart-plus" />
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
