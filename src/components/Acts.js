import { useState } from "react";
const _ = require("lodash");

export const Acts = ({ acts, plotLine }) => {
  const [message, setMessage] = useState(acts);

  const setAct = (messageIndex, plotIndex) => {
    const copy = _.cloneDeep(message);
    copy[plotIndex].meanings[
      plotLine.orientations[plotIndex] ? "shadow" : "light"
    ] = [
      copy[plotIndex].meanings[
        plotLine.orientations[plotIndex] ? "shadow" : "light"
      ][messageIndex],
    ];
    setMessage(copy);
  };
  return (
    <div>
      <h2>Acts</h2>
      <p>Select a plot beat for each act.</p>
      <div className="row">
        {message.map((m, plotIndex) => {
          return (
            <ul key={`list_${plotIndex}`} className="list-group col">
              {m.meanings[
                plotLine.orientations[plotIndex] ? "shadow" : "light"
              ].map((message, messageIndex) => {
                return (
                  <li
                    key={`message_${messageIndex}_${plotIndex}`}
                    className="list-group-item"
                    onClick={setAct.bind(this, messageIndex, plotIndex)}
                  >
                    {message}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};
