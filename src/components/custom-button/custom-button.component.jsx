import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, inverted, toggle, ...otherProps }) => {
  return (
    <button
      className={`${inverted ? "inverted" : ""} custom-button`}
      {...otherProps}
      onClick={toggle}
    >
      {children}
    </button>
  );
};

export default CustomButton;
