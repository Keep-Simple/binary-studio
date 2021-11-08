import React, {Dispatch} from 'react';
import {Comment} from "semantic-ui-react";
import moment from "moment";
import './styles.css';
import {AppState, MessageState} from "../../container/Chat";
import Message from "../Message/Message";

type MessageListProps = {
    data: AppState,
    editData: Dispatch<AppState>
}

const MessageList = ({data, editData}: MessageListProps) => {

    const deleteHandler = (ms: MessageState) => {
        editData(data.filter(i => i.id !== ms.id));
    }

    const editHandler = (ms: MessageState, body: string) => {
        editData(data.map(i => i.id === ms.id ? {...i, text: body, edit_data: String(new Date())} : i));
    }

    let prevDate: Date;

    const insertDividerIfNeeded = (ms: MessageState) => {
        const mountDate = new Date(ms.date);

        if (prevDate?.getDay() !== mountDate.getDay()) {
            prevDate = mountDate;
            return (
                <div className="timestamp">
                    {moment(mountDate).format('LLLL')}
                </div>
            );
        }
        prevDate = mountDate;
    }

    return (
        <Comment.Group size="large" style={{margin: '0 auto'}}>
            {data.map(ms => (
                <span key={ms.id}>
                {insertDividerIfNeeded(ms)}
                    <Message ms={ms} editMs={editHandler} deleteMs={deleteHandler}/>
                </span>))}
        </Comment.Group>

    );
}

export default MessageList;
