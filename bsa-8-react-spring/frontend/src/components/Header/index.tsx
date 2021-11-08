import React from 'react';
import './styles.css';
import {AppState} from "../../types/types";
import {connect, ConnectedProps} from "react-redux";
import moment from "moment";

const Header = (props: HeaderProps) => {

    const {messageCount, userCount, latestMessage} = props;

    return (
        <div className="toolbar">
            <div className="left-items">
                {messageCount}&nbsp;<i className="comments icon"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {userCount}&nbsp;<i className="male icon"/>
            </div>
            <h1 className="toolbar-title">
                <i className="facebook messenger icon"/>
                Tweety
            </h1>
            <div className="right-items">
        <span>
        latest at {latestMessage.includes("Invalid") ? "" : latestMessage}
            &nbsp;
            <i className="clock icon"/>
        </span>
            </div>
        </div>
    );
}

const mapState = (state: AppState) => {
    const messages = state.messages;

    return {
        messageCount: messages.length,
        latestMessage: moment(new Date(messages[messages.length - 1]?.date)).format("HH:mm dddd"),
        userCount: state.users.length
    }
};

const connector = connect(mapState);

type HeaderProps = ConnectedProps<typeof connector>;

export default connector(Header);
