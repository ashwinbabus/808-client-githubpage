import React from "react";

import "./form-input.styles.scss";

const FormInput = ({
  label,
  handleChange,
  addOptions,
  signInErrors,
  signUpErrors,
  bgColor,
  ...props
}) => {
  return (
    <div className="form-input-container">
      <input
        type="text"
        onChange={handleChange}
        {...props}
        className={`
        ${signInErrors ? "sign-in-error" : ""}  
        ${signUpErrors ? "sign-up-error" : ""}
        form-input
        `}
        style={{  backgroundColor : `${bgColor ? bgColor : "white"}`  }}
      />

      {label ? (
        <label
          className={`
        form-input-label 
        ${props.value.length ? "shrink" : ""} 
        ${signInErrors ? "sign-in-form-label-error" : ""} 
        ${signUpErrors ? "sign-up-form-label-error" : ""}  
        `}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
