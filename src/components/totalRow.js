import React from "react";

const TotalRow = ({ total }) => {
    return (
        <div className="week grid total-row">
            <span className="rate">Total</span>
            <span className="hours">${total}.00</span>
        </div>
    )
}

export default TotalRow;
