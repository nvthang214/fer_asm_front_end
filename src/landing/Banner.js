import axios from "axios";
import { useEffect, useState } from "react";

function BannerIncidator(props) {
    return (
        <button
            type="button"
            data-bs-target="#bannerIndicators"
            data-bs-slide-to={props.index}
            className={props.active ? "active" : ""}
            aria-current={props.active}
        />
    );
}

function BannerImage(props) {
    return (
        <div
            className={"carousel-item " + (props.active ? "active" : "")}
            data-bs-interval="3000"
        >
            <div
                className="ratio"
                style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
            >
                <img
                    className="d-block w-100 h-100 bg-dark cover"
                    alt=""
                    src={props.image}
                />
            </div>
            <div className="carousel-caption d-none d-lg-block">
                <h5>{props.title}</h5>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

function Banner() {
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/advertisement").then((res) => {
            setBanner(res.data);
        });
    }, []);

    return (
        <div
            id="bannerIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ marginTop: "56px" }}
        >
            <div className="carousel-indicators">
                {banner.map((item, index) => {
                    return (
                        <BannerIncidator
                            key={item.id}
                            index={index}
                            active={index === 0}
                        />
                    );
                })}
            </div>
            <div className="carousel-inner">
                {banner.map((item, index) => {
                    return (
                        <BannerImage
                            key={item.id}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            active={index === 0}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Banner;
