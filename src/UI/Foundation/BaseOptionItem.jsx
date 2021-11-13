import React from "react";
import styles from "./BaseOptionStyles.module.scss";

const BaseOptionItem = React.forwardRef((props, ref) => {
  const { type, value, onChange, onBlur, labelName, id } = props;
  return (
    <div className={`${styles.inLine}`}>
      <label htmlFor={id}>{labelName}</label>
      <input
        id={id}
        name={id}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min="0"
        step="10"
      />
    </div>
  );
});

export default BaseOptionItem;
