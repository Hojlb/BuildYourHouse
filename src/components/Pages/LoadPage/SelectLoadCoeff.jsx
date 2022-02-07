import React, { useState } from "react";
import { LOADCOEFF } from "/src/constants/LOADCOEFF";

const SelectLoadCoeff = React.forwardRef((props, ref) => {
  const [coeffValue, setCoeffValue] = useState(props.currentValue);
  const onChangeHandler = props.onChange;

  const changeHeahdler = (e) => {
    setCoeffValue(e.target.value);
    onChangeHandler(e.target.value);
  };

  return (
    <select
      name="coeff_of_load"
      onChange={changeHeahdler}
      className={props.className}
      ref={ref}
      value={coeffValue}
    >
      {LOADCOEFF.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
});
export default SelectLoadCoeff;
