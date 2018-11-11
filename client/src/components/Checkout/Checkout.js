import React from "react";
import "./Checkout.css";

const Checkout = props => (
  <div>
    <div className="send-payment-header">
      <p>Scan QR code or copy/paste payment address into wallet</p>
      <p>Please send <strong>{props.showTransaction.amount} <span>{props.showPaidIn}
      </span></strong> to the below address</p>
    </div>
    <div className="send-payment">
      <div>
        <img src={props.showTransaction.qrcode_url} alt="QR code"/>
      </div>

      <div>
        <div className="payment-address">
          <p>AcceptMyCrpto Payment Address:</p>
          <strong><p id="coinpayment-address">{props.showTransaction.address}</p></strong>
        </div>
        <small><p>*If no payment received in {props.showTimeout}, the purchase order will be canceled.</p></small>
      </div>
    </div>

  </div>
);

export default Checkout;
