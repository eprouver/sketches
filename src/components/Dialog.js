import { useRef } from "react";

export const Dialog = ({ chars, diag, removeDialog, updateDiag }) => {
  const myChar = useRef();
  const myText = useRef();
  const myEmotion = useRef();

  const handleChange = () => {
    updateDiag(
      myChar.current.value,
      myText.current.value,
      myEmotion.current.value
    );
  };

  return (
    <div className="d-flex m-3">
      <div>
        <select
          className="form-select"
          value={diag.char}
          ref={myChar}
          onChange={handleChange}
        >
          {chars.map((char, i) => {
            return (
              <option key={`char_${i}`} value={char}>
                {char}
              </option>
            );
          })}
          <option value="🖼️">🖼️</option>
        </select>
        <select
          className={`form-select ${diag.char === "🖼️" ? "d-none" : ""}`}
          ref={myEmotion}
          value={diag.emotion}
          onChange={handleChange}
        >
          <option value="😐">😐</option>
          <option value="😃">😃</option>
          <option value="😭">😭</option>
          <option value="😨">😨</option>
          <option value="😡">😡</option>
          <option value="🤮">🤮</option>
          <option value="🥱">🥱</option>
          <option value="😡">😡</option>
          <option value="🤪">🤪</option>
          <option value="🤯">🤯</option>
          <option value="😍">😍</option>
          <option value="🤨">🤨</option>
          <option value="🥺">🥺</option>
          <option value="💭">💭</option>
        </select>
      </div>
      <textarea
        className={`flex-grow-1 alert m-1 p-2 alert-${
          diag.char === "🖼️" ? "light" : "primary"
        }`}
        ref={myText}
        value={diag.text}
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
