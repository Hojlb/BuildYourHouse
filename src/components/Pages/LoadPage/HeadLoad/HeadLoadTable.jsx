import React, { useState, useRef, useEffect } from "react";
import SelectLoadItem from "../SelectLoadItem";
import SelectLoadCoeff from "../SelectLoadCoeff";
import { defineTypeOfUnits } from "/src/lib/defineTypeOfUnits";
import RadioLoadBtn from "/src/UI/Button/RadioBtnLoadTbl/RadioLoadBtn";
import { TableBtn as BtnLoadTable } from "/src/UI/Button/Table/ControlsBtn";
import { ICONS } from "/src/constants/ICONS";
import styles from "./HeadLoadTable.module.scss";
import { v4 as uuidv4 } from "uuid";

const HeadLoadTable = ({
  changeTypeLoad,
  changeLoadItm,
  loadList,
  currentTypeLoad
}) => {
  const typeOfUnits = defineTypeOfUnits(currentTypeLoad);
  const [currentLoadCoeff, setCurrentLoadCoeff] = useState(1);
  const [isLoadChoose, setIsLoadChoose] = useState(false);
  const [isModalChoose, setIsModalChoose] = useState(false);

  const loadSelect = useRef();
  const coefSelect = useRef();
  const modalValue = useRef();
  const commentRef = useRef();

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
    setIsLoadChoose(true);
    changeTypeLoad(typeOfLoad.target.id);
  };

  const addItemHandler = () => {
    if (!isLoadChoose && !isModalChoose) {
      console.error("Error: Select load");
      return;
    }
    let loadName = "";

    if (currentTypeLoad === "wind" || currentTypeLoad === "snow") {
      loadName = currentTypeLoad;
    } else {
      loadName =
        loadSelect.current.options[loadSelect.current.selectedIndex].text;
      loadName = loadName.split(" - ")[0];
    }

    const load = {
      idLoad: loadSelect.current.id || uuidv4(),
      typeLoad: currentTypeLoad,
      nameLoad: loadName,
      valueLoad: loadSelect.current.value,
      coeffLoad: coefSelect.current.value,
      typeOfUnits: typeOfUnits,
      comments: commentRef.current.value
    };

    changeLoadItm(load);
  };

  useEffect(() => {
    switch (currentTypeLoad) {
      case "deadLoad": {
        setCurrentLoadCoeff(1.35);
        break;
      }
      case "functionLoad": {
        setCurrentLoadCoeff(1.5);
        break;
      }
      case "snow":
        setCurrentLoadCoeff(1.5);
        break;
      case "wind":
        setCurrentLoadCoeff(1.5);
        break;
      default:
        break;
    }
  }, [currentTypeLoad]);

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
          units={typeOfUnits}
          ref={loadSelect}
        />

        <input
          type="text"
          ref={commentRef}
          placeholder="comments"
          className={styles.bx}
        />

        <input
          type="text"
          placeholder="value from modal window"
          className={`${styles.bx}`}
          disabled
          ref={modalValue}
        />
      </div>
      <div className={`${styles.coef_loads} ${styles.align_cntr}`}>
        <SelectLoadCoeff
          onChange={changeCoeffHandler}
          currentValue={currentLoadCoeff}
          className={`${styles.bx}`}
          ref={coefSelect}
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
