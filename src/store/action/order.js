import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURSHASE_ORDER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
export const purchaseOrderfailed = (error) => {
  return {
    type: actionTypes.PURSHASE_ORDER_FAILED,
    error: error,
  };
};

export const purchaseOrderStart = () => {
  return {
    type: actionTypes.PURSHASE_ORDER_START,
  };
};
export const purchasingOrder = (order, token) => {
  return (dispatch) => {
    dispatch(purchaseOrderStart());
    axios
      .post("/orders.json?auth=" + token, order)
      .then((response) => {
        dispatch(purchaseOrderSuccess(response.data.name, order));
      })
      .catch((error) => {
        dispatch(purchaseOrderfailed(error));
      });
  };
};
export const purchasedInit = () => {
  return {
    type: actionTypes.PURSHASE_ORDER_INIT,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};
export const fetchOrderSuccess = (oreders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: oreders,
  };
};
export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error,
  };
};

export const fetchOrder = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const orders = [];
        for (const key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(orders));
        //  console.log(orders);
      })
      .catch((error) => {
        dispatch(fetchOrderFail(error));
      });
  };
};
