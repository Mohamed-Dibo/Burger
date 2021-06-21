import React, { Component } from "react";
import Order from "../../../../Order/Order";
import axios from "../../../../../axios-orders";
import withErrorHandler from "../../../../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../../../../store/action/index";
import Spinner from "../../../../UI/Model/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token,this.props.userId);
  }
  render() {
    let Orders = <Spinner />;
    if (!this.props.loading) {
      Orders = this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            price={+order.price}
            ingredients={order.ingredients}
          />
        );
      });
    }
    return <div>{Orders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
    token:state.AuthReducer.token,
    userId :state.AuthReducer.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token,userId) => dispatch(actions.fetchOrder(token,userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
