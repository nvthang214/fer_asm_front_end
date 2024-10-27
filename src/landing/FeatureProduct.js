import { Link } from "react-router-dom";
import formatPrice from "../util/FormatPrice";

function FeatureProduct({ products }) {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <img
                    className="card-img-top bg-dark cover w-100"
                    alt=""
                    src={products.image?.[0]}
                />
                <div className="card-body">
                    <h5 className="card-title text-center text-truncate">
                        {products.name}
                    </h5>
                    <p className="card-text text-center text-muted">
                        {formatPrice(products.price)}
                    </p>
                    <div className="d-grid gap-2">
                        <Link
                            to={`/products/${products.id}`}
                            className="btn btn-primary"
                        >
                            Xem chi tiết
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureProduct;
