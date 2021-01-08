import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";

import FormInput from "../form-input/form-input.component";
import YourOrdersContainer from "../your-orders/your-orders.container";

import { fetchUserOrdersStart } from "../../redux/orders/orders.actions";
import { signOutStart } from "../../redux/user/user.actions";

import "./account-details.styles.scss";
import { createStructuredSelector } from "reselect";
import { selectMyAccountTab } from "../../redux/my-account/my-account.selectors";
import { setMyAccountTab } from "../../redux/my-account/my-account.actions";
import { useSpring, animated } from "react-spring";
import { getAddressStart, resetAddressWhenUserLogsOut } from "../../redux/addresses/address.actions";
import YourAddressContainer from "../your-addresses/your-addresses.container";
import { clearCart } from "../../redux/cart/cart.actions";

const DashBoardTab = ({ user, logout }) => (
  <div className="dashboard">
    <div className="dashboard__welcome">
      <p>
        Hello
        <strong style={{ textTransform: "capitalize" }}>
          {" "}
          {user.displayName}
        </strong>{" "}
        (not{" "}
        <strong style={{ textTransform: "capitalize" }}>
          {" "}
          {user.displayName}
        </strong>{" "}
        ?{" "}
      </p>
      <p id="log-out" onClick={logout}>
        Log out
      </p>
      <p>)</p>
    </div>
    <p>
      From your account dashboard you can view your recent orders, manage your
      shipping and billing addresses, and edit your password and account
      details.
    </p>
  </div>
);

const LoginSecurity = ({ user }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  return (
    <div className="login-and-security">
      <form>
        <FormInput
          value={displayName}
          label="Display Name"
          id="form-display-name"
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <FormInput
          value={email}
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormInput
          value={currentPassword}
          label="Current password"
          type="password"
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
        <FormInput
          value={newPassword}
          label="New password"
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <CustomButton>Update</CustomButton>
      </form>
    </div>
  );
};

const AccountDetails = ({ user, fetchOrders, logout , currentTab , setCurrentTab , getAddress , clearCart , resetAddress }) => {
 
  useEffect(() => {
    fetchOrders(user._id);
    getAddress(user._id);
  }, [user._id,fetchOrders,getAddress]);

  const props = useSpring({
    from : {opacity : 0 , height : '0%'},
    to : {opacity : 1 , height : '100%'}
  })

  const signOutUser = () => {
    logout();
    clearCart();
    resetAddress();
  }

  const renderSwitch = (currentTab) => {
    switch (currentTab) {
      case "dashboard":
        return <DashBoardTab user={user} logout={signOutUser} />;
      case "orders":
        return <YourOrdersContainer />;
      case "login":
        return <LoginSecurity user={user} />;
      case "address":
        return <YourAddressContainer />;
      default:
        return <DashBoardTab user={user} />;
    }
  };

  return (
    <div className="useraccount">
      <nav className="useraccount__navigation">
        <ul>
          <li onClick={() => setCurrentTab("dashboard")}>Dashboard</li>
          <li onClick={() => setCurrentTab("orders")}>Orders</li>
          <li onClick={() => setCurrentTab("login")}>Security</li>
          <li onClick={() => setCurrentTab("address")}>Addresses</li>
          <li onClick={()=>signOutUser()}>Logout</li>
        </ul>
      </nav>
      <animated.div style={{props}} className="useraccount__section">{renderSwitch(currentTab)}</animated.div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentTab : selectMyAccountTab
})



const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (userId) => dispatch(fetchUserOrdersStart(userId)),
  getAddress: (userId) => dispatch(getAddressStart(userId)),
  logout: () => dispatch(signOutStart()),
  setCurrentTab : (tab) => dispatch(setMyAccountTab(tab)),
  clearCart : () => dispatch(clearCart()),
  resetAddress : () => dispatch(resetAddressWhenUserLogsOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
