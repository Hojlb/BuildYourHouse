import React from "react";
import styles from "./BtnUserAuthForm.module.scss";

const BtnUserAuthForm = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles["btn-user-auth-form"]} ${styles.button} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default BtnUserAuthForm;
