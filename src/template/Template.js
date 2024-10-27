import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { createContext, useState } from "react";

function Template(props) {
    const CartContext = createContext();
    const [cartChange, setCartChange] = useState(true);
    return (
        <>
            <CartContext.Provider value={{ cartChange, setCartChange }}>
                <Header context={CartContext} />
                <Content>{props.children}</Content>
                <Footer />
            </CartContext.Provider>
        </>
    );
}

export default Template;
