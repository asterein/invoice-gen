import React, { useState, useEffect } from "react";
import './App.css';
import MonthBtn from "./components/monthBtn/monthBtn";
import WeekRow from "./components/weekRow";
import RateRow from "./components/rateRow";
import TotalRow from "./components/totalRow";
import InvoiceMetadata from "./components/invoiceMetadata";
import ContactBlock from "./components/contactBlock/contactBlock";
import AlertPopup from "./components/alertPopup/alertPopup";
import DataTemplate from "./components/template";

function App() {
  let totalHours = 0;
  const [ data, setData ] = useState(null);
  const [ month, setMonth ] = useState(null);
  const year = new Date().getFullYear();

  const [ rate, setRate ] = useState(null);
  const [ alert, setAlert ] = useState(null);

  const months = [1,2,3,4,5,6,7,8,9,10,11,12];

  const fileInput = React.useRef();
  const blob = new Blob([JSON.stringify(DataTemplate)]);
  const downloadTemplate = URL.createObjectURL(blob);

  function twoCharInt(num) {
      if (num < 10) {
          return "0" + num.toString();
      }
      return num;
  }

  function generateWeeks() {
      const end = new Date(year, month, 0);
      const periodEnd = end.getDate();
      const weeks = [];
      const days = [];
      for (let i=1; i<=periodEnd; i++) {
          let addDay = new Date(year, month-1, i);
          days.push(addDay);
      }

      let startDay = days[0].getDate();
      while (days.length > 0) {
          if (days[0].getDay() === 6) {
              let endDay = days[0].getDate();
              weeks.push(`${twoCharInt(month)}/${twoCharInt(startDay)}-${twoCharInt(month)}/${twoCharInt(endDay)}`);
              days.shift();
              if (days.length > 0) {
                  startDay = days[0].getDate();
              }
          } else if (days.length === 1) {
              let endDay = days[0].getDate();
              weeks.push(`${twoCharInt(month)}/${twoCharInt(startDay)}-${twoCharInt(month)}/${twoCharInt(endDay)}`);
              days.shift();
          } else {
              days.shift();
          }
      }

      return weeks;
  }

  useEffect(() => {
      if (data) {
          if (!data.hasOwnProperty("info") || !data.hasOwnProperty("invoice")) {
              setAlert("JSON file improperly formatted. Please re-upload and try again.");
              setData(null);
              fileInput.current.value = "";
          } else {
              try {
                  setRate(data.info.self.rate);
              } catch (e) {
                  setAlert("JSON file improperly formatted. Please re-upload and try again.");
                  setData(null);
                  fileInput.current.value = "";
              }
          }
      }
  }, [data]);

  return (
    <div className="app">
      <div className="no-print settings">
        <h1>Monthly Invoice Generator</h1>
        <div className="grid grid-3">
          <div className="grid">
              <div>
              <b>Upload your data file here.</b><br />
              <input
                className="file-input"
                type="file"
                accept=".json, .txt"
                ref={fileInput}
                onChange={(event) => {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onload = function(event) {
                    try {
                        setData(JSON.parse(event.target.result));
                    } catch (e) {
                        setAlert("This is not a JSON file. Please try again.");
                        fileInput.current.value = "";
                    }
                  };
                  reader.readAsText(file);
                }}
                disabled={data && rate}
              />
              Not sure how to format? <a
                href={downloadTemplate}
                rel="noreferrer"
                target="_blank"
                download="DataTemplate.json">Use this template!</a>
            </div>
            <button onClick={() => {
                setData(null);
                setMonth(null);
                setRate(null);
                fileInput.current.value = "";
            }}>Reset</button>
            {month && data && rate && (<button onClick={() => window.print()}>Print/Save</button>)}
          </div>
          <div className="month-container grid">
            <div className="month-container-header"><b>Pick a month ...</b></div>
              {months.map((m) => (
                  <MonthBtn
                    key={m}
                    value={m}
                    setActive={setMonth}
                    activeMonth={month}
                  />
              ))}
          </div>
        </div>
      </div>
      {month && data && rate && (
        <div className="invoice-container">
            <h1>Invoice</h1>
            <div className="grid invoice-header">
                <ContactBlock data={data.info} showCountry={false} />
                <InvoiceMetadata month={month} year={year} />
            </div>
            <div className="week grid week-header">
                <span className="term">Date/s</span>
                <span className="description">Description</span>
                <span className="hours">Hours</span>
            </div>
            {generateWeeks().map((week, index) => {
                let hours = index > (data.invoice.length - 1) ? 0 : data.invoice[index].hours;
                totalHours += hours;
                return (
                    <WeekRow
                      term={week}
                      key={index}
                      description={index > (data.invoice.length -1) ? "" : data.invoice[index].description}
                      hours={hours}
                    />
                )
            })}
            <RateRow rate={rate}/>
            <TotalRow total={totalHours * rate} />
            <div>
                Make checks payable to <b>{data.info.self.name}</b>.<br />
                Net 30 days.
                <h3>THANK YOU!</h3>
            </div>
        </div>
      )}
      {alert && (
          <AlertPopup message={alert} closeFn={setAlert} />
      )}
    </div>
  );
}

export default App;
