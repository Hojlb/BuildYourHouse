import React, { useState, useEffect } from "react";

const SelectLoadItem = (props) => {
  const materialList = props.materialList; // материалы в селект

  const [targetMaterial, setTargetMaterial] = useState({
    name: props.initialMaterialName,
    value: props.initialMaterialValue
  });

  const changeHandler = (e) => {
    const material = {
      name: e.target.options[e.target.selectedIndex].text,
      value: e.target.value
    };
    setTargetMaterial(material);
    props.onChange(material);
  };

  return (
    <select
      name="material"
      onChange={changeHandler}
      value={targetMaterial.name}
    >
      <option value={targetMaterial.value}>{targetMaterial.name}</option>
      {materialList.map((item) => (
        <option key={item.id} value={item.value}>
          {item.name} - {item.value}kН/м3
        </option>
      ))}
    </select>
  );
};
export default SelectLoadItem;
