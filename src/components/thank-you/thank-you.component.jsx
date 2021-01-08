import React from "react";

import { Link } from "react-router-dom";

import './thank-you.component.scss'

export default function ThankYou() {
  return (
    <div className="thankyou__container">
      <h1 className="thankyou__title">
        Thank you for shopping with us. <br/> See you soon.
      </h1>
      <Link to="/shop/">
        {" "}
        <h3 className="thankyou_continueshop">Continue shopping</h3>
      </Link>
    </div>
  );
}
