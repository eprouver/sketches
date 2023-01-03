import { useState } from "react";
import { Frame } from "./Frame";

export const Frames = ({ frames, setFrames, chars, location }) => {
  const [translate, setTranslate] = useState(0);
  const removeFrame = (index) => {
    const ask = window.confirm("Are you sure?");

    if (ask) {
      const copy = [...frames];
      copy.splice(index, 1);
      setFrames(copy);
    }
  };

  const addFrame = (index) => {
    const copy = [...frames];
    copy.push({ diag: [] });
    setFrames(copy);
  };

  const updateFrame = (frame, i) => {
    const copy = [...frames];
    copy[i] = frame;
    setFrames(copy);
  };

  return (
    <div>
      <div className="float-end">
        <div className="text-center">
          {[0, 1, 2].map((i) => {
            return (
              <span
                key={`pip_${i}`}
                className={`mx-2 ${
                  translate === i ? "text-warning" : "text-secondary"
                }`}
              >
                ●
              </span>
            );
          })}
        </div>
        <button
          className="btn btn-warning"
          onClick={() => {
            let copy = translate;
            copy += 1;
            if (copy >= 3) copy = 0;
            setTranslate(copy);
          }}
        >
          View: {["Original", "Rewrite", "Finished"][translate]}
        </button>
      </div>
      <h2>Dialog Parts</h2>

      <h3>
        Location - <span className="text-capitalize">{location}</span>:
      </h3>
      {frames.map((frame, i) => {
        return (
          <div key={`frame_${i}_eng`} className="row">
            <div className={`mb-2 ${["col-12", "col-6", "d-none"][translate]}`}>
              <Frame
                chars={chars}
                frame={frame}
                frameNum={i}
                english={true}
                translate={translate}
                updateFrame={(frame) => {
                  updateFrame(frame, i);
                }}
              />
              <button
                className={`btn btn-danger float-end ${
                  translate === 0 ? "" : "d-none"
                }`}
                onClick={() => {
                  removeFrame(i);
                }}
              >
                &times;
              </button>
            </div>
            <div className={`mb-2 ${["d-none", "col-6", "col-12"][translate]}`}>
              <Frame
                chars={chars}
                frame={frame}
                frameNum={i}
                english={false}
                translate={translate}
                updateFrame={(frame) => {
                  updateFrame(frame, i);
                }}
              />
              <button
                className={`btn btn-danger float-end ${
                  translate === 1 ? "" : "d-none"
                }`}
                onClick={() => {
                  removeFrame(i);
                }}
              >
                &times;
              </button>
            </div>
          </div>
        );
      })}
      <div className="col-12 mb-5">
        <div className={`frame d-flex ${translate !== 2 ? "" : "d-none"}`}>
          <div
            className="display-3 w-100 text-center align-self-center cursor-pointer"
            onClick={() => {
              addFrame();
            }}
          >
            + Add a Dialog Part
          </div>
        </div>
      </div>
    </div>
  );
};
