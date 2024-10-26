import { useContext } from "react";
import { Link } from "react-router-dom";

function RelatedProduct(props) {
    const { setSlug } = useContext(props.context);
    function formatPrice(price) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    }

    return (
        <Link
            to={`/products/${props.product.id}`}
            className="col text-decoration-none"
            onClick={() => setSlug(props.product.id)}
            href="!#"
            replace
        >
            <div className="card shadow-sm">
                <img
                    className="card-img-top bg-dark cover"
                    height="200"
                    alt=""
                    src={props.product.image?.[0]}
                />
                <div className="card-body">
                    <h5 className="card-title text-center text-dark text-truncate">
                        {props.product.name}
                    </h5>
                    <p className="card-text text-center text-muted">
                        {formatPrice(props.product.price)}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default RelatedProduct;