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
    "🧕🏼",
    "💂🏽‍♂️",
    "🧙🏼‍♂️",
    "👰🏻‍♂️",
    "👩🏼‍✈️",
    "🧝🏽‍♂️",
    "👨🏾‍🚒",
    "👩🏽‍🎓",
    "👩🏼‍🏭",
    "🧚🏽‍♂️",
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
  return sample(sN.map((f) => rst(f)).map((f) => randGender(f)));
};

export const Characters = ({ chars, setChars }) => {
  const updateChar = (index) => {
    const copy = chars.slice(0);
    copy[index] = randomCharacter();
    setChars(copy);
  };

  return (
    <div>
      <h2>The Characters</h2>
      <p>Click on each to choose the characters in the story.</p>
      <div className="d-flex">
        <div
          className="char card display-1 me-3 p-3 border-primary"
          onClick={updateChar.bind(this, 0)}
        >
          {chars[0]}
        </div>
        <div
          className="char card display-1 me-3 p-3 border-success"
          onClick={updateChar.bind(this, 1)}
        >
          {chars[1]}
        </div>
        <div
          className="char card display-1 me-3 p-3 border-secondary"
          onClick={updateChar.bind(this, 2)}
        >
          {chars[2]}
        </div>
      </div>
    </div>
  );
};
