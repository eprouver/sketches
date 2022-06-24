import { useState } from "react";
const _ = require("lodash");

export const Moral = ({ moral }) => {
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
  };
  return (
    <div>
      <h2>The Moral</h2>
      <p>
        Select one item from each column. Tell a story about how{" "}
        <b>column one</b> is the same as <b>column two</b>.
      </p>
      <div className="row">
        {message.map((m, moralIndex) => {
          return (
            <ul key={`list_${moralIndex}`} className="list-group col">
              {m.meanings.light
                .concat(m.meanings.shadow)
                .map((message, messageIndex) => {
                  return (
                    <li
                      key={`message_${messageIndex}_${moralIndex}`}
                      className="list-group-item"
                      onClick={setMoral.bind(this, messageIndex, moralIndex)}
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
