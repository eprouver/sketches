import { Frame } from "./Frame";
const _ = require("lodash");

export const Frames = ({ frames, setFrames, chars }) => {
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
      <h2>Frames</h2>
      <p>
        Add character dialog for each frame. Use 🖼️ if you want to explain what
        will be in the image.
      </p>
      <div className="row">
        {frames.map((frame, i) => {
          return (
            <div key={`frame_${i}`} className="col-6 mb-2">
              <Frame
                chars={chars}
                frame={frame}
                updateFrame={(frame) => {
                  updateFrame(frame, i);
                }}
              />
              <button
                className="btn btn-danger float-end"
                onClick={() => {
                  removeFrame(i);
                }}
              >
                &times;
              </button>
            </div>
          );
        })}
        <div className="col-6 mb-5">
          <div className="frame d-flex">
            <div
              className="display-1 w-100 text-center align-self-center"
              onClick={() => {
                addFrame();
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
