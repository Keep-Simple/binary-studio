import React, {FormEvent, useState} from 'react';
import {Button, Form, Icon, Segment} from 'semantic-ui-react';
import './styles.css';
import {connect, ConnectedProps} from "react-redux";
import {sendMessage} from "../../redux/messages/actions";
import {AppState, MessageState} from "../../types/types";

const MessageInput = (props: MessageInputProps) => {
    const [body, setBody] = useState('');

    const {send, currentUser} = props;

    const handlePost = (e: KeyboardEvent | FormEvent) => {
        if (body.trim()) {
            e.preventDefault();
            const message = {text: body, user_id: currentUser.user_id};
            send(message as MessageState);
            setBody('');
        }
    };

    return (
        <Segment clearing className="editSegment">
            <Form onSubmit={handlePost}>
                <Form.TextArea
                    onKeyPress={(e: KeyboardEvent) => e.key === "Enter" && !e.shiftKey && handlePost(e)}
                    autoFocus
                    className="textArea"
                    value={body}
                    placeholder="What's happening?"
                    onChange={(ev: FormEvent) => setBody((ev.target as HTMLTextAreaElement).value)}
                />
                <Button
                    disabled={!body.length}
                    className="inputButton"
                    floated="right"
                    type="submit"
                    size="big"
                    animated="vertical"
                >
                    <Button.Content visible><b>Send</b></Button.Content>
                    <Button.Content hidden><Icon name="arrow up"/></Button.Content>
                </Button>
            </Form>
        </Segment>
    );
};

const mapDispatch = {
    send: sendMessage
}

const mapState = (state: AppState) => ({
    currentUser: state.currentUser
})

const connector = connect(mapState, mapDispatch);

type MessageInputProps = ConnectedProps<typeof connector>;

export default connector(MessageInput);
