import "./App.css";
import { useState, useMemo } from "react";

import { Frames } from "./components/Frames";
import { Acts } from "./components/Acts";
import { Moral } from "./components/Moral";
import { PlotLine } from "./components/PlotLine";
import { Characters } from "./components/Characters";
import { pickCard } from "./data/tarot";
import { plots, places } from "./data/plots";
import { Script } from "./components/Script";

const _ = require("lodash");

const App = () => {
  const [acts, setActs] = useState([pickCard(), pickCard(), pickCard()]);

  const [frames, setFrames] = useState(
    [...Array(1)].map(() => ({
      diag: [],
    }))
  );
  const sketch = useMemo(() => {
    let sketch = {};
    pickCard();
    sketch.moral = [pickCard(), pickCard()];
    sketch.plotLine = _.sample(plots);
    sketch.acts = acts;
    sketch.places = [
      places[~~(Math.random() * places.length)],
      places[~~(Math.random() * places.length)],
    ];
    return sketch;
  }, []);

  const [chars, setChars] = useState([
    { emoji: "❓" },
    { emoji: "❓" },
    { emoji: "❓" },
  ]);
  const [finalMoral, setFinalMoral] = useState([
    "Select The Moral",
    "Select The Moral",
  ]);

  return (
    <div className="container-fluid">
      <h1 className="mt-3">Let's Make a Scene!</h1>
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
          acts={acts}
          setActs={setActs}
          plotLine={sketch.plotLine}
          finalMoral={finalMoral}
          chars={chars}
        />
      </div>
      <div className="my-5">
        <Script
          acts={acts}
          plotLine={sketch.plotLine}
          finalMoral={finalMoral}
          chars={chars}
          frames={frames}
          setFrames={setFrames}
          places={sketch.places}
        />
      </div>
      <div className="my-5">
        <Frames
          frames={frames}
          setFrames={setFrames}
          chars={chars}
          location={sketch.places[0]}
        />
      </div>
    </div>
  );
};

export default App;
