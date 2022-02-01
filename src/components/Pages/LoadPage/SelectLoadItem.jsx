import React, { useState, useEffect } from "react";

const SelectLoadItem = ({
  initialLoad,
  loadList = [],
  onChange,
  units,
  className
}) => {
  // const [targetMaterial, setTargetMaterial] = useState({
  //   name: initialLoad.name,
  //   value: initialLoad.value
  // });

  const changeHandler = (e) => {
    const material = {
      name: e.target.options[e.target.selectedIndex].text,
      value: e.target.value
    };
    // setTargetMaterial(material);
    onChange(material);
  };

  return (
    <select
      name="material"
      onChange={changeHandler}
      className={className}
      // value={targetMaterial.name}
    >
      {/* <option value={targetMaterial.value}>{targetMaterial.name}</option> */}
      {loadList.length &&
        loadList.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name} - {item.value} {units}
          </option>
        ))}
    </select>
  );
};
export default SelectLoadItem;
