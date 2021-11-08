import axios from "axios";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {
    GeneralActionTypes,
    LOAD_DATA,
    LOAD_DATA_FAILURE,
    LOAD_DATA_SUCCESS,
    LOG_IN,
    LogInAction,
    SIGN_UP
} from "./actionTypes";
import {apiUrl, authUrl} from "../../config/constants";
import {MessageState} from "../../types/types";
import {SET_CURRENT_USER} from "../users/actionTypes";

export function getAuthToken() {
    return JSON.parse(localStorage.getItem('user') as string)
}

function setAuthToken(token: any) {
    localStorage.setItem('user', JSON.stringify(token))
}

export function removeAuthToken() {
    localStorage.removeItem('user')
}

axios.interceptors.request.use(
    function (config) {
        if (config.url !== `${authUrl}/login` && config.url !== `${authUrl}/register`) {

            const jwtToken = getAuthToken();
            if (jwtToken) {
                console.log("In interceptor from " + config.url)
                config.headers.Authorization = "Bearer " + jwtToken;
            }
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

function* fetchData() {
    try {
        let response = yield call(axios.get, `${apiUrl}/all`)

        let {data: {messages, users, currentUser}} = response;

        messages = messages.sort((a: MessageState, b: MessageState) => (
            new Date(a.date).getTime() - new Date(b.date).getTime()));

        yield put({
            type: LOAD_DATA_SUCCESS, payload: {
                messages,
                users,
                currentUser: {...currentUser, isAdmin: currentUser.admin}
            }
        })

    } catch (e) {
        alert("Error during loading. Try again")
        removeAuthToken()
        yield put({type: LOAD_DATA_FAILURE} as GeneralActionTypes)
    }
}

function* logIn(action: LogInAction) {
    const {name, password} = action.payload;

    try {
        const response = yield call(axios.post, `${authUrl}/login`, {name, password})
        yield call(setAuthToken, response.data.token)

        yield put({type: SET_CURRENT_USER, payload: response.data.user})
        yield put({type: LOAD_DATA})

    } catch (e) {
        alert("Authentication failure");
    }

}

function* register(action: LogInAction) {
    const {name, password} = action.payload;

    try {
        const response = yield call(axios.post, `${authUrl}/register`, {name, password})
        yield call(setAuthToken, response.data.token)

        yield put({type: SET_CURRENT_USER, payload: response.data.user})
        yield put({type: LOAD_DATA})

    } catch (e) {
        alert("Registration failure: User already exist");
    }

}

function* watchFetchData() {
    yield takeEvery(LOAD_DATA, fetchData)
}

function* watchLogIn() {
    yield takeEvery(LOG_IN, logIn)
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP, register)
}

export default function* generalSagas() {
    yield all([
        watchFetchData(),
        watchLogIn(),
        watchSignUp()
    ])
}


