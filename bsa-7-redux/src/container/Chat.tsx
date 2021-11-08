import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/Header/Header";
import MessageInput from "../components/MessageInput/MessageInput";
import MessageList from "../components/MessageList/MessageList";
import jsonData from "../mock/MOCK_DATA"
import {Dimmer, Loader} from "semantic-ui-react";
import moment from "moment";
import {createMessageFromAdmin} from "../mock/Admin";

const Chat = () => {
    const [store, setStore] = useState<AppState>([]);
    const [isLoading, setLoading] = useState(true);
    const endRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (endRef && endRef.current) {
            endRef.current.scrollIntoView({behavior: "smooth"});
        }
    }

    useEffect(scrollToBottom, [store.length]);

    useEffect(() => {
        setTimeout(() => {
            setStore(jsonData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
            setLoading(!isLoading);
        }, 200);
    }, []);

    const getHeaderState = (): HeaderState => ({
            userCount: new Set(store.map(i => i.name)).size,
            latestMessage: moment(new Date(store[store.length - 1]?.date)).format("HH:mm"),
            messageCount: store.length
        }
    );

    const addHandler = (body: string) => {
        setStore((data: AppState) => [...data, createMessageFromAdmin(body) as MessageState]);
    }

    return (
        <>
            {isLoading &&
            <Dimmer active>
              <Loader/>
            </Dimmer>}
            <Header data={getHeaderState()}/>
            <MessageList data={store} editData={setStore}/>
            <div ref={endRef}/>
            <MessageInput addMs={addHandler}/>
        </>
    );
}

export type AppState = MessageState[];

export interface MessageState {
    name: string;
    date: string;
    avatar: string;
    edit_date: string;
    id: string;
    text: string;
    user_id: string;
}


export interface HeaderState {
    userCount: number;
    latestMessage: string;
    messageCount: number;
}

export default Chat;
