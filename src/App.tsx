import React, { useState, useRef, useEffect } from "react";

/**
 * setTimeout = STO
 * requestAnimationFrame = RAF
 */

/**
 * comparing requestAnimationFrame vs setTimeout to animate a div
 * Should using requestAnimationframe for animations taks
 */
const App: React.FC = () => {
  // setTimeout
  const [translateSTO, setTranslateSTO] = useState(0);
  const [idSTO, setIdSTO] = useState<any>(0);
  const directionSTO = useRef(1);

  // requestAnimationFrame
  const [translateRAF, setTranslateRAF] = useState(0);
  const [idRAF, setIdRAF] = useState(0);
  const directionRAF = useRef(1);

  // mount && unmount
  useEffect(() => {
    console.log("mounted");
    directionSTO.current = 1;
    directionRAF.current = 1;

    return () => {
      console.log("unmounted");
    };
  }, []);

  // setTimeout animation
  const translateWithpxSTO = () => {
    setTranslateSTO(t => {
      let m = 0;
      if (t <= 0) {
        directionSTO.current = 1;
        m = t + 2;
      } else if (t >= 500) {
        directionSTO.current = -1;
        m = t - 2;
      } else {
        m = t + directionSTO.current * 2;
      }
      return m;
    });
  };

  // (1000/60) => 60 Frame/s (FPS) | display frequency is 60 Hz
  const loopSTO = () => {
    translateWithpxSTO();
    const id = setTimeout(() => loopSTO(), 1000 / 60);
    setIdSTO(id);
  };

  // requestAnimationFrame animation
  const translateWithpxRAF = () => {
    setTranslateRAF(t => {
      let m = 0;
      if (t <= 0) {
        directionRAF.current = 1;
        m = t + 2;
      } else if (t >= 500) {
        directionRAF.current = -1;
        m = t - 2;
      } else {
        m = t + directionRAF.current * 2;
      }
      return m;
    });
  };

  const loopRAF = () => {
    translateWithpxRAF();
    const reqId = requestAnimationFrame(() => loopRAF());
    setIdRAF(reqId);
  };

  // stop animation
  const stop = () => {
    cancelAnimationFrame(idRAF);
    clearTimeout(idSTO);
  };

  return (
    <div>
      <button
        onClick={() => {
          loopSTO();
          loopRAF();
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
          transform: `translate(${translateSTO}px)`
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
          transform: `translate(${translateRAF}px)`
        }}
      />
    </div>
  );
};

export default App;
