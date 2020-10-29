import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  sagaMiddleware,
];

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history),...middleware))
);

sagaMiddleware.run(rootSaga);

export default store