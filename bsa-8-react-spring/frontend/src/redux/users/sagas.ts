import axios from "axios";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {apiUrl} from "../../config/constants";
import {
    ADD_USER,
    AddUserAction,
    DELETE_USER,
    DeleteUserAction,
    EDIT_USER,
    EditUserAction,
    LOAD_USERS,
    LOAD_USERS_FAILURE,
    LOAD_USERS_SUCCESS,
    UserActionTypes
} from "./actionTypes";
import {LOAD_DATA} from "../general/actionTypes";

function* fetchUsers() {
    try {
        const users = yield call(axios.get, `${apiUrl}/users`)
        yield put({type: LOAD_USERS_SUCCESS, payload: users.data})
    } catch (e) {
        alert("Failed while loading users. Try Again")
        yield put({type: LOAD_USERS_FAILURE} as UserActionTypes)
    }
}

function* deleteUser(action: DeleteUserAction) {
    yield call(axios.delete, `${apiUrl}/users/delete/${action.payload.id}`)
    yield put({type: LOAD_DATA})
}

function* editUser(action: EditUserAction) {
    yield call(axios.put, `${apiUrl}/users`, action.payload)
    yield put({type: LOAD_DATA})
}

function* addUser(action: AddUserAction) {
    yield call(axios.post, `${apiUrl}/users`, action.payload)
    yield put({type: LOAD_DATA})
}

function* watchDeleteUser() {
    yield takeEvery(DELETE_USER, deleteUser);
}

function* watchFetchUsers() {
    yield takeEvery(LOAD_USERS, fetchUsers);
}

function* watchAddUser() {
    yield takeEvery(ADD_USER, addUser);
}

function* watchEditUser() {
    yield takeEvery(EDIT_USER, editUser);
}

export default function* usersSagas() {
    yield all([
        watchFetchUsers(),
        watchDeleteUser(),
        watchAddUser(),
        watchEditUser()
    ])
}


