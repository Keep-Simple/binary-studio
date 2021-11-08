import {UserState} from "../../types/types";
import {
    ADD_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    LOAD_USERS_SUCCESS,
    UserActionTypes
} from "./actionTypes";

export const usersReducer = (state: UserState[] = [] as UserState[], action: UserActionTypes): UserState[] => {
    switch (action.type) {
        case LOAD_USERS_SUCCESS:
            return action.payload;

        case DELETE_USER_SUCCESS:
            return state.filter(u => u.user_id !== action.payload.id);

        case EDIT_USER_SUCCESS:
            return state.map(u => u.user_id === action.payload.user_id ? action.payload : u);

        case ADD_USER_SUCCESS:
            return [...state, action.payload];

        default:
            return state;
    }
}
