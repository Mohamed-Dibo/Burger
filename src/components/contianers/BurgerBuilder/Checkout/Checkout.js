import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import CheckoutSummary from "../../../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../../../Order/CheckoutSummary/ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelled = () => {
    this.props.history.goBack();
  };
  checkoutContinue = () => {
    this.props.history.push(`${this.props.match.url}/contact-data`);
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purshased = this.props.purshased ? <Redirect to="/" />: null;
      summary = (
        <div>
          {purshased}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinue={this.checkoutContinue}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    purshased: state.order.purshased,
  };
};
export default connect(mapStateToProps)(Checkout);
