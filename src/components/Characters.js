import { humanCharacters, nonHumanCharacters } from "../data/plots.js";
import { useState } from "react";

const randomCharacter = () => {
  const sN = [
    "🧟‍♂️",
    "🦹🏽‍♂️",
    "🦸🏽‍♂️",
    "🧛🏽‍♂️",
    "👷🏻‍♂️",
    "👨🏽‍🎨",
    "👨🏿‍💼",
    "👨🏻‍🔧",
    "👨🏾‍⚕️",
    "👨🏼‍🌾",
    "👨🏽‍⚖️",
    "👨🏾‍🔬",
    "👨🏼‍🎤",
    "👨🏽‍🚀",
    "👮🏽‍♂️",
    "👩🏽‍🍳",
    "💂🏽‍♂️",
    "🧙🏼‍♂️",
    "👰🏻‍♂️",
    "👩🏼‍✈️",
    "🧝🏽‍♂️",
    "👨🏾‍🚒",
    "👩🏽‍🎓",
    "👩🏼‍🏭",
    "🕵🏻‍♂️",
  ];

  const sample = (arr) => {
    const len = arr == null ? 0 : arr.length;
    return len ? arr[Math.floor(Math.random() * len)] : undefined;
  };

  const stMod = [
    "\u{1f3fb}",
    "\u{1f3fc}",
    "\u{1f3fd}",
    "\u{1f3fe}",
    "\u{1f3ff}",
  ];
  const gMod = ["👩", "👨"];
  const gMod2 = ["♂️", "♀️"];
  const fsn = new RegExp("\ud83c[\udffb-\udfff]", "g");
  const fg = new RegExp(gMod.join("|"), "g");
  const fg2 = new RegExp(gMod2.join("|"), "g");
  const rst = (string) => string.replace(fsn, sample(stMod));
  const randGender = (string) =>
    string.replace(fg, sample(gMod)).replace(fg2, sample(gMod2));
  const newChar = structuredClone(
    humanCharacters[~~(Math.random() * humanCharacters.length)]
  );
  newChar.emoji = randGender(rst(newChar.emoji));
  return newChar;
};

export const Characters = ({ chars, setChars }) => {
  const updateChar = (index) => {
    const copy = chars.slice(0);
    copy[index] = randomCharacter();
    setChars(copy);
  };

  const updateNonHumanChar = (index) => {
    const copy = chars.slice(0);
    copy[index] =
      nonHumanCharacters[~~(Math.random() * nonHumanCharacters.length)];
    setChars(copy);
  };

  return (
    <div>
      <h2>The Characters</h2>
      <p>Click on each square to reveal a character for the sketch.</p>
      <div className="d-flex text-center justify-content-around">
        <div className="me-3">
          <div
            className="char card display-1 p-3 border-info border-2 shadow"
            onClick={updateChar.bind(this, 0)}
          >
            {chars[0].emoji}
          </div>
          <div
            className={`text-muted fw-bold bg-light p-2 rounded animate__animated animate__slideInDown ${
              chars[0].name ? "" : "d-none"
            }`}
          >
            {chars[0].name}
          </div>
        </div>
        <div className="me-3">
          <div
            className="char card display-1 p-3 border-info border-2 shadow"
            onClick={updateChar.bind(this, 1)}
          >
            {chars[1].emoji}
          </div>
          <div
            className={`text-muted fw-bold bg-light p-2 rounded animate__animated animate__slideInDown ${
              chars[1].name ? "" : "d-none"
            }`}
          >
            {chars[1].name}
          </div>
        </div>
        <div className="me-3">
          <div
            className="char card display-1 p-3 border-info border-2 shadow"
            onClick={updateNonHumanChar.bind(this, 2)}
          >
            {chars[2].emoji}
          </div>
          <div
            className={`text-muted fw-bold bg-light p-2 rounded animate__animated animate__slideInDown ${
              chars[2].name ? "" : "d-none"
            }`}
          >
            {chars[2].name}
          </div>
        </div>
      </div>
    </div>
  );
};
