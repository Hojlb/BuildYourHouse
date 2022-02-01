const RadioLoadBtn = ({
  id,
  className,
  name,
  onChange,
  text,
  currentValue
}) => {
  return (
    <label htmlFor={id}>
      <input
        type="radio"
        className={className}
        name={name}
        id={id}
        onChange={onChange}
        checked={currentValue === id}
      />
      <span>{text}</span>
    </label>
  );
};

export default RadioLoadBtn;
