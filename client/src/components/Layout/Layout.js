import React, { Component } from "react";
import "./Layout.css";
import Navbar from "../Navigation/Navbar/Navbar";
import { _isLoggedIn } from "../../services/NavbarService";

class Layout extends Component {
  constructor() {
    super()
    this.state = {
      user: false
    }

  }


  componentDidMount (){
    
    return _isLoggedIn (localStorage.getItem('token')).then(user => {
      if(user.message == "Right Token"){
  
        this.setState({
          user: true
        })
      }else {
        this.setState({
          user: false
        })
      }
    })
 

  }


  render (){

  return (
    <div>
      {this.state.user && <Navbar /> }
      
      <main className="Content">
        {this.props.children}
      </main>
    </div>
  );
  }
};

export default Layout;
