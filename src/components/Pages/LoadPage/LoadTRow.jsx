import SelectLoadItem from "./SelectLoadItem";
import SelectLoadCoeff from "./SelectLoadCoeff";
import React, { useState, useEffect } from "react";
import { TableBtn as BtnLoadTable } from "/src/UI/Button/Table/ControlsBtn";
import { ICONS } from "/src/constants/ICONS";
import styles from "./loadTable.module.scss";

const LoadTRow = (props) => {
  const localState = props.currentValue;
  const {
    id: idRow,
    charactValueLoadArea,
    charactValueLoadLine,
    designValueLoadArea,
    designValueLoadLine
  } = props.currentValue; // состояние строки нагрузок из redux

  const [material, setMaterial] = useState({
    name: localState.materialName,
    value: localState.materialValue
  });
  const [coeffValue, setCoeffValue] = useState(localState.coeffLoad);
  const [thicknessValue, setThicknessValue] = useState(
    localState.thicknessValue
  );
  const [widthValue, setWidthValue] = useState(localState.widthValue);

  const changeMaterialHandler = (material) => {
    setMaterial(material);
  };
  const changeCoeffHandler = (coeff) => {
    setCoeffValue(coeff);
  };
  const changeThickHandler = (thickness) => {
    setThicknessValue(thickness.target.value);
  };
  const changeWidthHandler = (loadWidth) => {
    setWidthValue(loadWidth.target.value);
  };
  const removeLoadHandler = () => {
    props.removeLoad(idRow);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      let charactLoadArea = 0;
      let charactLoadLine = 0;
      let designLoadArea = 0;
      let designloadLine = 0;
      if (material && thicknessValue) {
        charactLoadArea = calcLoadArea(material.value, thicknessValue);

        if (coeffValue) {
          designLoadArea = calcLoadArea(
            material.value,
            thicknessValue,
            coeffValue
          );
        }

        if ((widthValue > 0 && charactLoadArea !== 0) || designLoadArea !== 0) {
          charactLoadLine = calcLoadLine(charactLoadArea, widthValue);
          designloadLine = calcLoadLine(designLoadArea, widthValue);
        }

        props.setMaterialData({
          id: idRow,
          materialName: material.name,
          materialValue: material.value,
          thicknessValue: thicknessValue,
          coeffLoad: coeffValue,
          widthValue: widthValue,
          charactValueLoadArea: charactLoadArea,
          charactValueLoadLine: charactLoadLine,
          designValueLoadArea: designLoadArea,
          designValueLoadLine: designloadLine
        });
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [material, coeffValue, thicknessValue, widthValue]);

  const calcLoadArea = (density, thickness, loadCoeff = 1) => {
    return Math.round(density * thickness * 0.001 * loadCoeff * 1000) / 1000;
  };

  const calcLoadLine = (loadArea, widthLoad) => {
    return Math.round(widthLoad * 0.001 * loadArea * 1000) / 1000;
  };

  return (
    <tr className={styles.t_load_main_calc}>
      <td>
        <SelectLoadItem
          initialMaterialName={material.name}
          initialMaterialValue={material.value}
          materialList={props.materialList}
          onChange={changeMaterialHandler}
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          name="thickness"
          value={thicknessValue}
          onChange={changeThickHandler}
        />
      </td>
      <td>
        <span name="charact_value_of_area"> {charactValueLoadArea} </span>
      </td>
      <td>
        <SelectLoadCoeff
          onChange={changeCoeffHandler}
          currentValue={coeffValue}
        />
      </td>
      {/* characteristic values of imposed loads */}
      <td>
        <span name="design_value_of_area"> {designValueLoadArea} </span>
      </td>
      <td>
        <input
          type="number"
          name="load_width"
          onChange={changeWidthHandler}
          value={widthValue}
        />
      </td>
      <td>
        <span name="charact_value_of_Line"> {charactValueLoadLine} </span>
      </td>
      <td>
        <span name="design_value_of_line"> {designValueLoadLine}</span>
      </td>
      <td>
        <BtnLoadTable
          className={styles.icon_middle}
          onClick={removeLoadHandler}
        >
          {ICONS.trashItem}
        </BtnLoadTable>
      </td>
    </tr>
  );
};

export default LoadTRow;
