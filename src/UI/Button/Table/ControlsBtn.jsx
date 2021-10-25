import React from "react";

export const TableBtn = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};
