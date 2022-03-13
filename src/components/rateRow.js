import React from "react";

const RateRow = ({ rate }) => {
    return (
        <div className="week grid rate-row">
            <span className="rate">Rate</span>
            <span className="hours">${rate}.00/Hr</span>
        </div>
    )
}

export default RateRow;
