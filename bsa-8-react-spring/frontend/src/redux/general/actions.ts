import {GeneralActionTypes, LOAD_DATA, LOG_IN, SIGN_UP, TOGGLE_EDIT_WINDOW, UP_ARROW_TRIGGERED} from "./actionTypes";
import {AuthData, MessageState, UserState} from "../../types/types";
import {SET_CURRENT_USER} from "../users/actionTypes";

export const loadData = (): GeneralActionTypes => ({type: LOAD_DATA});

export const toggleEditWindow = (ms: MessageState): GeneralActionTypes => ({
    type: TOGGLE_EDIT_WINDOW,
    payload: ms
});

export const upArrowKeyTriggered = (): GeneralActionTypes => ({
    type: UP_ARROW_TRIGGERED
});

export const login = (data: AuthData): GeneralActionTypes => ({type: LOG_IN, payload: data})

export const register = (data: AuthData): GeneralActionTypes => ({type: SIGN_UP, payload: data})

export const setUser = (data: UserState): GeneralActionTypes => ({type: SET_CURRENT_USER, payload: data})
