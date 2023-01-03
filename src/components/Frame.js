import { Dialog } from "./Dialog";
const _ = require("lodash");

export const Frame = ({
  chars,
  frame,
  updateFrame,
  english,
  frameNum,
  translate,
}) => {
  return (
    <div
      className={`frame animate__animated animate__slideInRight pt-3 position-relative rounded shadow ${
        english ? "" : "border-primary"
      }`}
    >
      <div
        className={`position-absolute px-1 top-0 ${
          english ? "text-muted" : "text-primary"
        }`}
      >
        Part {frameNum + 1}:
      </div>
      {frame.diag.map((d, i) => (
        <Dialog
          key={`diag_${i}`}
          chars={chars}
          frame={frame}
          diag={d}
          index={i}
          english={english}
          translate={translate}
          removeDialog={() => {
            const copy = [...frame.diag];
            copy.splice(i, 1);
            frame.diag = copy;
            updateFrame(frame);
          }}
          updateDiag={(char, text = "", emotion = "😐", toki = "") => {
            const copy = [...frame.diag];
            copy[i] = { char, text, emotion, toki };
            frame.diag = copy;
            updateFrame(frame);
          }}
        />
      ))}

      <div className={`d-grid ${translate !== 2 ? "" : "d-none"}`}>
        <button
          className="btn btn-lg p-0 m-0"
          onClick={() => {
            const copy = _.clone(frame);
            copy.diag.push({ char: "", text: "", emotion: "", toki: "" });
            updateFrame(copy);
          }}
        >
          + Add a Line
        </button>
      </div>
    </div>
  );
};
