import { useState, useRef, useEffect } from "react";
import { humanRelations, nonHumanRelations } from "../data/plots.js";

export const Script = ({
  acts,
  plotLine,
  finalMoral,
  chars,
  setFrames,
  places,
}) => {
  const [prompt, setPrompt] = useState("");
  const [script] = useState("");
  const prompter = useRef(null);
  const copier = useRef(null);

  const getMessage = (index) => {
    return acts[index].meanings[
      plotLine.orientations[index] ? "shadow" : "light"
    ];
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

  useEffect(() => {
    // Actual Action will need to escaape double quotes.
    //.replace(/\"/g, '\\"')
    setPrompt(prompter?.current?.innerText || "");
  }, [acts, chars]);

  const isChosen = () => {
    return (
      getMessage(0).length === 1 &&
      getMessage(1).length === 1 &&
      getMessage(2).length === 1
    );
  };

  const parseScript = (text = "") => {
    if (text.length === 0) return;
    const newFrames = [];
    const newLines = [];
    text.target.value
      .split("\n")
      .map((line) => line.split(":"))
      .filter((line) => line.length === 2)
      .forEach((line) => {
        newLines.push({
          char: line[0].replace(/\([^()]*\)/g, "").trim(),
          text: line[1].replace(/\([^()]*\)/g, "").trim() || "(Does Something)",
          toki: "",
        });
      });

    const chunkSize = 2;
    for (let i = 0; i < newLines.length; i += chunkSize) {
      const diag = newLines.slice(i, i + chunkSize);
      newFrames.push({
        diag,
      });
    }
    setFrames(newFrames);
  };

  function copyText() {
    window.navigator.clipboard.writeText(prompt).then(
      function () {
        window.open("https://chat.openai.com/chat");
      },
      function (err) {
        window.alert("Async: Could not copy text: ", err);
      }
    );
  }

  return (
    <div className="row mt-4">
      {isChosen() ? (
        <div id="readable-prompt" ref={prompter} className="d-none">
          <p>
            Write a short dialog that has three characters ({chars[0].emoji},{" "}
            {chars[1].emoji}, and {chars[2].emoji}). The setting is in a{" "}
            {places[0]}. Write any italic text is in parenthesis. Use plain
            English.{" "}
          </p>
          <p>
            {chars[0].emoji} and {chars[1].emoji} are{" "}
            {humanRelations[Math.floor(Math.random() * humanRelations.length)]}.{" "}
            {chars[1].emoji} and {chars[2].emoji} are{" "}
            {
              nonHumanRelations[
                Math.floor(Math.random() * nonHumanRelations.length)
              ]
            }
            .
          </p>
          <p>
            {chars[0].emoji} is "
            <span className="text-success">{finalMoral[0]}</span>
            ". When {chars[1].emoji} asks about it, {chars[2].emoji} says it is
            because {chars[0].emoji} is "
            <span className="text-success">{getMessage(0)}</span>
            ", so in the beginning {chars[0].emoji} is {getEmotion(0)} and{" "}
            {chars[2].emoji} is {getEmotion(2)}.
          </p>
          <p>
            {chars[2].emoji} provides context with a story about what{" "}
            {chars[0].emoji} did at the {places[1]} where they failed at "
            <span className="text-success">{finalMoral[0]}</span>
            ".
          </p>
          <p>
            This results in {chars[1].emoji} talking about "
            <span className="text-success">{getMessage(1)}</span>".{" "}
            {chars[0].emoji} responds while feeling {getEmotion(0)}.
          </p>
          <p>
            {chars[1].emoji} is "
            <span className="text-success">{getMessage(2)}</span>
            ", because {chars[Math.random() > 0.5 ? 0 : 1].emoji} is: "
            <span className="text-success">{finalMoral[1]}</span>".
          </p>
          <p>
            {" "}
            In the end,
            {chars[1].emoji} is {getEmotion(2)}, and {chars[0].emoji} is more{" "}
            {getEmotion(2)}
          </p>
          <p>{chars[2].emoji} makes a funny comment.</p>
        </div>
      ) : null}

      <h2>Dialog Prompt</h2>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 alert m-1 p-2 alert-secondary text-muted d-none">
          {prompt}
        </div>
        <a
          className="btn btn-link"
          target="_BLANK"
          onClick={() => {
            copyText();
          }}
        >
          Generate Dialog
        </a>

        <textarea
          ref={copier}
          placeholder="Paste the generated text here"
          className="flex-grow-1 alert m-1 p-2 alert-primary"
          value={script}
          onChange={(e) => parseScript(e)}
        ></textarea>
      </div>
    </div>
  );
};
