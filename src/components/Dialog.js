import { useRef, useEffect } from "react";

export const Dialog = ({
  chars,
  diag,
  removeDialog,
  updateDiag,
  english,
  translate,
}) => {
  const myChar = useRef();
  const myText = useRef();
  const myEmotion = useRef();
  const myToki = useRef();

  const handleChange = () => {
    updateDiag(
      myChar.current.value,
      myText.current.value,
      myEmotion.current.value,
      myToki.current.value
    );
  };

  useEffect(() => {
    const scrollHeight = myText.current.scrollHeight;
    const scrollHeight2 = myToki.current.scrollHeight;
    myText.current.style.height = `${Math.max(
      scrollHeight,
      scrollHeight2,
      80
    )}px`;
    myToki.current.style.height = `${Math.max(
      scrollHeight,
      scrollHeight2,
      80
    )}px`;
  }, [diag, translate]);

  return (
    <div className={`d-flex m-3 animate__animated animate__fadeIn`}>
      <div>
        <select
          className={`form-select fs-1 alert alert-${
            ["primary", "warning", "danger"][
              chars.findIndex((c) => c.emoji === diag.char)
            ]
          } mb-0`}
          value={diag.char}
          ref={myChar}
          onChange={handleChange}
        >
          {chars.map((char, i) => {
            return (
              <option key={`char_${i}`} value={char.emoji}>
                {char.emoji}
              </option>
            );
          })}
          <option value="🖼️">🖼️</option>
        </select>
        <select
          className={`form-select mt-1 ${diag.char === "🖼️" ? "d-none" : ""}`}
          ref={myEmotion}
          value={diag.emotion}
          onChange={handleChange}
        >
          <option value="😐">😐</option>
          <option value="😃">😃</option>
          <option value="😢">😢</option>
          <option value="😨">😨</option>
          <option value="😡">😡</option>
          <option value="🤢">🤢</option>
          <option value="🥱">🥱</option>
          <option value="🤪">🤪</option>
          <option value="🤯">🤯</option>
          <option value="😬">😬</option>
          <option value="😍">😍</option>
          <option value="🤨">🤨</option>
          <option value="🥺">🥺</option>
          <option value="🤔">🤔</option>
          <option value="💭">💭</option>
        </select>
      </div>

      <textarea
        className={`flex-grow-1 alert p-2 alert-${
          ["primary", "warning", "danger"][
            chars.findIndex((c) => c.emoji === diag.char)
          ]
        } ${english ? "" : "d-none"}`}
        ref={myText}
        value={diag.text}
        onChange={handleChange}
      ></textarea>

      <textarea
        className={`flex-grow-1 alert p-2 alert-${
          ["primary", "warning", "danger"][
            chars.findIndex((c) => c.emoji === diag.char)
          ]
        } ${english ? "d-none" : ""}`}
        ref={myToki}
        value={diag.toki}
        placeholder="Rewrite the line using your own words."
        onChange={handleChange}
      ></textarea>

      <div>
        <button
          className="btn btn-lg p-0 ms-2"
          onClick={() => {
            removeDialog();
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
