import React, {useState} from 'react';
import {Comment, Confirm, Icon, Input} from "semantic-ui-react";
import moment from "moment";
import './styles.css';
import admin from '../../mock/Admin';
import {MessageState} from "../../container/Chat";

type MessageProps = {
    ms: MessageState,
    editMs: (ms: MessageState, body: string) => void,
    deleteMs: (ms: MessageState) => void
}

const Message = ({ms, deleteMs, editMs}: MessageProps) => {

    const [isEdited, setEdit] = useState(false);
    const [body, setBody] = useState(ms?.text);
    const [isLiked, setLiked] = useState(false);
    const [delOpen, setDelModel] = useState(false);
    const isAdmin = ms.user_id === admin.user_id;

    const editHandler = () => {
        if (isEdited && !!body) {
            editMs(ms, body);
        }
        setEdit(!isEdited);
    }

    const likeHandler = () => {
        setLiked(!isLiked);
    }

    const actions = () => {
        if (isEdited) return;

        if (isAdmin) {
            return (
                <Comment.Actions style={{marginTop: '2.5%'}}>
                    <Comment.Action onClick={() => setDelModel(true)}>Delete</Comment.Action>
                    <Comment.Action onClick={editHandler}>Edit</Comment.Action>
                </Comment.Actions>);
        }

        return (
            <Comment.Actions>
                <Comment.Action onClick={likeHandler} style={{userSelect: 'none', marginLeft: '96%'}}>
                    <Icon color={isLiked ? 'red' : 'grey'} name='like'/>
                </Comment.Action>
            </Comment.Actions>
        );
    }

    const editField = () => (
        <Input fluid autoFocus error={!body} style={{marginBottom: '1rem'}}
               icon={body ?
                   <i onClick={editHandler} className="send link icon"/>
                   :
                   <i className="icon dont"/>}
               value={body}
               onChange={e => setBody(e.target.value)}/>
    );

    return (
        <Comment className={isAdmin ? "bubble mine" : "bubble"}>
            {!isAdmin && <Comment.Avatar className="avatar" src={ms.avatar}/>}
            <Comment.Content>
                <Comment.Author as="a" className="author">{ms.name}</Comment.Author>
                <Comment.Metadata>
                    at {moment(new Date(ms.date)).format("LT")}
                </Comment.Metadata>
                <Comment.Text style={{marginTop: '10px'}}>
                    {isEdited ? editField() : ms.text}
                </Comment.Text>
                {actions()}
            </Comment.Content>
            <Confirm
                className="deleteModal"
                confirmButton='Delete'
                content='Delete this message?'
                size='mini'
                open={delOpen}
                onCancel={() => setDelModel(false)}
                onConfirm={() => deleteMs(ms)}
            />
        </Comment>
    );
}

export default Message;
