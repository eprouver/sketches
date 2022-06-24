import "./App.css";
import { useState, useMemo } from "react";

import { Frames } from "./components/Frames";
import { Acts } from "./components/Acts";
import { Moral } from "./components/Moral";
import { PlotLine } from "./components/PlotLine";
import { Characters } from "./components/Characters";
import { pickCard } from "./data/tarot";
import { plots } from "./data/plots";

const _ = require("lodash");

const App = () => {
  const sketch = useMemo(() => {
    let sketch = {};
    pickCard();
    sketch.moral = [pickCard(), pickCard()];
    sketch.characters = ["❓", "❓", "❓"];
    sketch.plotLine = _.sample(plots);
    sketch.acts = [pickCard(), pickCard(), pickCard()];
    sketch.frames = [{ diag: [] }];
    return sketch;
  }, [0]);

  const [chars, setChars] = useState(sketch.characters);
  const [frames, setFrames] = useState(sketch.frames);

  return (
    <div className="container">
      <h1 className="mt-3">
        Sketches
        {/* <button
          className="btn btn-success float-end"
          onClick={regenerate.bind(this)}
        >
          Regenerate
        </button> */}
      </h1>
      <Moral moral={sketch.moral} />
      <Characters chars={chars} setChars={setChars} />
      <PlotLine plotLine={sketch.plotLine} />
      <Acts acts={sketch.acts} plotLine={sketch.plotLine} />
      <Frames frames={frames} setFrames={setFrames} chars={chars} />
    </div>
  );
};

export default App;
