import React from 'react';
import './styles.css';
import {HeaderState} from "../../container/Chat";

type HeaderProps = {
    data: HeaderState
}

const Header = ({data}: HeaderProps) => {

    return (
        <div className="toolbar">
            <div className="left-items">
                {data.messageCount}&nbsp;<i className="comments icon"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {data.userCount}&nbsp;<i className="male icon"/>
            </div>
            <h1 className="toolbar-title">
                <i className="facebook messenger icon"/>
                Tweety
            </h1>
            <div className="right-items">
        <span>
        latest at {data.latestMessage}
            &nbsp;
            <i className="clock icon"/>
        </span>
            </div>
        </div>
    );
}

export default Header;
