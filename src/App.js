import React, { useState, useEffect } from "react";

function useDataFetching(url) {
  let [loading, setLoading] = useState(true);
  let [result, setResult] = useState([]);
  let [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await fetch(url);
        let json = await data.json();

        if (json) {
          setLoading(false);
          setResult(json);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, [url]);
  return {
    loading,
    result,
    error,
  };
}

function ExchangeRate() {
  let { loading, result, error } = useDataFetching(
    "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11",
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <ul>
      {result.map(item => {
        return (
          <li key={item.ccy}>
            <p>{item.ccy}</p>
            <p>{item.buy}</p>
            <p>{item.sale}</p>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  return <ExchangeRate />;
}

export default App;
