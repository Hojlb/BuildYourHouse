import React, { useState, useEffect } from "react";

import AddMaterialForm from "./addMaterialForm/addMaterialForm";
import ViewMaterialList from "./viewMaterialList/viewMaterialInDB";
import addMaterialToDB from "/src/hooks/addMaterialToDB";
import useMaterialDB from "/src/hooks/useMaterialDB";
import { useDispatch, useSelector } from "react-redux";
import { loadTableAction as ActLoad } from "/src/store/LoadTableStore";
import { calcSummValues } from "/src/lib/CalcSummArrayItem";

import HeadLoadTable from "./HeadLoad/HeadLoadTable";

import LoadTHead from "./LoadTHead";
import LoadTRow from "./LoadTRow";
import LoadHistory from "./loadHistory/LoadHistory";
import LoadTResult from "./LoadTResult";
import styles from "./loadTable.module.scss";

const LoadTable = () => {
  const deadLoadDBLink =
    "https://react-http-database-default-rtdb.firebaseio.com/materials/concrete_mortar.json";
  const funcLoadDBLink =
    "https://react-http-database-default-rtdb.firebaseio.com/functional_load.json";

  const dispatch = useDispatch();
  const loadList = useSelector((state) => state.loadTable.loadList);
  const { getData } = useMaterialDB();
  const { sendData } = addMaterialToDB();
  const [currentLoadList, setCurrentLoadList] = useState([]);
  const [currentLoadCoeff, setCurrentLoadCoeff] = useState(1);
  const [isSnowModalShow, setIsSnowModalShow] = useState(false);
  const [isWindModalShow, setIsWindModalShow] = useState(false);
  /* __________________________________________________________________ */
  const [isMaterialUpdate, setMaterialUpdate] = useState(false);
  const [isShowDB, setIsShowDB] = useState(false);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const [load, setLoad] = useState({
    name: "",
    value: "",
    isLoadSquare: false
  });

  const [summResult, setSummResult] = useState({
    charactLoadLine: 0,
    charactLoadArea: 0,
    designLoadArea: 0,
    designLoadLine: 0
  });

  const [typeOfLoad, setTypeOfLoad] = useState("");

  const changeTypeLoadHandler = (type) => {
    setTypeOfLoad(type);
  };

  useEffect(() => {
    const transformData = (dataResp) => {
      const newArray = [];

      for (const itmKey in dataResp) {
        newArray.push({
          id: itmKey,
          name: dataResp[itmKey].name,
          value: dataResp[itmKey].value
        });
      }
      setCurrentLoadList(newArray);
    };

    switch (typeOfLoad) {
      case "deadLoad": {
        getData(transformData, deadLoadDBLink);
        setCurrentLoadCoeff(1.35);
        break;
      }
      case "functionLoad": {
        getData(transformData, funcLoadDBLink);
        setCurrentLoadCoeff(1.5);
        break;
      }
      case "snow":
        setIsSnowModalShow(true);
        setCurrentLoadCoeff(1.5);
        break;
      case "wind":
        setIsWindModalShow(true);
        setCurrentLoadCoeff(1.5);
        break;
      default:
        break;
    }
  }, [typeOfLoad]);

  const deleteItemHandler = (id) => {
    dispatch(ActLoad.removeLoadRow(id));
  };

  const addMaterialHandler = (material) => {
    setMaterialUpdate(true);
    sendData(
      material,
      typeOfLoad === "deadLoad" ? deadLoadDBLink : funcLoadDBLink
    );
  };

  const showMaterialDBHandler = () => {
    setIsShowDB(!isShowDB);
  };
  const showHistoryHandler = () => {
    setIsShowHistory(!isShowHistory);
  };

  const setMaterialHandler = (materialObj) => {
    dispatch(ActLoad.changeLoadData(materialObj));
  };

  // useEffect(() => {
  //   setMaterialUpdate(false);
  //   const transformData = (dataResp) => {
  //     const loadedMaterial = [];

  //     for (const materialKey in dataResp) {
  //       loadedMaterial.push({
  //         id: materialKey,
  //         name: dataResp[materialKey].name,
  //         value: dataResp[materialKey].value
  //       });
  //     }
  //     setCurrentLoadList(loadedMaterial);
  //   };

  //   getFuncLoadList(transformData);
  // }, [isMaterialUpdate, getFuncLoadList]);

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
        <AddMaterialForm addMaterial={addMaterialHandler} />
        <ViewMaterialList materialList={currentLoadList} />
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
        loadList={currentLoadList}
        currentTypeLoad={typeOfLoad}
        currentLoadCoeff={currentLoadCoeff}
        // currentLoadItem={currentLoadItemHandler}
      />
      <table>
        <caption>Сбор нагрузок</caption>
        <LoadTHead
          showDB={showMaterialDBHandler}
          showDBControls={isShowDB}
          showHistory={showHistoryHandler}
        />
        <tbody>
          {/* {loadList.map((item) => (
            <LoadTRow
              key={item.id}
              removeLoad={deleteItemHandler}
              currentValue={item}
              material={material}
              setMaterialData={setMaterialHandler}
            />
          ))}
          <LoadTResult result={summResult} /> */}
        </tbody>
      </table>
      {isShowDB && materialDBControls()}
      {isShowHistory && displayHistoryList()}
    </fieldset>
  );
};
export default LoadTable;
