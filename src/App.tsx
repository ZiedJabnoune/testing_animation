import React, { useState } from "react";

const App: React.FC = () => {
  const [translate, setTranslate] = useState(0);
  const [translate1, setTranslate1] = useState(0);

  const [rAFId, setraAFId] = useState(0);
  const [timeoutId, settimeoutId] = useState<any>(0);

  const translateWithpx = () => {
    setTranslate(t => {
      let m = 0;
      if (t < 0) {
        m = 500;
      } else if (t > 500) {
        m = 0;
      } else {
        m = t + 2;
      }
      return m;
    });
  };

  const translateWithpx1 = () => {
    setTranslate1(t => {
      let m = 0;
      if (t < 0) {
        m = 500;
      } else if (t > 500) {
        m = 0;
      } else {
        m = t + 2;
      }
      return m;
    });
  };

  const moveDiv = () => {
    translateWithpx();
    ///requestAnimationFrame(() => moveDiv())
    const id = setTimeout(() => moveDiv(), 14);
    settimeoutId(id);
  };

  const looping = () => {
    translateWithpx1();
    const reqId = requestAnimationFrame(() => looping());
    setraAFId(reqId);
  };

  const stop = () => {
    cancelAnimationFrame(rAFId);
    clearTimeout(timeoutId);
  };

  return (
    <div>
      <button
        onClick={() => {
          moveDiv();
          looping();
        }}
      >
        move DIV
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          stop();
        }}
      >
        Stop DIV
      </button>
      <br />
      <br />
      <div
        style={{
          border: "1px solid",
          backgroundColor: "red",
          width: "20px",
          height: "20px",
          transform: `translate(${translate}px)`
        }}
      />

      <br />
      <br />
      <div
        style={{
          border: "1px solid",
          backgroundColor: "red",
          width: "20px",
          height: "20px",
          transform: `translate(${translate1}px)`
        }}
      />
    </div>
  );
};

export default App;
