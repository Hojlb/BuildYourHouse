import React, { useState } from "react";
import SelectLoadItem from "../SelectLoadItem";
import SelectLoadCoeff from "../SelectLoadCoeff";
import RadioLoadBtn from "/src/UI/Button/RadioBtnLoadTbl/RadioLoadBtn";
import { TableBtn as BtnLoadTable } from "/src/UI/Button/Table/ControlsBtn";
import { ICONS } from "/src/constants/ICONS";
import styles from "./HeadLoadTable.module.scss";

// вынести все useEffect в главный файл, чтобы разные компоненты
//могли изменяться при изменении одинаковых зависимых
const HeadLoadTable = ({
  changeTypeLoad,
  changeLoadItm,
  loadList,
  currentTypeLoad,
  currentLoadCoeff,
  currentLoadItem = undefined
}) => {
  const radioBtnList = [
    {
      id: "deadLoad",
      text: "Постоянная"
    },
    { id: "functionLoad", text: "Функциональная" },
    { id: "snow", text: "Снег" },
    { id: "wind", text: "Ветер" }
  ];

  const changeTypeLoadHandler = (typeOfLoad) => {
    changeTypeLoad(typeOfLoad.target.id);
  };

  const typeOfUnits = () => {
    return currentTypeLoad === "deadLoad" ? "kN/m3" : "kN/m2";
  };

  const addItemHandler = () => {};

  const selectLoadHandler = () => {};
  const changeCoeffHandler = () => {};

  return (
    <div className={styles.load_options_wrapper}>
      <div className={styles.load_options}>
        {radioBtnList.map((itm) => (
          <RadioLoadBtn
            key={itm.id}
            onChange={changeTypeLoadHandler}
            {...itm}
            className={styles.custom_radio}
            name="loadRadioBtn"
            currentValue={currentTypeLoad}
          />
        ))}
      </div>
      <div className={`${styles.check_list} ${styles.align_strt}`}>
        <SelectLoadItem
          loadList={loadList}
          onChange={selectLoadHandler}
          className={styles.bx}
          units={typeOfUnits()}
        />

        <input type="text" placeholder="comments" className={styles.bx} />

        <input
          type="text"
          placeholder="value from modal window"
          className={`${styles.bx}`}
          disabled
        />
      </div>
      <div className={`${styles.coef_loads} ${styles.align_cntr}`}>
        <SelectLoadCoeff
          onChange={changeCoeffHandler}
          currentValue={currentLoadCoeff}
          className={`${styles.bx}`}
        />
      </div>
      <div className={styles.align_cntr}>
        <BtnLoadTable
          className={`${styles.icon_middle}`}
          onClick={addItemHandler}
        >
          {ICONS.addItem}
        </BtnLoadTable>
      </div>
    </div>
  );
};
export default HeadLoadTable;
