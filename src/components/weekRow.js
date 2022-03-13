import React from "react";

const WeekRow = ({ term, description, hours }) => {
    return (
        <div className="week grid">
            <span className="term">{term}</span>
            <span className="description">{description}</span>
            <span className="hours">{hours}</span>
        </div>
    )
}

export default WeekRow;
