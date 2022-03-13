import React from "react";
import "./contactBlock.css";

const ContactBlock = ({ data, showCountry }) => {
    return (
        <div className="contact-block">
            <div>
                <b>{data.self.name}</b><br />
                {data.self.street}<br />
                {data.self.city}, {data.self.state} {data.self.zip}<br />
                {showCountry ? <span>{data.self.country}<br /></span> : ""}
                {data.self.phone}<br /><br />
            </div>
            <div>
                <b>Bill To</b><br />
                {data.employer.name}<br />
                {data.employer.street}<br />
                {data.employer.city}, {data.employer.state} {data.employer.zip}<br />
                {showCountry ? <span>{data.self.country}<br /></span> : ""}
            </div>
        </div>
    )
}

export default ContactBlock;
