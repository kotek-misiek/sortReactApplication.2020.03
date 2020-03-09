import React from 'react';
import waitIcon from "./../../assets/img/wait.gif";

const WaitButton = ({onClick, disabled, wait, text}) => (
    <button style={{position: 'relative'}} onClick={onClick} disabled={disabled}>
        { text }
        {
            wait &&
            <img src={waitIcon} style={{
                position: "absolute",
                top: "50%",
                right: "0",
                transform: "translateY(-50%)",
                height: 30,
                width: 30
            }} alt="Wait a bit, please..." />
        }
    </button>
);

export default WaitButton;