import {UserState} from "../../types/types";

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER = 'DELETE_USER';
export const EDIT_USER = 'EDIT_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';

interface LoadUsersAction {
    type: typeof LOAD_USERS
}

interface LoadUsersSuccessAction {
    type: typeof LOAD_USERS_SUCCESS,
    payload: UserState[]
}

interface LoadUsersFailureAction {
    type: typeof LOAD_USERS_FAILURE
}

export interface EditUserAction {
    type: typeof EDIT_USER,
    payload: UserState
}

interface EditUserSuccessAction {
    type: typeof EDIT_USER_SUCCESS,
    payload: UserState
}

export interface AddUserAction {
    type: typeof ADD_USER,
    payload: UserState
}

interface AddUserSuccessAction {
    type: typeof ADD_USER_SUCCESS,
    payload: UserState
}

export interface DeleteUserAction {
    type: typeof DELETE_USER,
    payload: { id: string }
}

export interface DeleteUserSuccessAction {
    type: typeof DELETE_USER_SUCCESS,
    payload: { id: string }
}


export type UserActionTypes =
    | LoadUsersAction | LoadUsersFailureAction
    | LoadUsersSuccessAction | DeleteUserAction
    | EditUserAction | AddUserAction
    | DeleteUserSuccessAction | AddUserSuccessAction
    | EditUserSuccessAction;
