import React from "react";
import LoadHistoryItm from "/src/UI/LoadTable/LoadHistoryItm";
import styles from "./loadHistory.module.scss";

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

const LoadHistory = (props) => {
  const { loadList, summResult } = props;
  let checkData = true;

  if (loadList.length === 0) {
    checkData = false;
  }

  const historyBlock = loadList.map((itm) => {
    if (itm.nameLoad === 0) return;
    else {
      return <LoadHistoryItm list={itm} key={itm.id} />;
    }
  });

  const summaResultAreaLoad = (
    <div>
      норм/расч: {summResult.charactLoadArea} / {summResult.designLoadArea}
      (кПа)
    </div>
  );

  const summResultLineLoad = (
    <div>
      норм/расч: {summResult.charactLoadLine} /{summResult.designLoadLine}
      (кН/м)
    </div>
  );

  return !checkData ? (
    <p>Заполните форму</p>
  ) : (
    <div className={styles.table}>
      <div>Материал * толщина</div>
      <div>Нагрузка на м2 норм/расч (кПа)</div>
      <div>Линейная нагрузка по грузовой ширине (кН/м)</div>
      {historyBlock}
      <div>Итого</div>
      {summResult.charactLoadArea > 0 && summaResultAreaLoad}
      {summResult.charactLoadLine > 0 && summResultLineLoad}
      <button>Сохранить текущий расчет</button>
      <button>Очистить историю</button>
    </div>
  );
};
export default LoadHistory;
