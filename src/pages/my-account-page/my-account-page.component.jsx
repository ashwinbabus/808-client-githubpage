import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from 'react-redux'

import Header from "../../components/header/header.component";
import SignInSignUp from "../../components/sign-in-sign-up/sign-in-sign-up.component";
import AccountDetails from "../../components/account-details/account-details.component";


import { selectCurrentUser } from "../../redux/user/user.selector";

import "./my-account-page.styles.scss";

const MyAccount = ({ user }) => {
  return (
    <div className="my-account-page">
      <Header background={true} />
      <div className="my-account-title">
        <h1>MY ACCOUNT</h1>
        <hr />
      </div>
      {user ? <AccountDetails user={user} /> : <SignInSignUp />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(MyAccount);
