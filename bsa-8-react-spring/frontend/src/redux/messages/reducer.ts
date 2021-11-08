import {MessageState} from "../../types/types";
import {
    DELETE_MESSAGE_SUCCESS,
    EDIT_MESSAGE_SUCCESS,
    LIKE_MESSAGE_SUCCESS,
    LOAD_MESSAGES_SUCCESS,
    MessagesActionTypes,
    SEND_MESSAGE_SUCCESS
} from "./actionTypes";


export const messagesReducer = (state: MessageState[] = [] as MessageState[], action: MessagesActionTypes): MessageState[] => {
    switch (action.type) {
        case SEND_MESSAGE_SUCCESS:
            return [...state, action.payload];

        case DELETE_MESSAGE_SUCCESS:
            return state.filter(m => m.id !== action.payload.id);

        case EDIT_MESSAGE_SUCCESS:
            return state.map(m => m.id === action.payload.id ?
                {...m, text: action.payload.text, edit_date: String(new Date())} : m);

        case LIKE_MESSAGE_SUCCESS:
            return state.map(m => m.id === action.payload.id ?
                m.liked ? {...m, liked: false} : {...m, liked: true} : m);

        case LOAD_MESSAGES_SUCCESS:
            return action.payload;

        default:
            return state;
    }
}

