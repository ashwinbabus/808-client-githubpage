import React from "react";

import "./loader.styles.scss";

const Loader = () => (
  <div className="loader-container">
    <div className="content-container">
      <div className="content">
        <div className="planet">
          <div className="ring"></div>
          <div className="cover-ring"></div>
          <div className="spots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p className="loader-p">uploading</p>
      </div>
    </div>
  </div>
);

export default Loader;
