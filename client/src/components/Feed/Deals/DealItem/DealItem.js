import React, { Component } from "react";
import { _loadDealItem, _fetchTransactionInfo } from "../../../../services/DealServices";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StepZilla from "react-stepzilla";
import CustomizeOrder from "../CustomizeOrder";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import Layout from "../../../Layout";

class DealItem extends Component {
  constructor() {
    super();

    this.state = {
      dealItem: null,
      acceptedCryptos: null,
      selectedOption: {value: "BTC", label: "Bitcoin (BTC)", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", name: "Bitcoin"},
      selectedSize: null,
      selectedColor: null,
      fullName: null,
      address: null,
      city: null,
      zipcode: null,
      shippingState: null,
      transactionInfo: null,
      paidIn: null,
      purchasing: false,
      loading: false
    };
  }

  //load deal item
  componentDidMount() {
    //return the param value
    const { deal_name } = this.props.match.params;

    return _loadDealItem(deal_name).then(dealItem => {
      let venue_name = dealItem[0].venue_name;
      let acceptedCryptos = dealItem[1];

      this.setState({
        dealItem: dealItem[0],
        acceptedCryptos
      });
    });
  }

  handleSelectedCrypto = (selectedOption) => {
    this.setState({ selectedOption });
  }

  //set the options to delect crypto from
  cryptoOptions() {
    let options = [];
    this.state.acceptedCryptos.map(crypto => {

      let optionObj = {};
      optionObj.value = crypto.crypto_symbol;
      optionObj.label = crypto.crypto_name + " " + "(" + crypto.crypto_symbol + ")";
      optionObj.logo = crypto.crypto_logo;
      optionObj.name = crypto.crypto_name;

      options.push(optionObj);
    })

    return options
  }

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  convertSecondToMinute = (sec) => {

      sec = Number(sec);
      let h = Math.floor(sec / 3600); //1400
      let m = Math.floor(sec % 3600 / 60); //0
      let s = Math.floor(sec % 3600 % 60); //0

      let hDisplay = h > 0 ? h + (":") : "00:";
      let mDisplay = m > 0 ? m + (":") : "00:";
      let sDisplay = s > 0 ? s : "00";

      return hDisplay + mDisplay + sDisplay;

  }

  handleCustomizingSize = event => {
    this.setState({selectedSize: event.target.value})
  }

  handleCustomizingColor = event => {
    this.setState({selectedColor: event.target.value})
  }

  handleFullNameInput= event => {
    this.setState({fullName: event.target.value})
  }

  handleAddressInput= event => {
    this.setState({address: event.target.value})
  }

  handleCityInput= event => {
    this.setState({city: event.target.value})
  }

  handleZipcodeInput= event => {
    this.setState({zipcode: event.target.value})
  }


  handleShippingStateInput= event => {
    this.setState({shippingState: event.target.value})
  }

  createPaymentHandler = (event) => {
    event.preventDefault();
    //info needed to insert into user_purchases table
    //deal_id, crypto_name, amount, and user_id
    let deal_id = this.state.dealItem.deal_id;
    let amount = this.state.dealItem.pay_in_crypto;
    // let user_id = '4' //hardcoded user_id for now. Need to grab user_id dynamically
    let crypto_symbol = this.state.selectedOption.value;
    let crypto_name = this.state.selectedOption.name;
    let token = localStorage.getItem('token');

    this.setState({loading: true}, () => {
      return _fetchTransactionInfo(crypto_name, crypto_symbol, deal_id, amount, token)
      .then(transactionInfo => {
        this.setState(
          { loading: false,
            transactionInfo,
            paidIn: crypto_symbol,
            purchasing: true
          });
      });
    })
  };

  render() {

    const steps = [
      { name: "Customizing",
        component:
        <CustomizeOrder
        handle_CustomizingSize={this.handleCustomizingSize}
        handle_CustomizingColor={this.handleCustomizingColor}/>},
      { name: "Shipping",
        component:
        <ShipOrder
        handle_ShippingFullName={this.handleFullNameInput}
        handle_ShippingAddress={this.handleAddressInput}
        handle_ShippingCity={this.handleCityInput}
        handle_ShippingZipcode={this.handleZipcodeInput}
        handle_ShippingState={this.handleShippingStateInput}/> },
      { name: "Payment", component:
        <PurchaseOrder
        cryptos={this.state.dealItem && this.cryptoOptions()}
        cryptoSelected={this.state.selectedOption}
        selectCrypto={this.handleSelectedCrypto}
        SubmitPayment={this.createPaymentHandler}
        transactionInfo={this.state.transactionInfo}
        cryptoSymbol={this.state.paidIn}
        paymentButtonClicked={this.state.purchasing}
        showLoadingSpinner={this.state.loading}
        timeout={this.state.transactionInfo && this.convertSecondToMinute(this.state.transactionInfo.timeout)}/> }
    ];

    return (
      <div>
        <Layout/>
        <div>
          {/* {this.state.dealItem.map(item => (
          <ul key={item.id}>
            <li>{item.deal_name}</li>
            <li>{item.deal_description}</li>
            <li>{item.deal_image}</li>
            <li>{item.pay_in_dollar}</li>
            <li>{item.pay_in_crypto}</li>
            <li>{item.venue_name}</li>
            <li>{item.venue_link}</li>
          </ul>
        ))} */}
          <div className="deal-container">
            <div className="deal-header">

              <div className="deal-item-header">
                <div className="deal-item-name">
                  <strong>{this.state.dealItem && this.state.dealItem.deal_name}</strong> <br/>
                  <small> Offered By: {this.state.dealItem && this.state.dealItem.venue_name}</small>
                </div>
                <div className="deal-item-cost">
                  <strong>Pay in Crypto:  ${this.state.dealItem && this.state.dealItem.pay_in_crypto}</strong>  <small className="deal-item-discount">
                  {this.state.dealItem && this.convertToPercentage(this.state.dealItem.pay_in_dollar, this.state.dealItem.pay_in_crypto)}% OFF</small> <br/>
                  <small>Pay in Dollar:  ${this.state.dealItem && this.state.dealItem.pay_in_dollar} <br/></small>
                </div>
              </div>

              <div className="deal-item-summary">
                  <div className="customize-item-summary">
                    <strong>Customizing</strong> <br/>
                    <small>{this.state.selectedSize}</small> <br/>
                    <small>{this.state.selectedColor}</small> <br/>
                  </div>

                  <div className="customize-item-shipping">
                    <strong>Shipping</strong> <br/>
                    <small>{this.state.fullName}</small> <br/>
                    <small>{this.state.address}</small> <br/>
                    <small>{this.state.city} </small>
                    <small>{this.state.zipcode} </small>
                    <small>{this.state.shippingState}</small>
                  </div>

                  <div className="customize-item-payment">
                    <div className="crypto_logo">
                      <strong>Payment</strong> <br/>
                      <img src={this.state.selectedOption.logo} alt="cryptoLogo" />
                    </div>
                  </div>
              </div>
            </div>

            <div className="deal-main-info">
              <div className="deal-images-container">
                <Carousel
                  className="react-carousel"
                  width={"55%"}
                  showStatus={false}>

                  {this.state.dealItem &&
                  this.state.dealItem.deal_image.map(img => (
                    <div className="deal-item-image">
                      <img src={img} />
                    </div>
                  ))}

                </Carousel>
              </div>

              <div className="deal-checkout-container">
                <div className="step-progress">
                  <StepZilla steps={steps}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DealItem;
