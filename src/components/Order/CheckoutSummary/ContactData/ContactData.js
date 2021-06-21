import React, { Component } from "react";
import Button from "../../../UI/Model/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../../axios-orders";
import Spinner from "../../../UI/Model/Spinner/Spinner";
import Input from "../../../UI/Model/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../../store/action/index";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validition: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validition: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validition: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validition: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validition: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validition: {},
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    let orderData = {};
    for (const formInput in this.state.orderForm) {
      orderData[formInput] = this.state.orderForm[formInput].value;
    }
    // console.log(orderData);
    const orders = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData,
      userId: this.props.userId,
    };
    this.props.purchasingOrder(orders, this.props.token);
  };

  ckeckvalidity = (value, rules) => {
    let isvalid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isvalid = value.trim() !== "" && isvalid;
    }
    if (rules.minLength) {
      isvalid = value.length >= rules.minLength && isvalid;
    }
    if (rules.maxLength) {
      isvalid = value.length <= rules.maxLength && isvalid;
    }
    return isvalid;
  };
  handelChanged = (event, elementIdetifier) => {
    let updateOrderForm = {
      ...this.state.orderForm,
    };
    let updateElementValue = {
      ...this.state.orderForm[elementIdetifier],
    };
    updateElementValue.value = event.target.value;
    updateElementValue.valid = this.ckeckvalidity(
      updateElementValue.value,
      updateElementValue.validition
    );
    updateElementValue.touched = true;
    updateOrderForm[elementIdetifier] = updateElementValue;
    let formIsValid = true;
    for (const inputIdetifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdetifier].valid && formIsValid;
    }
    this.setState({ orderForm: updateOrderForm, formIsValid });
  };
  render() {
    let formElementArray = [];
    for (const key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    // console.log(formElementArray);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((element) => {
          return (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              invalid={!element.config.valid}
              shouldValidate={element.config.validition}
              touched={element.config.touched}
              changed={(event) => this.handelChanged(event, element.id)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.AuthReducer.token,
    userId: state.AuthReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    purchasingOrder: (order, token) =>
      dispatch(actions.purchasingOrder(order, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
