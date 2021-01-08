import "./App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import MyAccount from "./pages/my-account-page/my-account-page.component";
import Shop from "./pages/shop/shop.component";
import Cart from "./components/cart/cart.component";
import CartPage from "./pages/cart-page/cart-page.component";
import { ProtectedRoute } from "./util";
import ThankYou from "./components/thank-you/thank-you.component";
import Dash from "./pages/dashboard/dash.component";
import { auth } from "./firebase/firebase";
import { checkUserSession } from "./redux/user/user.actions";

function App({ signInUser }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        signInUser(user.uid);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [signInUser]);
  return (
    <div className="App">
      <ProtectedRoute exact path="/dashboard" component={Dash} />
      <Switch>
        <Route path="/shop" component={Shop} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/my-account" component={MyAccount} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/order-success" component={ThankYou} />
      </Switch>
      <Cart />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signInUser: (firebase_uid) => dispatch(checkUserSession(firebase_uid)),
});
export default connect(null, mapDispatchToProps)(App);
