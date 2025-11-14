import React from "react";
import "./Slider.css";
import image from "../../assets/bg13.jpg";
import image2 from "../../assets/bg14.jpg";
import image3 from "../../assets/bg15.jpg";
import image4 from "../../assets/bg16.jpg";
import image5 from "../../assets/bg17.jpg";

function Slider(props: {
  handlePageClicked: (page: string) => void;
  origin: "header" | "normal";
}) {
  const [current, setCurrent] = React.useState(0);
  const sliderList = [
    { id: 1, title: "Home", bg: image },
    { id: 2, title: "About", bg: image2 },
    { id: 3, title: "Stacks", bg: image3 },
    { id: 4, title: "Projects", bg: image4 },
    { id: 5, title: "Contact", bg: image5 },
  ];
  return (
    <div className="slider">
      <div className="slider-container" onMouseLeave={() => setCurrent(0)}>
        {sliderList.map((item) => (
          <div
            key={item.id}
            className={`slider-item ${
              current === item.id ? "slider-item-active" : ""
            } ${props.origin === "header" ? "header-slider-item" : ""}`}
            style={{
              backgroundImage: `url(${item.bg})`,
              // width: props.origin === "header" ? "12.5%" : "10%",
            }}
            onMouseEnter={() => setCurrent(item.id)}
            onMouseLeave={() => setCurrent(0)}
            onClick={() => props.handlePageClicked(item.title)}
          >
            {props.origin === "header" && <div className="overlay"></div>}
            <div className={`slider-no ${props.origin === 'header' ? 'header-slider-no' : ''}`}>{item.id}</div>
            <div
              className={`slider-title ${
                current === item.id ? "slider-title-active" : ""
              } ${props.origin === "header" ? "header-slider-title" : ""}`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
