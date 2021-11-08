import axios from "axios";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {apiUrl} from "../../config/constants";
import {
    DELETE_MESSAGE,
    DELETE_MESSAGE_SUCCESS,
    DeleteMessageAction,
    EDIT_MESSAGE,
    EDIT_MESSAGE_SUCCESS,
    EditMessageAction,
    LIKE_MESSAGE,
    LIKE_MESSAGE_SUCCESS,
    LikeMessageAction,
    LOAD_MESSAGES,
    LOAD_MESSAGES_FAILURE,
    LOAD_MESSAGES_SUCCESS,
    MessagesActionTypes,
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SendMessageAction
} from "./actionTypes";

function* fetchMessages() {
    try {
        const messages = yield call(axios.get, `${apiUrl}/messages`)
        yield put({type: LOAD_MESSAGES_SUCCESS, payload: messages.data} as MessagesActionTypes)
    } catch (e) {
        alert("Failed Loading Users. Try Again")
        yield put({type: LOAD_MESSAGES_FAILURE} as MessagesActionTypes)
    }
}

function* sendMessage(action: SendMessageAction) {
    const message = yield call(axios.post, `${apiUrl}/messages`, action.payload)
    yield put({type: SEND_MESSAGE_SUCCESS, payload: message.data})
}

function* deleteMessage(action: DeleteMessageAction) {
    yield call(axios.delete, `${apiUrl}/messages/delete/${action.payload.id}`)
    yield put({type: DELETE_MESSAGE_SUCCESS, payload: {id: action.payload.id}})
}

function* editMessage(action: EditMessageAction) {
    const message = yield call(axios.put, `${apiUrl}/messages`, action.payload)
    yield put({type: EDIT_MESSAGE_SUCCESS, payload: message.data})
}

function* likeMessage(action: LikeMessageAction) {
    const message = yield call(axios.put, `${apiUrl}/messages/like/${action.payload.id}`)
    yield put({type: LIKE_MESSAGE_SUCCESS, payload: message.data})
}

function* watchSendMessage() {
    yield takeEvery(SEND_MESSAGE, sendMessage);
}

function* watchEditMessage() {
    yield takeEvery(EDIT_MESSAGE, editMessage);
}

function* watchDeleteMessage() {
    yield takeEvery(DELETE_MESSAGE, deleteMessage);
}

function* watchLikeMessage() {
    yield takeEvery(LIKE_MESSAGE, likeMessage);
}

function* watchFetchMessages() {
    yield takeEvery(LOAD_MESSAGES, fetchMessages);
}

export default function* messagesSagas() {
    yield all([
        watchFetchMessages(),
        watchSendMessage(),
        watchEditMessage(),
        watchDeleteMessage(),
        watchLikeMessage()
    ])
}


