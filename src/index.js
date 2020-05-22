import React from "react";
import ReactDOM from "react-dom";

import JokeGenerator from "./jokeGenerator";

const App = () => {
  return (
    <div>
      <JokeGenerator />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
