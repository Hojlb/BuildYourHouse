import React from "react";

const LoadTResult = (props) => {
  const {
    charactLoadLine,
    charactLoadArea,
    designLoadArea,
    designLoadLine
  } = props.result;
  return (
    <tr>
      <td colSpan="2">ИТОГО</td>
      <td>
        <span>{charactLoadArea}</span>
      </td>
      <td></td>
      <td>
        <span>{designLoadArea}</span>
      </td>
      <td></td>
      <td>
        <span>{charactLoadLine}</span>
      </td>
      <td>
        <span>{designLoadLine}</span>
      </td>
      <td></td>
    </tr>
  );
};

export default LoadTResult;
