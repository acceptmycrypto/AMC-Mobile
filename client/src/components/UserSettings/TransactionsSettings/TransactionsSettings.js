import React, {Component} from "react";
import "./TransactionsSettings.css";
import FeedCard from "../../Feed/FeedCard";
import { _loadAllTransactions } from "../../../services/SettingsService";


class TransactionsSettings extends Component {

    constructor() {
        super();

        this.state = {
            transactions: []

        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    componentDidMount() {
        return _loadAllTransactions(localStorage.getItem('token')).then(res => {
        
      
            let {  transactions } = res;

           
            this.setState({ transactions });
            
          });
    }
    render() {


        return (
            <div className="w-100 mx-0 text-center">

                    <h1 className="text-center lightBlueText"> All Transactions History </h1>

                    <div className="w-50 mx-auto">
                    <FeedCard transactions={this.state.transactions} />
                    </div>
            </div>
        );
    }
}


export default TransactionsSettings;