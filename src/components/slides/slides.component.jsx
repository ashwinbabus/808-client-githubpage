import React from "react";
import { useHistory } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import "./slides.styles.scss";

const Slides = ({ slideProperties: { title, subtitle, image, url } }) => {
  const history = useHistory();
  return (
    <div className="slides-container">
      <img src={image} alt="slide" />
      <div className="transparent-layer" />
      <div className="slide-title-and-buttons">
        <h1>{title}</h1>
        <h6>{subtitle}</h6>
        <CustomButton inverted toggle={() => history.push(url)}>
          order now
        </CustomButton>
      </div>
    </div>
  );
};

export default Slides;
