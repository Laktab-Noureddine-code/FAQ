import { useState } from "react";
import data from "./data.js";
import "./style.css";
export default function Faq() {
  const [isSelected, setIsSelected] = useState(null);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);
  function handleSingleSelection(dataItemId) {
    setIsSelected(dataItemId === isSelected ? null : dataItemId);
  }
  function handleMultipleSelection(dataItemId) {
    let copyMultiple = [...multiple];
    const indexOfItem = copyMultiple.indexOf(dataItemId);
    indexOfItem === -1
      ? copyMultiple.push(dataItemId)
      : copyMultiple.splice(indexOfItem, 1);
    setMultiple(copyMultiple);
  }
  function handleMultiple() {
    if (multipleSelection) {
      setMultipleSelection(!multipleSelection);
      setMultiple([]);
      setIsSelected(null);
    } else {
      setMultipleSelection(!multipleSelection);
    }
  }

  return (
    <div className="wrapper">
      <div className="title">
        <h1>Frequently Asked Questions</h1>
        <h3>
          Find quick answers to common questions, Contact us for further
          assistance
        </h3>
      </div>
      <div className="enableButton">
        <button
          style={
            multipleSelection
              ? { backgroundColor: "#004089" }
              : { backgroundColor: "#0077ff" }
          }
          onClick={() => {
            handleMultiple();
          }}
        >
          Enable Multiple Selection
        </button>
      </div>
      <div className="faq">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            return (
              <div className="item" key={dataItem.id}>
                <h4
                  className="question"
                  onClick={() => {
                    multipleSelection
                      ? handleMultipleSelection(dataItem.id)
                      : handleSingleSelection(dataItem.id);
                  }}
                >
                  {dataItem.question}
                  {dataItem.id === isSelected ||
                  multiple.indexOf(dataItem.id) !== -1 ? (
                    <i className="ri-indeterminate-circle-line "></i>
                  ) : (
                    <i className="ri-add-circle-line"></i>
                  )}
                </h4>
                <div className="answer">
                  {dataItem.id === isSelected ||
                  multiple.indexOf(dataItem.id) !== -1
                    ? dataItem.answer
                    : null}
                </div>
              </div>
            );
          })
        ) : (
          <div>there is no data</div>
        )}
      </div>
    </div>
  );
}
