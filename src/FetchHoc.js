import React, { useState, useEffect } from "react";

function withDataFetching(props) {
  return function(WrappedComponent) {
    function WithDataFetching() {
      let [loading, setLoading] = useState(true);
      let [results, setResult] = useState([]);
      let [error, setError] = useState("");

      useEffect(() => {
        async function fetchData() {
          try {
            let data = await fetch(props.url);
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
      }, []);

      return (
        <WrappedComponent
          results={results}
          loading={loading}
          error={error}
          {...props}
        />
      );
    }
    return WithDataFetching;
  };
}

function ExchangeRateHoc({ loading, results, error }) {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <ul>
      {results.map(item => {
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

export default withDataFetching({
  url: "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11",
})(ExchangeRateHoc);
