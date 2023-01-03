import { useState } from "react";
import "animate.css";
const _ = require("lodash");

export const Moral = ({ moral, finalMoral }) => {
  const [message, setMessage] = useState(moral);

  const setMoral = (messageIndex, moralIndex) => {
    const copy = _.cloneDeep(message);
    copy[moralIndex].meanings.light = [
      copy[moralIndex].meanings.light.concat(copy[moralIndex].meanings.shadow)[
        messageIndex
      ],
    ];
    copy[moralIndex].meanings.shadow = [];
    setMessage(copy);
    finalMoral(moralIndex, copy[moralIndex].meanings.light[0]);
  };
  return (
    <div>
      <h2>The Meaning of the Scene</h2>
      <p>
        Select one item from each column. The scene will talk about how{" "}
        <b>column one</b> is related to <b>column two</b>.
      </p>
      <div className="row">
        {message.map((m, moralIndex) => {
          return (
            <div
              key={`list_${moralIndex}`}
              className="col animate__animated animate__zoomIn"
            >
              <ul className="list-group shadow">
                {m.meanings.light
                  .concat(m.meanings.shadow)
                  .map((message, messageIndex, arr) => {
                    return (
                      <li
                        key={`message_${messageIndex}_${moralIndex}`}
                        className="list-group-item"
                        onClick={setMoral.bind(this, messageIndex, moralIndex)}
                      >
                        {arr.length > 1 ? `${messageIndex + 1}:` : ""} {message}
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
