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
    sketch.frames = [...Array(1)].map(() => ({
      diag: [{ char: "", text: "", emotion: "" }],
    }));
    return sketch;
  }, []);

  const [chars, setChars] = useState(sketch.characters);
  const [frames, setFrames] = useState(sketch.frames);
  const [finalMoral, setFinalMoral] = useState([
    "Select The Moral",
    "Select The Moral",
  ]);

  return (
    <div className="container-fluid">
      <h1 className="mt-3">Sketches</h1>
      <div className="my-5">
        <Moral
          moral={sketch.moral}
          finalMoral={(index, message) => {
            const copy = [...finalMoral];
            copy[index] = message;
            setFinalMoral(copy);
          }}
        />
      </div>
      <div className="my-5">
        <Characters chars={chars} setChars={setChars} />
      </div>
      <div className="my-5">
        <PlotLine plotLine={sketch.plotLine} />
      </div>
      <div className="my-5">
        <Acts
          acts={sketch.acts}
          plotLine={sketch.plotLine}
          finalMoral={finalMoral}
        />
      </div>
      <div className="my-5">
        <Frames frames={frames} setFrames={setFrames} chars={chars} />
      </div>
      <h2>In Summary</h2>
      <p>
        The sketch of {chars[0]}, {chars[1]}, and {chars[2]} illustrates
        that&hellip;
      </p>
      <p>
        <span className="text-primary">{finalMoral[0]}</span> is just like{" "}
        <span className="text-primary">{finalMoral[1]}</span>
      </p>
    </div>
  );
};

export default App;
