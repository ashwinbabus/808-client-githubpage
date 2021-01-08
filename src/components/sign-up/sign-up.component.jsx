import React, { useState } from "react";

import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignUp = ({ signUpStart }) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpStart({ email, displayName, password });
  };

  return (
    <div className="sign-up-container">
      <h3>REGISTER</h3>
      <form onSubmit={handleSubmit}>
        <div className="sign-up-form">
          <FormInput
            label="Username"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
          <FormInput
            label="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <FormInput
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
          />
        </div>
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});


export default connect(null,mapDispatchToProps)(SignUp);
