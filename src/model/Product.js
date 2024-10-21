export const Product = {
    id: null,
    name: "",
    price: "",
    description: "",
    image: [],
    status: 1,
    category_id: "",

    created_at: "",
    updated_at: "",
    deleted_at: "",
};

export const Category = {
    id: null,
    name: "",
    status: 1,
    created_at: "",
    updated_at: "",
    deleted_at: "",
};

export const Order = {
    id: null,
    user_id: "",
    total: "",
    status: 1,
    created_at: "",
    updated_at: "",
    deleted_at: "",
};

export const OrderStatus = {
    id: null,
    name: "",
    status: 1,
    created_at: "",
    updated_at: "",
    deleted_at: "",
};

export const OrderDetail = {
    id: null,
    order_id: "",
    product_id: "",
    quantity: "",
    price: "",
    status: 1,
    created_at: "",
    updated_at: "",
    deleted_at: "",
};

export const Role = {
    id: null,
    name: "",
    status: 1,
    created_at: "",
    updated_at: "",
    deleted_at: "",
};

export const Advertisement = {
    id: null,
    name: "",
    image: "",
    context: "",
    priority: "", // uu tien
    status: 1,
    created_at: "",
    updated_at: "",
    deleted_at: "",
};

export const Cart = {
    id: null,
    user_id: "",
    product_id: "",
    quantity: "",
    status: 1,
};
