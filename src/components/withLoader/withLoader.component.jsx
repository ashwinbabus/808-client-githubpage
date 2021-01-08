import React from "react";

import "./withLoader.styles.scss";

const WithLoader = (Component) => {
  const Spinner = ({ isLoading, ...props }) => {
      return isLoading ? (
    <div className="lds-hourglass"></div>
    ) : <Component {...props} />
  };
  return Spinner;
};
export default WithLoader;
