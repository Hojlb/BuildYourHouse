import React, { useState } from "react";
import GroundTable from "./GroundTable/GroundTable";
import { useDispatch, useSelector } from "react-redux";
import { foundationAction as FAction } from "../../../store/FoundationStore";
import styles from "./Foundation.module.scss";

const Foundation = () => {
  const dispatch = useDispatch();
  const groundList = useSelector((state) => state.foundation.ground);

  const addGround = (id) => {
    dispatch(FAction.addGroundRow(id));
  };

  const removeGround = (id) => {
    dispatch(FAction.removeGroundRow(id));
  };

  const changeGroundData = (data) => {
    dispatch(FAction.changeGroundData(data));
  };

  return (
    <section className={styles.foundation}>
      <GroundTable
        ground={groundList}
        addGroundRow={addGround}
        removeGroundRow={removeGround}
        changeData={changeGroundData}
      />
    </section>
  );
};

export default Foundation;
