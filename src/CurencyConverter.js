// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [currFrom, setCurrFrom] = useState("");
  const [currTo, setCurrTo] = useState("");
  const [input, setInput] = useState("");
  const [apiData, SetApiData] = useState([]);
  console.log(input);

  function handleCurrFrom(value) {
    setCurrFrom(value);
  }
  function handleCurrTo(value) {
    setCurrTo(value);
  }
  function handleInput(value) {
    setInput(value);
  }

  useEffect(
    function () {
      async function fetchConvertCurr() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${currFrom}&to=${currTo}`
        );
        const data = await res.json();
        SetApiData(data);
        console.log(data);
      }
      if (currFrom === currTo) return;
      fetchConvertCurr();
    },
    [currFrom, currTo, input]
  );

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
      />
      <select onChange={(e) => handleCurrFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      To
      <select onChange={(e) => handleCurrTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {currFrom === currTo ? input : apiData.rates?.INR} {currTo}
      </p>
    </div>
  );
}
