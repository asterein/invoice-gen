import React from "react";
import "./monthBtn.css";

const MonthBtn = ({ value, setActive, activeMonth }) => {
    return (
        <span className={activeMonth === value ? "month-btn active-month" : "month-btn"} onClick={() => setActive(value)}>
            {value < 10 ? `0${value}` : value}
        </span>
    )
}

export default MonthBtn;
