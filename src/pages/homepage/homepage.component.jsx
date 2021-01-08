import React, { useEffect, useState } from "react";
import Slides from "../../components/slides/slides.component";
import Header from "../../components/header/header.component";
import { ReactComponent as KeyboardIcon } from "../../assets/product_icon.svg";
import slides_data from "./slides-data";
import "./homepage.styles.scss";
import { Link, useHistory } from "react-router-dom";

const Homepage = () => {
  const [slideProperties, setSlideProperties] = useState(slides_data[0]);
  const [count, setCount] = useState(0);
  const [headerBg, setHeaderBg] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setSlideProperties(slides_data[count]);
  }, [count]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const handleScroll = (event) => {
    if (event.srcElement.scrollingElement.scrollTop >= 100) {
      setHeaderBg(true);
    } else {
      setHeaderBg(false);
    }
  };

  const setCurrentSlide = (dir) => {
    if (dir === 1) {
      setCount((count + 1) % slides_data.length);
    } else {
      if (count === 0) {
        setCount(slides_data.length - 1);
      } else {
        setCount(count - 1);
      }
    }
  };

  return (
    <div className="homepage-container">
      <Header transparent background={headerBg} />
      <div className="homepage-slides-container">
        <Slides slideProperties={slideProperties} />
        <div
          className="direction-nav direction-nav-prev"
          onClick={() => setCurrentSlide(2)}
        />
        <div
          className="direction-nav direction-nav-next"
          onClick={() => setCurrentSlide(1)}
        />
        <div className="slider-dots-container">
          {slides_data.map((slide, index) => {
            return (
              <div
                className={`dot ${count === index ? "active" : ""}`}
                onClick={() => setCount(index)}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="second-section-container">
        <div className="second-section">
          <div className="left-section">
            <div className="left-section-top">
              <h1>Inspired Typing</h1>
              <p>Performance driven mechanical keyboards and peripherals</p>
              <div className="icon-and-heading">
                <KeyboardIcon />
                <Link to="/shop">
                  <h4>OUR PRODUCTS</h4>
                </Link>
              </div>
            </div>
          </div>{" "}
          {/*left section end*/}
          <div className="right-section">
            <div className="right-elements-dimensions text-tile">
              <div
                className="right-section-text-tile"
                onClick={() => history.push("/shop/mouse")}
              >
                <h5>Mice</h5>
                <hr />
                <p>Precision & Comfort</p>
              </div>
            </div>

            <div
              className="parent right-elements-dimensions"
              onClick={() => history.push("/shop/mouse")}
            >
              <div className="child" id="mouse"></div>
            </div>

            <div
              className="parent right-elements-dimensions"
              onClick={() => history.push("/shop/Mechanical Switches")}
            >
              <div className="child" id="switches"></div>
            </div>

            <div
              className="right-elements-dimensions text-tile"
              onClick={() => history.push("/shop/Mechanical Switches")}
            >
              <div className="right-section-text-tile">
                <h5>Switches</h5>
                <hr />
                <p>Precision & Comfort</p>
              </div>
            </div>

            <div
              className="right-elements-dimensions text-tile"
              onClick={() => history.push("/shop/keycaps")}
            >
              <div className="right-section-text-tile">
                <h5>Keycaps</h5>
                <hr />
                <p>Engineered for the ultimate typing experience</p>
              </div>
            </div>

            <div
              className="parent right-elements-dimensions"
              onClick={() => history.push("/shop/keycaps")}
            >
              <div className="child" id="keycaps"></div>
            </div>
          </div>{" "}
          {/*right section end*/}
        </div>{" "}
        {/* second section end */}
      </div>{" "}
      {/* second section container end */}
    </div>
  );
};

export default Homepage;
