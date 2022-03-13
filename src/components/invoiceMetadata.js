import React from "react";

const InvoiceMetadata = ({ month, year }) => {
    const periodStart = "01";
    let end = new Date(year, month, 0);
    const periodEnd = end.getDate();
    const monthLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    function getInvoiceId() {
        return year.toString() + twoCharInt(month);
    }

    function twoCharInt(num) {
        if (num < 10) {
            return "0" + num.toString();
        }
        return num;
    }

    function parseMonth(m) {
        if (m > monthLabels.length) {
            return monthLabels[m - monthLabels.length -1]
        }
        return monthLabels[m-1];
    }

    return (
        <div className="grid metadata-grid">
            <span className="label">Date</span>
            <span>{`${month !== 12 ? year : year+1} ${parseMonth(month+1)} 01`}</span>
            <span className="label">Invoice #</span>
            <span>{getInvoiceId()}</span>
            <span className="label">Billing Period</span>
            <span className="period">
                {`${year} ${parseMonth(month)} ${periodStart}`}<br />
                {`- ${parseMonth(month)} ${periodEnd}`}
            </span>
            <span></span>
            <span></span>
            <span className="label reason">For</span>
            <span className="reason">Software engineering per contract agreement.</span>
        </div>
    )
}

export default InvoiceMetadata;
