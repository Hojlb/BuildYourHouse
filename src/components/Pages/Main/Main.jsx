import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./Main.module.scss";
// import AddMaterialForm from "./components/addMaterialForm/addMaterialForm";
// import addMaterialInDB from "./hooks/addMaterialInDB";
// import ViewMaterialList from "./components/viewMaterialList/viewMaterialInDB";
// import getMaterialFromDB from "./hooks/getMaterialFromDB";
// import LoadTable from "./components/LoadTable/LoadTable";
// import { useSelector, useDispatch } from "react-redux";
// import AuthForm from "./components/AuthForm";
const Main = (props) => {
  // const [isUserProp, setUserProp] = useState(false);
  // const [isLoadsProp, setLoadsProp] = useState(false);
  // const [isFoundProp, setFoundProp] = useState(false);
  // const [isBrickProp, setBrickProp] = useState(false);
  // const [isSettingsProp, setSettingsProp] = useState(false);

  return (
    <main className={styles["main"]}>
      <Sidebar />
      <section className={styles["main_content"]}>{props.children}</section>
      {/* <h2>Add material in database</h2>
      <AddMaterialForm addMaterial={addMaterialHandler} />
      <ViewMaterialList
        materialList={materialFromDB}
        loading={isLoading}
        error={error}
      />
      <LoadTable materialList={materialFromDB} /> */}
    </main>
  );
};

export default Main;
