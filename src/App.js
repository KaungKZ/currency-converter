import React, { useState, useEffect } from "react";
import Currency from "./Currency";
import "./css/style.css";

function App() {
  const API = "https://api.exchangeratesapi.io/latest";
  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [isFromCurrency, setIsFromCurrency] = useState(true);

  let fromAmount, toAmount;

  if (isFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate || 0;
  }

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setCurrency([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(Object.keys(data.rates)[0]);
        setExchangeRate(data.rates[Object.keys(data.rates)[0]]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${API}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleInputChangeFromCurrency(e) {
    setAmount(e.target.value);
    setIsFromCurrency(true);
  }
  function handleInputChangeToCurrency(e) {
    setAmount(e.target.value);
    setIsFromCurrency(false);
  }
  return (
    <>
      <div className="title">Convert</div>
      <div className="container">
        <Currency
          currencyOptions={currency}
          initiateOption={fromCurrency}
          handleOptionChange={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          handleInputChange={handleInputChangeFromCurrency}
        ></Currency>
        <div className="equal-sign">
          <div className="equal 1"></div>
          <div className="equal 2"></div>
        </div>
        <Currency
          currencyOptions={currency}
          initiateOption={toCurrency}
          handleOptionChange={e => setToCurrency(e.target.value)}
          amount={toAmount}
          handleInputChange={handleInputChangeToCurrency}
        ></Currency>
      </div>
    </>
  );
}

export default App;
