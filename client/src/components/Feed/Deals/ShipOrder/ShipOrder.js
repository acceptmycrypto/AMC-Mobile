import React from "react";
import "./ShipOrder.css";

const ShipOrder = props => {
  return (
    <div>
      <form>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="Enter Full Name"
            onChange={props.handle_ShippingFullName}
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Address"
            onChange={props.handle_ShippingAddress}
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter City"
            onChange={props.handle_ShippingCity}
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Postal Code"
            onChange={props.handle_ShippingZipcode}
          />
        </div>

        <select
          class="custom-select mr-sm-2"
          id="select-color"
          onChange={props.handle_ShippingState}
        >
          <option selected>Select State</option>
          <option value="CA">California</option>
          <option value="WA">Washington</option>
          <option value="ORG">Oregon</option>
        </select>
      </form>
    </div>
  );
};

export default ShipOrder;
