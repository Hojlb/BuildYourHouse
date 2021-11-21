import React from "react";
import styles from "./BaseOptionStyles.module.scss";

const BaseOptionItem = React.forwardRef((props, ref) => {
  const {
    type,
    value,
    onChange,
    onBlur,
    labelName,
    name,
    options,
    placeholder
  } = props;
  return (
    <div className={`${styles.inLine}`}>
      <label htmlFor={name}>{labelName}</label>
      <input
        placeholder={placeholder}
        id={name}
        name={name}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min="0"
        step="10"
        {...options}
      />
    </div>
  );
});

export default BaseOptionItem;
