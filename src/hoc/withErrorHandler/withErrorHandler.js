import React, { Component } from "react";
import Model from "../../components/UI/Model/Model";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    UNSAFE_componentWillMount() {
     this.reqInterceptors = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
      return true
    }
    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqInterceptors)
      axios.interceptors.response.eject(this.resInterceptors)
    }
    changeError = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Model show={this.state.error} modalClosed={this.changeError}>
            {this.state.error ? this.state.error.message:  null}
          </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
