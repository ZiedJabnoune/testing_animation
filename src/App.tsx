import React, { useState } from 'react';

const App: React.FC = () => {

  const [translate, setTranslate] = useState(0);
  const [translate1, setTranslate1] = useState(0);

  const [rAFId, setraAFId] = useState(0);
  const [timeoutId, settimeoutId] = useState<any>(0);

  const translateWithpx = () => {
    setTranslate((t) => {
      let m = 0;
      if (t < 0) {
        m = 500
      } else if (t > 500) {
        m = 0;
      } else {
        m = t + 2;
      }
      return m;
    })
  }

  const translateWithpx1 = () => {
    setTranslate1((t) => {
      let m = 0;
      if (t < 0) {
        m = 500
      } else if (t > 500) {
        m = 0;
      } else {
        m = t + 2;
      }
      return m;
    })
  }

  const moveDiv = () => {
    translateWithpx()
    ///requestAnimationFrame(() => moveDiv())
    const id = setTimeout(() => moveDiv(), 14)
    settimeoutId(id);
    console.log("new timeout " + id)
  }

  const looping = () => {
    translateWithpx1();
    const reqId = requestAnimationFrame(() => looping())
    setraAFId(reqId)
    console.log("raf created " + reqId)
  }

  const stop = () => {
    console.log("raf " + rAFId)
    console.log("timeout " + timeoutId)
    cancelAnimationFrame(rAFId);
    clearTimeout(timeoutId);
  }

  return (
    <div>
      <button onClick={() => { console.log("clickedddddddd"); moveDiv(); looping() }}>move DIV</button>
      <br></br>
      <br></br>
      <button onClick={() => { stop() }}>Stop DIV</button>
      <br></br>
      <br></br>
      <div style={{
        border: "1px solid", backgroundColor: "red", width: "20px", height: "20px",
        transform: `translate(${translate}px)`
      }} />

      <br></br>
      <br></br>
      <div style={{
        border: "1px solid", backgroundColor: "red", width: "20px", height: "20px",
        transform: `translate(${translate1}px)`
      }} />
    </div>
  );
}

export default App;
