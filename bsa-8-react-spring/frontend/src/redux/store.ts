import {applyMiddleware, createStore,} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from "./general/rootReducer";
import createSagaMiddleware from "redux-saga";
import {MessageState, UserState} from "../types/types";
import rootSaga from "./rootSaga";

export default function configureStore() {
    const saga = createSagaMiddleware();
    const composedEnhancers = composeWithDevTools(applyMiddleware(saga));

    const initialState = {
        messages: [],
        editWindow: {} as MessageState,
        users: [],
        isLoading: false,
        currentUser: {} as UserState
    }

    const store = createStore(
        rootReducer,
        initialState,
        composedEnhancers
    );

    saga.run(rootSaga);

    return store;
}


