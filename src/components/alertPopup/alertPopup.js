import React from "react";
import "./alertPopup.css";

const AlertPopup = ({ message, closeFn }) => {
    return (
        <div className="popup-shadow" onClick={() => closeFn(null)}>
            <div className="popup">
                {message}
            </div>
        </div>
    )
}

export default AlertPopup;
