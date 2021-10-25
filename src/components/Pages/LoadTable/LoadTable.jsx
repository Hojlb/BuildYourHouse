import React, { useState, useEffect } from "react";

import AddMaterialForm from "./addMaterialForm/addMaterialForm";
import ViewMaterialList from "./viewMaterialList/viewMaterialInDB";
import addMaterialInDB from "/src/hooks/addMaterialInDB";
import getMaterialFromDB from "/src/hooks/getMaterialFromDB";
import { useDispatch, useSelector } from "react-redux";
import { loadTableAction as ActLoad } from "/src/store/LoadTableStore";
import { calcSummValues } from "/src/lib/CalcSummArrayItem";

import LoadTHead from "./LoadTHead";
import LoadTRow from "./LoadTRow";
import LoadTResult from "./LoadTResult";
import styles from "./loadTable.module.scss";

const LoadTable = () => {
  const dispatch = useDispatch();
  const loadList = useSelector((state) => state.loadTable.loadList);
  const [materialFromDB, setMaterialFromDB] = useState([]);
  const { sendData } = addMaterialInDB();
  const { isLoading, error, getData } = getMaterialFromDB();

  const [summResult, setSummResult] = useState({
    charactLoadLine: 0,
    charactLoadArea: 0,
    designLoadArea: 0,
    designLoadLine: 0
  });

  const deleteItemHandler = (id) => {
    dispatch(ActLoad.removeLoadRow(id));
  };

  const addMaterialHandler = (material) => {
    sendData(material);
  };
  const setMaterialHandler = (materialObj) => {
    dispatch(ActLoad.changeLoadData(materialObj));
  };

  useEffect(() => {
    const transformData = (dataResp) => {
      const loadedMaterial = [];

      for (const materialKey in dataResp) {
        loadedMaterial.push({
          id: materialKey,
          name: dataResp[materialKey].name,
          value: dataResp[materialKey].value
        });
      }
      setMaterialFromDB(loadedMaterial);
    };

    getData(transformData);
  }, []);

  useEffect(() => {
    let prevState = loadList.map((item) => {
      return {
        chLLine: item.charactValueLoadLine,
        chLArea: item.charactValueLoadArea,
        dLLine: item.designValueLoadLine,
        dLArea: item.designValueLoadArea
      };
    });

    let summCharactLoadLine = calcSummValues(prevState, "chLLine");
    let summCharactLoadArea = calcSummValues(prevState, "chLArea");
    let summDesignLoadLine = calcSummValues(prevState, "dLLine");
    let summDesignLoadArea = calcSummValues(prevState, "dLArea");

    setSummResult({
      charactLoadLine: summCharactLoadLine,
      charactLoadArea: summCharactLoadArea,
      designLoadLine: summDesignLoadLine,
      designLoadArea: summDesignLoadArea
    });
  }, [loadList]);

  return (
    <fieldset className={styles}>
      <table>
        <caption>Сбор нагрузок</caption>
        <LoadTHead />
        <tbody>
          {loadList.map((item) => (
            <LoadTRow
              materialList={materialFromDB}
              key={item.id}
              currentValue={item}
              removeLoad={deleteItemHandler}
              setMaterialData={setMaterialHandler}
            />
          ))}
          <LoadTResult result={summResult} />
        </tbody>
      </table>
      <section className={}></section>
      <section className="">
        <AddMaterialForm addMaterial={addMaterialHandler} />
      </section>

      <section>
        <ViewMaterialList materialList={materialFromDB} />
      </section>
    </fieldset>
  );
};
export default LoadTable;