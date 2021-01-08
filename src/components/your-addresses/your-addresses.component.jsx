import React, { useState } from "react";
import { connect } from "react-redux";
import AddAddressForm from "./add-address-form.component";
import "./your-addresses.styles.scss";
import StripeCheckoutButton from "../stripe-checkout/stripe-checkout.component";
import { createStructuredSelector } from "reselect";
import { selectAddresses } from "../../redux/addresses/address.selectors";
import {
  deleteAddressStart,
  popAddressFromArray,
} from "../../redux/addresses/address.actions";

const YourAddresses = ({
  checkout,
  addresses,
  deleteAddress,
  popAddressFromArray,
}) => {

  const [currentSelection, setCurrentSelection] = useState(-1);

  const [addingAddress, setAddingAddress] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentSelection(index);
    setAddingAddress(true);
  };

  const handleDelete = (_id) => {
    popAddressFromArray(_id)
    deleteAddress(_id);
  };

  return addingAddress ? (
    <AddAddressForm
      addresses={isEditing ? addresses[currentSelection] : null}
      currentSelection={currentSelection}
      setAddingAddress={setAddingAddress}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
    />
  ) : (
    <div className="your-addresses-tab">
      <div
        className="add-address-outer-box"
        type="button"
        onClick={() => setAddingAddress(true)}
      >
        <div className="add-address-inner-box">
          <div className="add-icon">+</div>
          <h4>Add Address</h4>
        </div>
      </div>
      {addresses && addresses.length > 0
        ? addresses.map((address, index) => (
            <div className="address-tile-with-button" key={index} >
              <div className="address-tile" key={index}>
                <div className="address-tile-contents">
                  <div className="user-address-details">
                    <p>
                      {" "}
                      <strong id="fullname">{address.fullname}</strong>{" "}
                    </p>
                    <p>{address.house_number}</p>
                    <p>{address.area}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.pincode}</p>
                    <p>
                      {" "}
                      <strong>Phone : </strong> {address.mobile}
                    </p>
                  </div>
                  <div className="address-options">
                    <p onClick={() => handleEdit(index)} style={{cursor: "pointer"}} >Edit</p>
                    &nbsp; | &nbsp;
                    <p onClick={() => handleDelete(address._id)} style={{cursor: "pointer"}} >Remove</p>
                  </div>
                </div>
              </div>
              {checkout ? <StripeCheckoutButton address={address} /> : null}
            </div>
          ))
        : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteAddress: (_id) => dispatch(deleteAddressStart(_id)),
  popAddressFromArray: (_id) => dispatch(popAddressFromArray(_id)),
});

const mapStateToProps = createStructuredSelector({
  addresses: selectAddresses,
});

export default connect(mapStateToProps, mapDispatchToProps)(YourAddresses);
