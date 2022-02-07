import React, { useState, useEffect } from "react";

import AddMaterialForm from "./addMaterialForm/addMaterialForm";
import ViewMaterialList from "./viewMaterialList/viewMaterialInDB";
import { useDispatch, useSelector } from "react-redux";
import { loadTableAction as ActLoad } from "/src/store/LoadTableStore";
import { calcSummValues } from "/src/lib/CalcSummArrayItem";
import { fetchLoadDB } from "/src/store/FetchLoadDB";
import HeadLoadTable from "./HeadLoad/HeadLoadTable";

import LoadTHead from "./LoadTHead";
import LoadTRow from "./LoadTRow";
import LoadHistory from "./loadHistory/LoadHistory";
import LoadTResult from "./LoadTResult";
import styles from "./loadTable.module.scss";

const LoadTable = () => {
  const dispatch = useDispatch();
  const loadList = useSelector((state) => state.loadTable.loadList);
  const materialList = useSelector((state) => state.loadTable.materialList);
  const functionLoadList = useSelector(
    (state) => state.loadTable.functionLoadList
  );
  const [currenTypeLoad, setCurrentLoadType] = useState([]);

  const [isSnowModalShow, setIsSnowModalShow] = useState(false);
  const [isWindModalShow, setIsWindModalShow] = useState(false);
  /* __________________________________________________________________ */
  const [isMaterialUpdate, setMaterialUpdate] = useState(false);
  const [isShowDB, setIsShowDB] = useState(false);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const [summResult, setSummResult] = useState({
    charactLoadLine: 0,
    charactLoadArea: 0,
    designLoadArea: 0,
    designLoadLine: 0
  });

  const changeTypeLoadHandler = (type) => {
    setCurrentLoadType(type);
  };

  const setMaterialHandler = (load) => {
    dispatch(ActLoad.addLoad(load));
  };

  useEffect(() => {
    switch (currenTypeLoad) {
      case "deadLoad": {
        dispatch(fetchLoadDB(currenTypeLoad));
        break;
      }
      case "functionLoad": {
        dispatch(fetchLoadDB(currenTypeLoad));
        break;
      }
      case "snow":
        setIsSnowModalShow(true);
        break;
      case "wind":
        setIsWindModalShow(true);
        break;
      default:
        break;
    }
  }, [currenTypeLoad, dispatch]);

  const deleteItemHandler = (id) => {
    dispatch(ActLoad.removeLoadRow(id));
  };
  const updLoadHandler = (load) => {
    dispatch(ActLoad.changeLoadData(load));
  };

  const addMaterialHandler = (material) => {
    setMaterialUpdate(true);
    // sendData(
    //   material,
    //   currenTypeLoad === "deadLoad" ? deadLoadDBLink : funcLoadDBLink
    // );
  };

  const showMaterialDBHandler = () => {
    setIsShowDB(!isShowDB);
  };
  const showHistoryHandler = () => {
    setIsShowHistory(!isShowHistory);
  };

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

  const materialDBControls = () => {
    return (
      <section className={`${styles.box35} ${styles.show}`}>
        {/* <AddMaterialForm addMaterial={addMaterialHandler} />
        <ViewMaterialList materialList={currentLoadList} /> */}
      </section>
    );
  };

  const displayHistoryList = () => {
    const resList = (
      <section className={`${styles.box35} ${styles.box75}`}>
        <LoadHistory loadList={loadList} summResult={summResult} />
      </section>
    );
    return resList;
  };

  return (
    <fieldset className={styles}>
      <HeadLoadTable
        changeTypeLoad={changeTypeLoadHandler}
        changeLoadItm={setMaterialHandler}
        loadList={
          currenTypeLoad === "deadLoad" ? materialList : functionLoadList
        }
        currentTypeLoad={currenTypeLoad}
      />
      <table>
        <caption>Сбор нагрузок</caption>
        <LoadTHead
          showDB={showMaterialDBHandler}
          showDBControls={isShowDB}
          showHistory={showHistoryHandler}
        />
        <tbody>
          {loadList.map((item) => (
            <LoadTRow
              key={item.idLoad}
              removeLoad={deleteItemHandler}
              currentValue={item}
              loadList={
                currenTypeLoad === "deadLoad" ? materialList : functionLoadList
              }
              typeOfLoad={currenTypeLoad}
              updLoad={updLoadHandler}
            />
          ))}
          <LoadTResult result={summResult} />
        </tbody>
      </table>
      {isShowDB && materialDBControls()}
      {isShowHistory && displayHistoryList()}
    </fieldset>
  );
};
export default LoadTable;
