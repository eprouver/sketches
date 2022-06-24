import { Dialog } from "./Dialog";
const _ = require("lodash");

export const Frame = ({ chars, frame, updateFrame }) => {
  return (
    <div className="frame">
      {frame.diag.map((d, i) => (
        <Dialog
          key={`diag_${i}`}
          chars={chars}
          frame={frame}
          diag={d}
          removeDialog={() => {
            const copy = [...frame.diag];
            copy.splice(i, 1);
            frame.diag = copy;
            updateFrame(frame);
          }}
          updateDiag={(char, text, emotion) => {
            const copy = [...frame.diag];
            copy[i] = { char, text, emotion };
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
            copy.diag.push({ char: "", text: "", emotion: "" });
            updateFrame(copy);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
