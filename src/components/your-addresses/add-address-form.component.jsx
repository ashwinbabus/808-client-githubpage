import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./add-address-form.styles.scss";
import { createStructuredSelector } from "reselect";
import { selectCurrentUserId } from "../../redux/user/user.selector";
import {
  modifyAddressArray,
  postAddressStart,
  updateAddressStart,
} from "../../redux/addresses/address.actions";

const AddAddressForm = ({
  addresses,
  editAddress,
  setIsEditing,
  setAddingAddress,
  userId,
  isEditing,
  postAddress,
  modifyAddressArray,
}) => {
  console.log("userid to add address ", userId);
  const states = [
    "Select",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  let defaultValue =
    addresses === null
      ? {
          fullname: "",
          house_number: "",
          area: "",
          city: "",
          state: "",
          mobile: "",
          pincode: "",
          userId,
        }
      : addresses;

  const [tempAddr, setTempAddr] = useState(defaultValue);

  const {
    fullname,
    house_number,
    area,
    city,
    state,
    mobile,
    pincode,
  } = tempAddr;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      console.log("handle submit tempaddr", tempAddr);
      editAddress(tempAddr);
      modifyAddressArray(tempAddr);
    } else {
      postAddress(tempAddr);
    }
    setTempAddr({
      fullname: "",
      house_number: "",
      area: "",
      city: "",
      state: "",
      mobile: "",
      pincode: "",
    });

    setIsEditing(false);
    setAddingAddress(false);
  };

  const cancelEditing = () => {
    setAddingAddress(false);
  };

  return (
    <div className="add-address-form">
      <form onSubmit={handleSubmit}>
        <FormInput
          value={fullname}
          label="Full name"
          onChange={(event) =>
            setTempAddr({ ...tempAddr, fullname: event.target.value })
          }
          bgColor="transparent"
        />
        <FormInput
          value={mobile}
          label="Mobile number"
          onChange={(event) =>
            setTempAddr({ ...tempAddr, mobile: event.target.value })
          }
          bgColor="transparent"

        />
        <FormInput
          value={pincode}
          label="Pincode"
          onChange={(event) =>
            setTempAddr({ ...tempAddr, pincode: event.target.value })
          }
          bgColor="transparent"

        />
        <FormInput
          value={house_number}
          label="Flat, House no.,Apartment"
          onChange={(event) =>
            setTempAddr({ ...tempAddr, house_number: event.target.value })
          }
          bgColor="transparent"

        />
        <FormInput
          value={area}
          label="Area, Colony, Street"
          onChange={(event) =>
            setTempAddr({ ...tempAddr, area: event.target.value })
          }
          bgColor="transparent"

        />
        <FormInput
          value={city}
          label="Town/City"
          onChange={(event) =>
            setTempAddr({ ...tempAddr, city: event.target.value })
          }
          bgColor="transparent"

        />
        <select
          name="states"
          id="states"
          value={state}
          onChange={(event) =>
            setTempAddr({ ...tempAddr, state: event.target.value })
          }
          style={{backgroundColor:"transparent"}}
        >
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>
        <div className="add-address-form-buttons">
          <CustomButton type="submit">Save</CustomButton>
          <CustomButton type="button" toggle={() => cancelEditing()}>
            Cancel
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectCurrentUserId,
});

const mapDispatchToProps = (dispatch) => ({
  postAddress: (address) => dispatch(postAddressStart(address)),
  editAddress: (address) => dispatch(updateAddressStart(address)),
  modifyAddressArray: (address) => dispatch(modifyAddressArray(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressForm);
