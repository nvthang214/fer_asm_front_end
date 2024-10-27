import { Link, useNavigate } from "react-router-dom";
import formatPrice from "../util/FormatPrice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ProductH(props) {
    const notify = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get("http://localhost:3001/cart");

            if (response.status === 200) {
                const cart = response.data;
                let i = null;
                cart.forEach((item) => {
                    if (item.product_id === props.product.id) {
                        i = item;
                    }
                });
                if (i !== null) {
                    const response = await axios.patch(
                        `http://localhost:3001/cart/${i.id}`,
                        {
                            quantity: i.quantity + 1,
                        }
                    );

                    if (response.status === 200) {
                        notify("Sản phẩm đã được thêm vào giỏ hàng!");

                        return;
                    } else {
                        notifyError("Thêm giỏ hàng thất bại!");
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const response = await axios.post("http://localhost:3001/cart", {
                product_id: props.product.id,
                price: props.product.price,
                quantity: 1,
            });

            if (response.status === 201) {
                notify("Sản phẩm đã được thêm vào giỏ hàng!");
            } else {
                notifyError("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.log(error);
            notifyError("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

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
                                className="rounded-start bg-dark cover w-100 "
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
                                    {formatPrice(props.product.price)}
                                </span>
                                <div className="mt-auto d-flex">
                                    <button
                                        className={`btn ms-auto ${
                                            props.product.stock === 0 + ""
                                                ? "disabled btn-outline-danger"
                                                : "btn-outline-dark"
                                        }`}
                                        onClick={(e) => {
                                            handleAddToCart(e);
                                        }}
                                    >
                                        <i className="fas fa-cart-plus" />
                                        {props.product.stock === 0 + ""
                                            ? "Hết hàng"
                                            : "Thêm vào giỏ hàng"}
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
