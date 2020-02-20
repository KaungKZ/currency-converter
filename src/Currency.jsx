import React from "react";

export default function Currency({
  currencyOptions,
  initiateOption,
  handleOptionChange,
  amount,
  handleInputChange
}) {
  return (
    <div className="currency-row">
      <input type="number" value={amount} onChange={handleInputChange} />
      <select
        name=""
        id=""
        value={initiateOption}
        onChange={handleOptionChange}
      >
        {currencyOptions.map(one => {
          return (
            <option value={one} key={one}>
              {one}
            </option>
          );
        })}
      </select>
    </div>
  );
}
