import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = ()=>{
    this.setState((prevState)=>{
      return {
        showSideDrawer : !prevState.showSideDrawer
      }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar 
        isAuthenticated={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
        isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.SideDrawerClosedHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated : state.AuthReducer.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
