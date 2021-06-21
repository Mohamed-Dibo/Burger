import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Burger from "../../Burger/Burger";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import Model from "../../UI/Model/Model";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Model/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../../store/action/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onAuthRedirect('/checkout')
      this.props.history.push("/auth");
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onPurchase();
    this.props.history.push("/checkout");
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  componentDidMount() {
    this.props.onInitIngredient();
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>ingredients can't loadinding</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Model
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Model>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.AuthReducer.token !== null,
  };
};
const mapStateToDispatch = (dispatch) => {
  return {
    onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onPurchase: () => dispatch(actions.purchasedInit()),
    onAuthRedirect : (path) => dispatch(actions.authRedirect(path))
  };
};
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withErrorHandler(BurgerBuilder, axios));
