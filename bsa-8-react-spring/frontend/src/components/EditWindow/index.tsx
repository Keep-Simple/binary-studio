import React, {useState} from 'react';
import {Button, Form, Icon, Modal} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import {AppState, MessageState} from "../../types/types";
import {editMessage} from "../../redux/messages/actions";
import {connect, ConnectedProps} from "react-redux";
import "./styles.css";
import {toggleEditWindow} from "../../redux/general/actions";

const EditWindow = ({ms, close, edit}: EditWindowProps) => {
    const [body, setBody] = useState(ms.text);

    return (
        <Modal
            className="mainContainer"
            centered
            dimmer="blurring"
            open
            onClose={() => close({} as MessageState)}
        >
            <Modal.Header>
                Edit your Message
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <TextareaAutosize
                        style={{border: 'none', fontSize: 'medium'}}
                        value={body}
                        onChange={(ev: { target: { value: any; }; }) => setBody(ev.target.value)}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button.Group floated="left">
                    <Button
                        className="button"
                        animated="fade"
                        size="medium"
                        disabled={!body.length}
                        onClick={() => setBody('')}
                    >
                        <Button.Content visible>Clear</Button.Content>
                        <Button.Content hidden>field</Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button
                        className="button"
                        animated="fade"
                        inverted
                        color="blue"
                        disabled={ms.text === body}
                        onClick={() => setBody(ms.text)}
                    >
                        <Button.Content visible>Restore</Button.Content>
                        <Button.Content hidden>original</Button.Content>
                    </Button>
                </Button.Group>
                <Button
                    className="submit button"
                    disabled={ms.text === body || !body.length}
                    onClick={() => {
                        edit(ms, body);
                        close({} as MessageState)
                    }}
                    type="submit"
                    animated
                    size="big"
                >
                    <Button.Content visible>Submit</Button.Content>
                    <Button.Content hidden><Icon name="arrow right"/></Button.Content>
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

const mapState = (state: AppState) => ({
    ms: state.editWindow
});

const mapDispatch = {
    close: toggleEditWindow,
    edit: editMessage
}

const connector = connect(mapState, mapDispatch);

type EditWindowProps = ConnectedProps<typeof connector>;

export default connector(EditWindow);
