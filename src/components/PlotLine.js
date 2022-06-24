export const PlotLine = ({ plotLine }) => {
  return (
    <div>
      <h2>Plot Line</h2>
      <p>
        The flow of the story based on story archetypes. This determines if the
        following plot beat selections are positive or negative.
      </p>
      <h3>{plotLine.name}</h3>
      <div className="d-flex">
        <div
          className={`plot-point ${
            plotLine.orientations[0] ? "downwards" : "upwards"
          }`}
        ></div>
        <div
          className={`plot-point ${
            plotLine.orientations[1] ? "downwards" : "upwards"
          }`}
        ></div>
        <div
          className={`plot-point ${
            plotLine.orientations[2] ? "downwards" : "upwards"
          }`}
        ></div>
      </div>
    </div>
  );
};
