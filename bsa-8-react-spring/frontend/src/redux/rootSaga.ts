import {all} from "redux-saga/effects"
import usersSagas from "./users/sagas";
import messagesSagas from "./messages/sagas";
import generalSagas from "./general/sagas";

export default function* rootSaga() {
    yield all([
        messagesSagas(),
        usersSagas(),
        generalSagas()
    ])
}
