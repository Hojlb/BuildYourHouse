import React, { useState, useEffect } from "react";
import { LOADCOEFF } from "/src/constants/LOADCOEFF";

const SelectLoadCoeff = (props) => {
  const [currentValue, setValue] = useState(props.currentValue);
  const onChangeHandler = props.onChange;

  useEffect(() => {
    onChangeHandler(currentValue);
  }, [currentValue, onChangeHandler]);

  const changeHeahdler = (e) => {
    setValue(e.target.value);
  };

  return (
    <select
      name="coeff_of_load"
      onChange={changeHeahdler}
      className={props.className}
    >
      {LOADCOEFF.map((item, index) => (
        <option key={index} value={item} selected={props.currentValue === item}>
          {item}
        </option>
      ))}
    </select>
  );
};
export default SelectLoadCoeff;
