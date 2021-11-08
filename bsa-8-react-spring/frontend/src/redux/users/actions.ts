import {UserState} from "../../types/types";
import {ADD_USER, DELETE_USER, EDIT_USER, UserActionTypes} from "./actionTypes";

export const addUser = (us: UserState): UserActionTypes => ({
    type: ADD_USER,
    payload: us
});

export const deleteUser = (us: UserState): UserActionTypes => ({
    type: DELETE_USER,
    payload: {
        id: us.user_id
    }
});

export const editUser = (us: UserState): UserActionTypes => ({
    type: EDIT_USER,
    payload: us
});
