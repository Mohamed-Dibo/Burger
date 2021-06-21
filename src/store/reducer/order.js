import * as actionTypes from "../action/actionTypes";
const initState = {
  order: [],
  loading: false,
  purshased: false,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURSHASE_ORDER_INIT:
      return {
        ...state,
        purshased: false,
      };
    case actionTypes.PURSHASE_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURSHASE_ORDER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId 
      };
      return {
        ...state,
        order: state.order.concat(newOrder),
        loading: false,
        purshased: true,
      };
    case actionTypes.PURSHASE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };
      case actionTypes.FETCH_ORDER_START : 
        return {
            ...state,
            loading:true
        };
    case actionTypes.FETCH_ORDER_SUCCESS: 
    return {
        ...state,
        order:action.orders,
        loading:false
    }
    case actionTypes.FETCH_ORDER_FAIL : 
    return {
        ...state,
        loading:false
    }
    default:
      return state;
  }
};

export default reducer;
