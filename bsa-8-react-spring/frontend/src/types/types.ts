export type AppState = {
    messages: MessageState[],
    editWindow: MessageState,
    users: UserState[],
    isLoading: boolean,
    currentUser: UserState
};

export interface MessageState {
    name: string;
    date: string;
    avatar: string;
    edit_date: string;
    id: string;
    text: string;
    user_id: string;
    liked: boolean;
}

export interface UserState {
    name: string;
    avatar: string;
    user_id: string;
    password: string;
    isAdmin: boolean;
}

export interface AuthData {
    name: string;
    password: string;
}
