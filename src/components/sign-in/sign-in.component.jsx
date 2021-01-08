import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({ signInWithGoogle, signInWithEmail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmail({ email, password });
  };

  return (
    <div className="sign-in-container">
      <h3>LOGIN</h3>
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <FormInput
            label="Email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormInput
            label="Password"
            value={password}
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="sign-in-form-buttons">
          <CustomButton type="submit">LOGIN</CustomButton>

          <div className="g-sign-in-button" onClick={() => signInWithGoogle()}>
            <div className="content-wrapper">
              <div className="logo-wrapper">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="gsignin" />
              </div>
              <span className="text-container">
                <span>Sign in with Google</span>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInWithEmail: (userCredentials) =>
    dispatch(emailSignInStart(userCredentials)),
  signInWithGoogle: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
