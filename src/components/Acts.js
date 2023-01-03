const _ = require("lodash");

export const Acts = ({ acts, setActs, plotLine, finalMoral, chars }) => {
  const setAct = (actsIndex, plotIndex) => {
    const copy = _.cloneDeep(acts);
    copy[plotIndex].meanings[
      plotLine.orientations[plotIndex] ? "shadow" : "light"
    ] = [
      copy[plotIndex].meanings[
        plotLine.orientations[plotIndex] ? "shadow" : "light"
      ][actsIndex],
    ];
    setActs(copy);
  };

  return (
    <>
      <h2>Scene Beats</h2>
      <p>
        Select one item from each column to help illustrate{" "}
        <span className="fst-italic fw-bold">{finalMoral[0]}</span> is just like{" "}
        <span className="fst-italic fw-bold">{finalMoral[1]}</span>
      </p>
      <div className="row">
        {acts.map((m, plotIndex) => {
          return (
            <div key={`list_${plotIndex}`} className="col">
              <ul className="list-group shadow">
                {m.meanings[
                  plotLine.orientations[plotIndex] ? "shadow" : "light"
                ].map((acts, actsIndex) => {
                  return (
                    <li
                      key={`acts_${actsIndex}_${plotIndex}`}
                      className="list-group-item"
                      onClick={setAct.bind(this, actsIndex, plotIndex)}
                    >
                      {acts}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
