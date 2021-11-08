import {GeneralActionTypes, LOAD_DATA, LOAD_DATA_SUCCESS, TOGGLE_EDIT_WINDOW, UP_ARROW_TRIGGERED} from "./actionTypes";
import {AppState} from "../../types/types";
import {LOAD_USERS, SET_CURRENT_USER, UserActionTypes} from "../users/actionTypes";
import {LOAD_MESSAGES, MessagesActionTypes} from "../messages/actionTypes";
import {messagesReducer} from "../messages/reducer";
import {usersReducer} from "../users/reducer";

export const generalReducer = (intermediateState: AppState, action: GeneralActionTypes): AppState => {
    switch (action.type) {
        case LOAD_DATA_SUCCESS:
            return {
                ...intermediateState,
                messages: action.payload.messages,
                users: action.payload.users,
                currentUser: action.payload.currentUser,
                isLoading: false,
            }

        case SET_CURRENT_USER:
            return {
                ...intermediateState,
                currentUser: action.payload
            }

        case UP_ARROW_TRIGGERED: {
            const message = intermediateState.messages.slice(-1)[0];

            if (message.user_id === intermediateState.currentUser.user_id && !intermediateState.editWindow.id)
                return {
                    ...intermediateState,
                    editWindow: message
                };

            return intermediateState;
        }

        case TOGGLE_EDIT_WINDOW:
            return {
                ...intermediateState,
                editWindow: action.payload
            };

        case LOAD_DATA || LOAD_USERS || LOAD_MESSAGES:
            return {
                ...intermediateState,
                isLoading: true
            }

        default:
            return intermediateState;
    }
}

export const rootReducer = (state: AppState = {} as AppState, action: GeneralActionTypes & MessagesActionTypes & UserActionTypes): AppState => {
    const intermediateState = {
        messages: messagesReducer(state.messages, action),
        users: usersReducer(state.users, action)
    }

    return generalReducer({
        ...intermediateState,
        editWindow: state.editWindow,
        isLoading: state.isLoading,
        currentUser: state.currentUser
    }, action);
}
