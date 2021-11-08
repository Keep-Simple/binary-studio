import {AuthData, MessageState, UserState} from "../../types/types";
import {SET_CURRENT_USER} from "../users/actionTypes";

export const LOAD_DATA = 'LOAD_DATA';
export const LOG_IN = 'LOG_IN';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SIGN_UP = 'SIGN_UP';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';
export const TOGGLE_EDIT_WINDOW = 'TOGGLE_EDIT_WINDOW';
export const UP_ARROW_TRIGGERED = 'UP_ARROW_TRIGGERED';

interface ToggleEditWindowAction {
    type: typeof TOGGLE_EDIT_WINDOW
    payload: MessageState
}

interface UpArrowTriggeredAction {
    type: typeof UP_ARROW_TRIGGERED
}

interface LoadDataAction {
    type: typeof LOAD_DATA
}

interface LoadDataActionSuccess {
    type: typeof LOAD_DATA_SUCCESS,
    payload: {
        messages: MessageState[],
        users: UserState[],
        currentUser: UserState
    }
}

interface LoadDataActionFailure {
    type: typeof LOAD_DATA_FAILURE
}

export interface LogInAction {
    type: typeof LOG_IN,
    payload: AuthData
}

export interface SignUpAction {
    type: typeof SIGN_UP,
    payload: AuthData
}

export interface SetCurrentUserAction {
    type: typeof SET_CURRENT_USER,
    payload: UserState
}

interface AuthSuccessAction {
    type: typeof AUTH_SUCCESS,
    payload: AuthData
}

export type GeneralActionTypes = ToggleEditWindowAction
    | LoadDataActionFailure | UpArrowTriggeredAction
    | LoadDataActionSuccess | LoadDataAction
    | LogInAction | AuthSuccessAction
    | SignUpAction | SetCurrentUserAction;
