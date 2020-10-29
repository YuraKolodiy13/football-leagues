import { all } from 'redux-saga/effects';
import leagues from "./leagues";

export default function* rootSaga() {
  yield all([
    leagues,
  ])
}