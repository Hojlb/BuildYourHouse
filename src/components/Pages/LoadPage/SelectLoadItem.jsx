import React, { useState } from "react";

const SelectLoadItem = React.forwardRef(
  (
    {
      initialNameLoad,
      initialValueLoad,
      loadList = [],
      onChange,
      units,
      className
    },
    ref
  ) => {
    const [targetLoad, setTargetLoad] = useState({
      name: initialNameLoad,
      value: initialValueLoad
    });

    const changeHandler = (e) => {
      const newLoad = {
        name: e.target.options[e.target.selectedIndex].text.split(" - ")[0],
        value: e.target.value
      };
      setTargetLoad(newLoad);
      onChange(newLoad);
    };

    return (
      <select
        onChange={changeHandler}
        className={className}
        ref={ref}
        value={targetLoad.nameLoad}
      >
        {initialNameLoad && (
          <option value={initialValueLoad}>
            {initialNameLoad} - {initialValueLoad} {units}
          </option>
        )}
        {loadList.length &&
          loadList.map((item) => (
            <option id={item.id} key={item.id} value={item.value}>
              {item.name} - {item.value} {units}
            </option>
          ))}
      </select>
    );
  }
);
export default SelectLoadItem;
