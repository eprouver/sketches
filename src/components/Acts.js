import { useState } from "react";
const _ = require("lodash");

export const Acts = ({ acts, plotLine, finalMoral }) => {
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
      <p>
        Select a plot beat for each act to illustrate{" "}
        <span className="text-primary">{finalMoral[0]}</span> is just like{" "}
        <span className="text-primary">{finalMoral[1]}</span>
      </p>
      <div className="row">
        {message.map((m, plotIndex) => {
          return (
            <div key={`list_${plotIndex}`} className="col">
              <ul className="list-group">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
