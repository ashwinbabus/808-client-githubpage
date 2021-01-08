import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectOrdersArray } from "../../redux/orders/orders.selectors";

import './your-orders.styles.scss';

function YourOrders({ orders }) {
  

  return (
    <div>
      <table className="yourorders__table">
        <thead>
          <tr>
            <td>DATE</td>
            <td>ORDER ID</td>
            <td>PRODUCT</td>
            <td>QUANTITY</td>
            <td>TOTAL</td>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length
            ? orders.map( order => order.products.map((product,index) => <tr key={index} >
                <td> {order.createdAt} </td>
                <td> {order.order_id} </td>
                <td> {product.title} </td>
                <td> {product.quantity} </td>
                <td> {order.amount} </td>
            </tr>))
            : null}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  orders: selectOrdersArray,
});


export default connect(mapStateToProps)(YourOrders);
