import {MessageState} from "../../types/types";
import {DELETE_MESSAGE, EDIT_MESSAGE, LIKE_MESSAGE, MessagesActionTypes, SEND_MESSAGE} from "./actionTypes";

export const sendMessage = (ms: MessageState): MessagesActionTypes => ({
    type: SEND_MESSAGE,
    payload: ms
});

export const deleteMessage = (ms: MessageState): MessagesActionTypes => ({
    type: DELETE_MESSAGE,
    payload: {
        id: ms.id
    }
});

export const likeMessage = (ms: MessageState): MessagesActionTypes => ({
    type: LIKE_MESSAGE,
    payload: {
        id: ms.id
    }
});

export const editMessage = (ms: MessageState, body: string): MessagesActionTypes => ({
    type: EDIT_MESSAGE,
    payload: {
        id: ms.id,
        text: body
    }
});
