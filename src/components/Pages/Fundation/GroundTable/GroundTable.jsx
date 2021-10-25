import React, { useState } from "react";
import GroundTableRow from "./GTRow";
import GTHead from "./GTHead";
import "./GroundTable.module.scss";

const GroundTable = (props) => {
  /*TODO: сделать добавление элемента в сторе который контролирует базу данных грунтов
    упорядочивание элементов в базе выполняется по их number
    и выполняется перерисовка каждый раз когда добавляется грунт (изменяется number)
  */

  const addRowHandler = (id) => {
    props.addGroundRow(id);
  };

  const removeRowHandler = (id) => {
    props.removeGroundRow(id);
  };

  const changeGroundHandler = (data) => {
    props.changeData(data);
  };

  return (
    <table>
      <caption>Характеристики грунтов</caption>
      <GTHead />
      <tbody>
        {props.ground.map((item, index) => (
          <GroundTableRow
            key={item.id}
            addRow={addRowHandler}
            removeRow={removeRowHandler}
            changeData={changeGroundHandler}
            ground={item}
          />
        ))}
      </tbody>
    </table>
  );
};

export default GroundTable;
