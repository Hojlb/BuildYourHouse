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
    withBasement: "",
    widthWall: "",
    foundationSlabHeight: "",
    widthOfBuild: "",
    benchmarkZeroFloor: "",
    benchmarkPlanning: "",
    benchmarkBottomFoundationSlab: "",
    benchmarkFloorBasement: "",
    benchmarkTopWall: "",
    coeffGamma1: ""
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
        <BaseOptionItem {...listBaseOption[0]} />
        <BaseOptionItem {...listBaseOption[1]} />
        <BaseOptionItem {...listBaseOption[2]} />

        <h4>Отметки (абсолютные)</h4>
        <BaseOptionItem {...listBaseOption[3]} />
        <BaseOptionItem {...listBaseOption[4]} />
        <BaseOptionItem {...listBaseOption[5]} />
        <BaseOptionItem {...listBaseOption[6]} />
        <BaseOptionItem {...listBaseOption[7]} />

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
