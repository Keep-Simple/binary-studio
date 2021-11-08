import React, {FormEvent, useState} from 'react';
import {Button, Form, Icon, Segment} from 'semantic-ui-react';
import './styles.css';

type MessageInputProps = {
    addMs: any
}

const MessageInput = ({addMs}: MessageInputProps) => {
    const [body, setBody] = useState('');

    const handlePost = (e: KeyboardEvent | FormEvent) => {
        e.preventDefault();
        addMs(body);
        setBody('');
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

export default MessageInput;
