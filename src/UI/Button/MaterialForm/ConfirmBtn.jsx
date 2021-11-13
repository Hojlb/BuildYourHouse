import React from "react";

export const ConfirmBtn = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};
