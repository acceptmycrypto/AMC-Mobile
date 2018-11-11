import React from "react";
import "./PurchaseOrder.css";
import Select from "react-select";
import Checkout from "../../../Checkout";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";

const PurchaseOrder = props => {
  return (
    <div>
      <form onSubmit={props.SubmitPayment}>
        <div class="form-group">
        <label className="text-capitalize" htmlFor="select_crypto">Select the Cryptocurrency to pay with</label>
        <Select
        id="select_crypto"
        defaultValue={props.cryptoSelected}
        onChange={props.selectCrypto}
        options={props.cryptos}
      />
        </div>

        {!props.paymentButtonClicked ?
        <div id="submit_payment">
          <button>Send Your Payment</button>
        </div> : null}

      </form>


      {props.paymentButtonClicked ?
      <Checkout showTimeout={props.timeout} showTransaction={props.transactionInfo} showPaidIn={props.cryptoSymbol}/> : null}

      {props.showLoadingSpinner ? <LoadingSpinner /> : null}

    </div>
  );
};

export default PurchaseOrder;
