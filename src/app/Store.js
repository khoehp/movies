import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import bookingReducer from "features/booking/bookingSlice";
import thunk from "redux-thunk";
import authReducer from "features/authentication/authSlice";
const rootReducer = combineReducers({
  booking: bookingReducer,
  auth: authReducer,
});

// middleware :lưu log những action được gửi lên store
const logger = (state) => {
  return (next) => {
    return (action) => {
      console.log(action);
      // xử lý  action
      const actionList = localStorage.getItem("actionList");
      if (!actionList) {
        localStorage.setItem("actionList", JSON.stringify([action]));
      } else {
        const actionListArr = JSON.parse(actionList);
        actionListArr.push(action);
        localStorage.setItem("actionList", JSON.stringify(actionListArr));
      }

      next(action);
    };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
