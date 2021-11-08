import {MessageState} from "../../types/types";

export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
export const LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const EDIT_MESSAGE_SUCCESS = 'EDIT_MESSAGE_SUCCESS';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const LIKE_MESSAGE = 'LIKE_MESSAGE';
export const LIKE_MESSAGE_SUCCESS = 'LIKE_MESSAGE_SUCCESS';

export interface SendMessageAction {
    type: typeof SEND_MESSAGE,
    payload: MessageState
}

export interface SendMessageSuccessAction {
    type: typeof SEND_MESSAGE_SUCCESS,
    payload: MessageState
}

export interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE,
    payload: {
        id: string
    }
}

interface DeleteMessageSuccessAction {
    type: typeof DELETE_MESSAGE_SUCCESS,
    payload: {
        id: string
    }
}

export interface EditMessageAction {
    type: typeof EDIT_MESSAGE,
    payload: {
        id: string,
        text: string
    }
}

interface EditMessageSuccessAction {
    type: typeof EDIT_MESSAGE_SUCCESS
    payload: {
        id: string,
        text: string
    }
}

export interface LikeMessageAction {
    type: typeof LIKE_MESSAGE,
    payload: { id: string }
}

interface LikeMessageSuccessAction {
    type: typeof LIKE_MESSAGE_SUCCESS,
    payload: { id: string }
}

interface LoadMessagesAction {
    type: typeof LOAD_MESSAGES
}

interface LoadMessagesSuccessAction {
    type: typeof LOAD_MESSAGES_SUCCESS,
    payload: MessageState[]
}

interface LoadMessagesFailureAction {
    type: typeof LOAD_MESSAGES_FAILURE
}

export type MessagesActionTypes =
    | SendMessageAction | DeleteMessageAction
    | EditMessageAction | LikeMessageAction
    | LoadMessagesAction | LoadMessagesFailureAction
    | LoadMessagesSuccessAction | SendMessageSuccessAction
    | LikeMessageSuccessAction | DeleteMessageSuccessAction
    | EditMessageSuccessAction;
