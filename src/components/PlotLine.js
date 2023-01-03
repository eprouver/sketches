export const PlotLine = ({ plotLine }) => {
  return (
    <div className="row">
      <div className="col-6">
        <h2>
          Scene Style - <span className="text-success">{plotLine.name}</span>
        </h2>
        <p>
          This is the type of story in this scene. The arrows determine if the
          character's feelings and actions are positive or negative.
        </p>
      </div>
      <div className="col-6">
        <div className="d-flex justify-content-around">
          <div
            className={`plot-point shadow ${
              plotLine.orientations[0] ? "downwards" : "upwards"
            }`}
          ></div>
          <div
            className={`plot-point shadow ${
              plotLine.orientations[1] ? "downwards" : "upwards"
            }`}
          ></div>
          <div
            className={`plot-point shadow ${
              plotLine.orientations[2] ? "downwards" : "upwards"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};
