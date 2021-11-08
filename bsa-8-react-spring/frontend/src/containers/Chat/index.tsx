import React, {useCallback, useEffect, useRef} from 'react';
import Header from "../../components/Header";
import MessageInput from "../../components/MessageInput";
import MessageList from "../../components/MessageList";
import {AppState} from "../../types/types";
import {connect, ConnectedProps} from "react-redux";
import EditWindow from "../../components/EditWindow";
import {loadData, toggleEditWindow, upArrowKeyTriggered} from "../../redux/general/actions";

const Chat = (props: ChatProps) => {

    const {messageCount, hasEditWindow, upArrow} = props;
    const endRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (endRef && endRef.current)
            endRef.current.scrollIntoView({behavior: "smooth"});
    }

    const handleKeyPress = useCallback(({key}: KeyboardEvent) =>
        key === "ArrowUp" && upArrow(), [upArrow]);

    useEffect(() => {
        setTimeout(() => scrollToBottom(), 50);
    }, [messageCount]);


    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        //remove on cleanup
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return (
        <>
            <Header/>
            <MessageList/>
            <div ref={endRef}/>
            <MessageInput/>
            {hasEditWindow && <EditWindow/>}
        </>
    );
}


const mapState = (state: AppState) => ({
    loading: state.isLoading,
    messageCount: state.messages.length,
    hasEditWindow: Boolean(state.editWindow.id)
});

const mapDispatch = {
    editWindow: toggleEditWindow,
    upArrow: upArrowKeyTriggered,
    init: loadData
}

const connector = connect(mapState, mapDispatch);

type ChatProps = ConnectedProps<typeof connector>;

export default connector(Chat);
