import SelectLoadItem from "./SelectLoadItem";
import SelectLoadCoeff from "./SelectLoadCoeff";
import React, { useState, useEffect } from "react";
import { defineTypeOfUnits } from "/src/lib/defineTypeOfUnits";
import { TableBtn as BtnLoadTable } from "/src/UI/Button/Table/ControlsBtn";
import { ICONS } from "/src/constants/ICONS";
import styles from "./loadTable.module.scss";

// idLoad: "",
//   typeLoad: "", // deadLoad, funcLoad, snowLoad, windLoad
//   nameLoad: "",
//   valueLoad: 0,
//   thicknessValue: 0,
//   coeffLoad: 0,
//   widthValue: 0,
//   charactValueLoadArea: 0,
//   charactValueLoadLine: 0,
//   designValueLoadArea: 0,
//   designValueLoadLine: 0,
//   typeOfUnits: "",
//   comments: ""
// };
const LoadTRow = (props) => {
  const localState = props.currentValue;
  const {
    idLoad,
    charactValueLoadArea,
    charactValueLoadLine,
    designValueLoadArea,
    designValueLoadLine
  } = props.currentValue; // состояние строки нагрузок из redux

  const typeOfUnits = defineTypeOfUnits(props.typeOfLoad);
  const [load, setLoad] = useState({
    name: localState.nameLoad,
    value: localState.valueLoad
  });
  const [coeffValue, setCoeffValue] = useState(localState.coeffLoad);
  const [thicknessValue, setThicknessValue] = useState(
    localState.thicknessValue
  );
  //const [newTypeLoad, setNewTypeLoad] = useState(props.typeOfLoad);
  const [widthValue, setWidthValue] = useState(localState.widthValue);

  const changeLoadHandler = (newLoad) => {
    setLoad(newLoad);
    //setNewTypeLoad(coeffValue);
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
    props.removeLoad(idLoad);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      let sendData = {
        idLoad,
        coeffLoad: coeffValue,
        thicknessValue: thicknessValue,
        widthValue: widthValue,
        charactValueLoadArea: 0,
        charactValueLoadLine: 0,
        designValueLoadArea: 0,
        designValueLoadLine: 0
      };

      sendData.charactValueLoadArea = calcLoadWthoutCoeff(
        load.value,
        thicknessValue
      );

      if (load.name !== localState.nameLoad) {
        Object.assign(sendData, {
          typeLoad: props.typeOfLoad,
          nameLoad: load.name,
          valueLoad: load.value,
          typeOfUnits: typeOfUnits
        });
      }

      if (typeOfUnits !== localState.typeOfUnits || typeOfUnits === "kN/m2") {
        sendData.charactValueLoadArea = +load.value;
      }

      sendData.designValueLoadArea = calcLoadWthCoeff(
        sendData.charactValueLoadArea,
        coeffValue
      );

      if (
        (widthValue > 0 && sendData.charactValueLoadArea !== 0) ||
        sendData.designValueLoadArea !== 0
      ) {
        sendData.charactValueLoadLine = calcLoadWthoutCoeff(
          sendData.charactValueLoadArea,
          widthValue
        );
        sendData.designValueLoadLine = calcLoadWthoutCoeff(
          sendData.designValueLoadArea,
          widthValue
        );
      }

      props.updLoad(sendData);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [load, coeffValue, thicknessValue, widthValue, idLoad]);

  const calcLoadWthCoeff = (a, b) => {
    return Math.round(a * b * 1000) / 1000;
  };
  const calcLoadWthoutCoeff = (a, b) => {
    return Math.round(a * b) / 1000;
  };

  return (
    <tr className={styles.t_load_main_calc}>
      <td>
        <SelectLoadItem
          units={localState.typeOfUnits}
          initialNameLoad={localState.nameLoad}
          initialValueLoad={localState.valueLoad}
          loadList={props.loadList}
          onChange={changeLoadHandler}
          className={styles.selLoadList}
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          name="thickness"
          value={thicknessValue}
          onChange={changeThickHandler}
          disabled={localState.typeOfUnits === "kN/m2"}
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
