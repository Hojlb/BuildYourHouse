import React, { useRef, useEffect, useState } from "react";
import InputGI from "/src/UI/InputGroundItem/InputGI";
import { TableBtn as BtnGroundTable } from "/src/UI/Button/Table/ControlsBtn";
import GROUNDCOLUMNAME from "/src/constants/GROUNDCOLUMNAME";
import { ICONS } from "/src/constants/ICONS";
import styles from "./GroundTable.module.scss";

const GroundTableRow = (props) => {
  const groundID = props.ground.id;
  const [isRowValid, setRowValid] = useState(false);
  const [isNumberTyped, setNumberTyped] = useState(false);
  const [isNameTyped, setNameTyped] = useState(false);
  const [isDensityTyped, setDensityTyped] = useState(false);
  const [isAdhesionTyped, setAdhesionTyped] = useState(false);
  const [isFrictionАngleTyped, setFrictionАngleTyped] = useState(false);
  const [isStiffnessTyped, setStiffnessTyped] = useState(false);

  const groundNumber = useRef();
  const groundName = useRef();
  const groundDensity = useRef();
  const groundAdhesion = useRef();
  const groundFrictionАngle = useRef();
  const groundStiffness = useRef();

  const addGround = () => {
    props.addRow(groundID);
  };

  const removeGround = () => {
    props.removeRow(groundID);
  };

  const checkTypeNumber = (data) => {
    return data.length !== 0 && data !== "" && data > 0;
  };
  const checkTypeString = (data) => {
    return data.length !== 0 && data !== "";
  };

  const itemChangeHandler = (event) => {
    switch (event.target.name) {
      case GROUNDCOLUMNAME[1]:
        setNumberTyped(checkTypeNumber(event.target.value));
        break;
      case GROUNDCOLUMNAME[2]:
        setNameTyped(checkTypeString(event.target.value));
        event.target.style.height = event.target.scrollHeight + "px";
        break;
      case GROUNDCOLUMNAME[3]:
        setDensityTyped(checkTypeNumber(event.target.value));
        break;
      case GROUNDCOLUMNAME[4]:
        setAdhesionTyped(checkTypeNumber(event.target.value));
        break;
      case GROUNDCOLUMNAME[5]:
        setFrictionАngleTyped(checkTypeNumber(event.target.value));
        break;
      case GROUNDCOLUMNAME[6]:
        setStiffnessTyped(checkTypeNumber(event.target.value));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (
        isNumberTyped &&
        isNameTyped &&
        isDensityTyped &&
        isAdhesionTyped &&
        isFrictionАngleTyped &&
        isStiffnessTyped
      ) {
        setRowValid(true);
      } else setRowValid(false);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    isNumberTyped,
    isNameTyped,
    isDensityTyped,
    isAdhesionTyped,
    isFrictionАngleTyped,
    isStiffnessTyped
  ]);

  const itemBlurHandler = () => {
    isRowValid &&
      props.changeData({
        id: groundID,
        number: groundNumber.current.value, //#
        name: groundName.current.value,
        density: groundDensity.current.value, // удельный вес кН/м3
        adhesion: groundAdhesion.current.value, // коэффициент сцепления кПа
        frictionАngle: groundFrictionАngle.current.value, // угол внутреннего трения, градусы
        stiffness: groundStiffness.current.value // модуль деформаций, МПа
      });
  };

  return (
    <tr className={styles.ground_charact}>
      <td>
        {isRowValid ? (
          <span className={`${styles.iconDone} ${styles.icon_middle}`}>
            {ICONS.checkDone}
          </span>
        ) : (
          <span className={`${styles.iconUndone} ${styles.icon_middle}`}>
            {ICONS.checkUndone}
          </span>
        )}
      </td>
      <td>
        <InputGI
          name={GROUNDCOLUMNAME[1]}
          ref={groundNumber}
          type="number"
          onChange={itemChangeHandler}
          onBlur={itemBlurHandler}
        />
      </td>
      <td>
        <textarea
          rows="1"
          ref={groundName}
          id="t_input"
          name={GROUNDCOLUMNAME[2]}
          onChange={itemChangeHandler}
          onBlur={itemBlurHandler}
        ></textarea>
      </td>
      <td>
        <InputGI
          name={GROUNDCOLUMNAME[3]}
          ref={groundDensity}
          type="number"
          onChange={itemChangeHandler}
          onBlur={itemBlurHandler}
        />
      </td>
      <td>
        <InputGI
          name={GROUNDCOLUMNAME[4]}
          ref={groundAdhesion}
          type="number"
          onChange={itemChangeHandler}
          onBlur={itemBlurHandler}
        />
      </td>
      <td>
        <InputGI
          name={GROUNDCOLUMNAME[5]}
          ref={groundFrictionАngle}
          type="number"
          onChange={itemChangeHandler}
          onBlur={itemBlurHandler}
        />
      </td>
      <td>
        <InputGI
          name={GROUNDCOLUMNAME[6]}
          ref={groundStiffness}
          type="number"
          onChange={itemChangeHandler}
          onBlur={itemBlurHandler}
        />
      </td>
      <td>
        <section className={styles.controls}>
          <BtnGroundTable className={styles.icon_middle} onClick={addGround}>
            {ICONS.addItem}
          </BtnGroundTable>
          <BtnGroundTable className={styles.icon_middle} onClick={removeGround}>
            {ICONS.trashItem}
          </BtnGroundTable>
        </section>
      </td>
    </tr>
  );
};

export default GroundTableRow;
