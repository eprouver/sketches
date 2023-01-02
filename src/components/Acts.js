import { useState } from "react";
import { places } from "../data/plots.js";
const _ = require("lodash");

export const Acts = ({ acts, plotLine, finalMoral, chars }) => {
  const [message, setMessage] = useState(acts);

  const nonHumanRelations = [
    "aquaintances",
    "friends",
    "colleagues",
    "enemies",
    "work friends",
    "students",
    "coworkers",
    "working together",
    "living together",
    "strangers",
  ];

  const humanRelations = [
    "aquaintances",
    "relatives",
    "married",
    "colleagues",
    "enemies",
    "exes",
    "family",
    "lovers",
    "work friends",
    "students",
    "coworkers",
    "working together",
    "living together",
    "on a first date",
    "divorced",
    "strangers",
    "friends",
  ];

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

  const getMessage = (index) => {
    return message[index].meanings[
      plotLine.orientations[index] ? "shadow" : "light"
    ];
  };

  const isChosen = () => {
    return (
      getMessage(0).length === 1 &&
      getMessage(1).length === 1 &&
      getMessage(2).length === 1
    );
  };

  const getEmotion = (index) => {
    const positive = [
      "happy",
      "excited",
      "surprised",
      "content",
      "relaxed",
      "enthusiastic",
    ];
    const negative = [
      "sad",
      "disgusted",
      "fearful",
      "aggressive",
      "mad",
      "bored",
      "nervous",
    ];
    return plotLine.orientations[index]
      ? negative[~~(Math.random() * negative.length)]
      : positive[~~(Math.random() * positive.length)];
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
      <div className="row mt-4">
        <div className="col">
          {isChosen() ? (
            <>
              <p>
                Write a new dialog with three characters ({chars[0]}, {chars[1]}
                , and {chars[2]}) that takes place in a{" "}
                {places[~~(Math.random() * places.length)]}.
              </p>
              <p>
                {chars[0]} and {chars[1]} are{" "}
                {
                  humanRelations[
                    Math.floor(Math.random() * humanRelations.length)
                  ]
                }
                . {chars[1]} and {chars[2]} are{" "}
                {
                  nonHumanRelations[
                    Math.floor(Math.random() * nonHumanRelations.length)
                  ]
                }
                .
              </p>
              <p>
                {chars[0]} is "
                <span className="text-success">{finalMoral[0]}</span>". When{" "}
                {chars[1]} asks about it, {chars[2]} says it is because{" "}
                {chars[0]} is "
                <span className="text-success">{getMessage(0)}</span>", so in
                the beginning {chars[0]} is {getEmotion(0)} and {chars[2]} is{" "}
                {getEmotion(2)}.
              </p>
              <p>
                This results in {chars[1]} talking about "
                <span className="text-success">{getMessage(1)}</span>".{" "}
                {chars[0]} responds while feeling {getEmotion(0)}.
              </p>
              <p>
                {chars[1]} is "
                <span className="text-success">{getMessage(2)}</span>", because{" "}
                {chars[Math.random() > 0.5 ? 0 : 1]} is: "
                <span className="text-success">{finalMoral[1]}</span>".
              </p>
              <p>
                {" "}
                In the end,
                {chars[1]} is {getEmotion(2)}, and {chars[0]} is more{" "}
                {getEmotion(2)}
              </p>
              <p>{chars[2]} provides context and comic relief</p>
            </>
          ) : null}

          <div className="d-flex">
            <textarea
              className="flex-grow-1 alert m-1 p-2 alert-primary"
              placeholder="Paste Dialog Here"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
