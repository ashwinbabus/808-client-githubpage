import React from "react";
import StripeCheckout from "react-stripe-checkout";
import CustomButton from "../custom-button/custom-button.component";
import axios from "axios";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selector";
import { connect } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selector";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../redux/cart/cart.actions";
import {serverUrl} from '../../util'

const StripeCheckoutButton = ({ total, address, cartItems, userId , clearCart }) => {
  const priceForStripe = total * 100;
  const publishableKey =
    "pk_test_51GsSazDTNX0XYG0o81u33i23AFIl7SpFHFxnKEh0IlnAZuxC3FjL6ans3G43wo2qx8f0D4DVnaFOGsw0JfDlhBWQ00OjIhLY0P";
  
  const history = useHistory();

  const onToken = async (token) => {
    alert("Payment Succesful!");
    let body = {
      token,
      total,
      address,
      cartItems,
      userId,
    };
    await axios.post(`${serverUrl}/payments`, body);
    clearCart();
    history.push("/order-success");
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return (
    <StripeCheckout
      label="Pay Now"
      name="MECKEYS"
      description={`Your total is ${formatter.format(total)}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="INR"
    >
      <CustomButton>Deliver Here</CustomButton>
    </StripeCheckout>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  userId: selectCurrentUserId,
});

const mapDispatchToProps = dispatch => ({
  clearCart : () => dispatch(clearCart())
})

export default connect(mapStateToProps,mapDispatchToProps)(StripeCheckoutButton);

