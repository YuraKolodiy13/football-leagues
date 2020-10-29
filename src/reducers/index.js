import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import leagues from "./leagues";

const createRootReducer = (history) => combineReducers({
  leagues,
  router: connectRouter(history),
});

export default createRootReducer;