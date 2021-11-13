import React, { useState, useEffect } from "react";
import BaseOptionItem from "/src/UI/Foundation/BaseOptionItem";
import { useDispatch, useSelector } from "react-redux";
import { FOUNDATION_OPTIONS as listBaseOption } from "/src/constants/FOUNDATION/OPTIONS_LIST";
import styles from "../Foundation.module.scss";

const FoundationBaseOptions = () => {
  const [isWithBasement, setWithBasement] = useState(false);

  //const { id, name, labelName, type, value, onChange, onBlur } = props;
  // const dispatch = useDispatch();
  // const groundList = useSelector((state) => state.foundation.ground);

  // const addGround = (id) => {
  //   dispatch(FAction.addGroundRow(id));
  // };
  const changeBasementHandler = (e) => {
    const is = e.target.value;
    is === "withBasement" ? setWithBasement(true) : setWithBasement(false);
  };

  useEffect(() => {
    var canvas = document.getElementById("FOGCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 400;

    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, 100, 100);
  });

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
        <BaseOptionItem {...listBaseOption[7]} />

        <section className={styles.radio_section}>
          <h3>Наличие подполья</h3>
          <div className={styles.r_s_item}>
            <label for="withBasement">С подпольем</label>
            <input
              type="radio"
              id="withBasement"
              name="basement"
              value="withBasement"
              onChange={changeBasementHandler}
            />
          </div>
          <div className={styles.r_s_item}>
            <label for="withoutBasement">Без подполья</label>
            <input
              checked={!isWithBasement}
              type="radio"
              id="withoutBasement"
              name="basement"
              value="withoutBasement"
              onChange={changeBasementHandler}
            />
          </div>
        </section>
        {isWithBasement && <BaseOptionItem {...listBaseOption[6]} />}
      </section>
      <section className={`${styles.f_o_grafBasement} ${styles.item_centr}`}>
        <canvas id="FOGCanvas"></canvas>
      </section>
    </section>
  );
};

export default FoundationBaseOptions;
