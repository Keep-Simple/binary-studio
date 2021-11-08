import React from 'react';
import {Comment} from "semantic-ui-react";
import moment from "moment";
import './styles.css';
import Message from "../Message";
import {AppState, MessageState} from "../../types/types";
import {connect, ConnectedProps} from "react-redux";
import {deleteMessage, likeMessage} from "../../redux/messages/actions";
import {toggleEditWindow} from "../../redux/general/actions";

const MessageList = (props: MessageListProps) => {

    const {messages, likeMs, deleteMs, toggleEdit, currentUser} = props;
    let prevDate: Date;


    const insertDividerIfNeeded = (ms: MessageState) => {
        const mountDate = new Date(ms.date);

        if (prevDate?.getDay() !== mountDate.getDay()) {
            prevDate = mountDate;
            return (
                <div className="timestamp">
                    {moment(mountDate).format('dddd-MMMM-YYYY')}
                </div>
            );
        }
        prevDate = mountDate;
    }

    const lastOwnMessage = (messages.length > 0)
        ? messages.filter(m => m.user_id === currentUser?.user_id).slice(-1)[0]
        : {};

    return (
        <Comment.Group size="large" className="commentContainer">
            {props.messages.map(ms => (
                <span key={ms.id}>
                {insertDividerIfNeeded(ms)}
                    <Message
                        ms={ms}
                        isLast={ms === lastOwnMessage}
                        likeMessage={likeMs}
                        deleteMessage={deleteMs}
                        toggleEditWindow={toggleEdit}
                        currentUser={currentUser}
                    />
                </span>))}
        </Comment.Group>

    );
}

const mapState = (state: AppState) => ({
    messages: state.messages,
    currentUser: state.currentUser
});

const mapDispatch = {
    likeMs: likeMessage,
    deleteMs: deleteMessage,
    toggleEdit: toggleEditWindow
}

const connector = connect(mapState, mapDispatch);

type MessageListProps = ConnectedProps<typeof connector>;

export default connector(MessageList);
