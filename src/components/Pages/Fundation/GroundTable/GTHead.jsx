import React, { useRef, useEffect, useState } from "react";
import styles from "./GroundTable.module.scss";

const GTHead = () => {
  return (
    <thead>
      {/* <tr>
        <th colSpan="3">Вставьте таблицу грунтов</th>
        <th colSpan="4">
          <textarea></textarea>
        </th>
        <th rowSpan="2"></th>
      </tr> */}
      <tr>
        <th className={styles.vertical_text}>Статус</th>
        <th>№ ИГЭ</th>
        <th>Наименование</th>
        <th>Удельный вес кН/м3</th>
        <th>Удельное сцепление (СII), кПа </th>
        <th>Угол внутреннего трения (fiII), град</th>
        <th>Модуль деформаций (Е), МПа</th>
        <th>Мощность слоя, м</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default GTHead;
