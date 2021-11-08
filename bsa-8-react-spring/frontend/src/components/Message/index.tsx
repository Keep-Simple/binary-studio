import React, {useState} from 'react';
import {Comment, Confirm, Icon, Popup} from "semantic-ui-react";
import moment from "moment";
import './styles.css';
import {MessageState, UserState} from "../../types/types";

type MessageProps = {
    ms: MessageState,
    isLast: boolean,
    currentUser: UserState,
    likeMessage: Function,
    deleteMessage: Function,
    toggleEditWindow: Function
}

const Message = (props: MessageProps) => {

    const {ms, deleteMessage, toggleEditWindow, likeMessage, isLast, currentUser} = props;
    const [delOpen, setDelModel] = useState(false);

    return (
        <>{currentUser?.user_id === ms.user_id ?
            <Popup mouseLeaveDelay={600} position="right center" hoverable className="popupIcons"
                   trigger={
                       <Comment className="bubble mine">
                           <Comment.Content>
                               <Comment.Author as="a" className="author">{ms.name}</Comment.Author>
                               <Comment.Metadata>
                                   at {moment(new Date(ms.date)).format("LT")}
                               </Comment.Metadata>
                               <Comment.Text style={{marginTop: '7px'}}>
                                   {ms.text}
                               </Comment.Text>
                           </Comment.Content>
                       </Comment>}>
                <Popup.Content>
                    <Icon link name="recycle" onClick={() => setDelModel(true)}/>
                    {isLast && <Icon link name="edit outline" onClick={() => toggleEditWindow(ms)}/>}
                </Popup.Content>
            </Popup>
            :
            <Comment className="bubble">
                <Comment.Avatar className="avatar" src={ms.avatar}/>
                <Comment.Content>
                    <Comment.Author as="a" className="author">{ms.name}</Comment.Author>
                    <Comment.Metadata>
                        at {moment(new Date(ms.date)).format("LT")}
                    </Comment.Metadata>
                    <Comment.Text style={{marginTop: '7px'}}>
                        {ms.text}
                    </Comment.Text>
                    <Comment.Actions className="commonAction">
                        <Comment.Action onClick={() => likeMessage(ms)}>
                            <Icon color={ms.liked ? 'red' : 'grey'} name='like'/>
                        </Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        }
            <Confirm
                dimmer="blurring"
                className="deleteModal"
                confirmButton='Delete'
                content='Delete this message?'
                size='mini'
                open={delOpen}
                onCancel={() => setDelModel(false)}
                onConfirm={() => deleteMessage(ms)}
            />
        </>
    );
}

export default Message;
