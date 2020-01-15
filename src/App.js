import React from "react";
import ExchangeRateHook from "./FetchHook";
import ExchangeRateHoc from "./FetchHoc";

function App() {
  return (
    <>
      <ExchangeRateHoc />
      <ExchangeRateHook />
    </>
  );
}

export default App;
