import React, { Component } from "react";
import BurgerBuilder from "./components/contianers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/contianers/BurgerBuilder/Checkout/Checkout";
import Layout from "./components/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Orders from "./components/contianers/BurgerBuilder/Checkout/Orders/Orders";
import Auth from "./components/contianers/BurgerBuilder/Auth/Auth";
import Logout from "./components/contianers/BurgerBuilder/Auth/Logout";
import * as actions from "./store/action/index";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
