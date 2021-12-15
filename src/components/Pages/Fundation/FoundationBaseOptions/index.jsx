import React, { useState, useEffect } from "react";
import BaseOptionItem from "/src/UI/Foundation/BaseOptionItem";
import RadioBasement from "/src/UI/Foundation/RadioBasement";
import MainCanvas from "../FoundationBaseOptions/ViewGroundLayer/MainCanvas";
import { useDispatch, useSelector } from "react-redux";
import { FOUNDATION_OPTIONS as listBaseOption } from "/src/constants/FOUNDATION/OPTIONS_LIST";
import styles from "../Foundation.module.scss";

const FoundationBaseOptions = (props) => {
  const [isWithBasement, setWithBasement] = useState(false);
  const options = {
    widthWall: "",
    foundationSlabHeight: "",
    widthOfBuild: "",
    benchmarkZeroFloor: "",
    benchmarkPlanning: "",
    benchmarkBottomFoundationSlab: "",
    benchmarkTopWall: "",
    coeffGamma1: "",
    withBasement: false,
    benchmarkFloorBasement: "0.000"
  };

  const changeBasementHandler = (e) => {
    const is = e.target.value;
    is === "withBasement" ? setWithBasement(true) : setWithBasement(false);
  };

  //props.onChangeOptions();

  return (
    <section className={styles.f_option}>
      <section className={styles.item_col_left}>
        <h3>Параметры расчета</h3>
        {listBaseOption.map((itm, index) => {
          if (index < 3) {
            return <BaseOptionItem {...itm} key={itm.name} />;
          }
        })}

        <h4>Высотные отметки</h4>
        {listBaseOption.map((itm, index) => {
          if (index > 2 && index < 8) {
            return <BaseOptionItem {...itm} key={itm.name} />;
          }
        })}

        <RadioBasement
          isBasement={isWithBasement}
          onChange={changeBasementHandler}
        />
        {isWithBasement && <BaseOptionItem {...listBaseOption[8]} />}
      </section>
      <section className={`${styles.f_o_grafBasement} ${styles.item_centr}`}>
        <MainCanvas />
      </section>
    </section>
  );
};

export default FoundationBaseOptions;
