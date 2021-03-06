import { useRef } from "react";

export const Dialog = ({ chars, diag, removeDialog, updateDiag, english }) => {
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

  return (
    <div className="d-flex m-3 animate__animated animate__fadeIn">
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
          <option value="๐ผ๏ธ">๐ผ๏ธ</option>
        </select>
        <select
          className={`form-select ${diag.char === "๐ผ๏ธ" ? "d-none" : ""}`}
          ref={myEmotion}
          value={diag.emotion}
          onChange={handleChange}
        >
          <option value="๐">๐</option>
          <option value="๐">๐</option>
          <option value="๐ญ">๐ญ</option>
          <option value="๐จ">๐จ</option>
          <option value="๐ก">๐ก</option>
          <option value="๐คฎ">๐คฎ</option>
          <option value="๐ฅฑ">๐ฅฑ</option>
          <option value="๐ก">๐ก</option>
          <option value="๐คช">๐คช</option>
          <option value="๐คฏ">๐คฏ</option>
          <option value="๐">๐</option>
          <option value="๐คจ">๐คจ</option>
          <option value="๐ฅบ">๐ฅบ</option>
          <option value="๐ญ">๐ญ</option>
        </select>
      </div>

      <textarea
        className={`flex-grow-1 alert m-1 p-2 alert-${
          diag.char === "๐ผ๏ธ" ? "light" : "primary"
        } ${english ? "" : "d-none"}`}
        ref={myText}
        value={diag.text}
        onChange={handleChange}
      ></textarea>

      <textarea
        className={`flex-grow-1 alert m-1 p-2 alert-${
          diag.char === "๐ผ๏ธ" ? "light" : "warning"
        } ${english ? "d-none" : ""}`}
        ref={myToki}
        value={diag.toki}
        placeholder={diag.text}
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
