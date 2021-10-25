import React from "react";
import styles from "./BtnUserAuthForm.module.scss";

const BtnUserAuthForm = (props) => {
  return (
    <button onClick={props.onClick} className={styles["btn-user-auth-form"]}>
      {props.children}
    </button>
  );
};

export default BtnUserAuthForm;
