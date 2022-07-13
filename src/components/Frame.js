import { Dialog } from "./Dialog";
const _ = require("lodash");

export const Frame = ({ chars, frame, updateFrame, english }) => {
  return (
    <div className="frame animate__animated animate__fadeIn">
      {frame.diag.map((d, i) => (
        <Dialog
          key={`diag_${i}`}
          chars={chars}
          frame={frame}
          diag={d}
          english={english}
          removeDialog={() => {
            const copy = [...frame.diag];
            copy.splice(i, 1);
            frame.diag = copy;
            updateFrame(frame);
          }}
          updateDiag={(char, text, emotion, toki) => {
            const copy = [...frame.diag];
            copy[i] = { char, text, emotion, toki };
            frame.diag = copy;
            updateFrame(frame);
          }}
        />
      ))}

      <div className="d-grid">
        <button
          className="btn btn-lg p-0 m-0"
          onClick={() => {
            const copy = _.clone(frame);
            copy.diag.push({ char: "", text: "", emotion: "", toki: "" });
            updateFrame(copy);
          }}
        >
          + Add Line
        </button>
      </div>
    </div>
  );
};
