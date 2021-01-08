import React from "react";

import "./sign-in-sign-up.styles.scss";

import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";
import { createStructuredSelector } from "reselect";
import { selectError } from "../../redux/user/user.selector";
import { connect } from "react-redux";

const SignInSignUp = ({ errors }) => {
  return (
    <div className="sign-in-sign-up-form-container">
      {errors && (
        <div className="alert-user alert-user-danger fade-user">{errors.message}</div>
      )}
      <div className="login-section">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  errors: selectError,
});

export default connect(mapStateToProps)(SignInSignUp);
