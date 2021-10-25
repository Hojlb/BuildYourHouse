import React from "react";

const InputGI = React.forwardRef((props, ref) => {
  const { type, name, value, onChange, onBlur } = props;

  return (
    <input
      name={name}
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
});

export default InputGI;
