import { createStore, applyMiddleware } from 'redux';
import rootReducers from "./rootReducers";

import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)


export default store