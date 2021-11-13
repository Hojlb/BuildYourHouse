import React from "react";
import ItemMaterialDB from "../viewMaterialList/itemMaterialDB";
import styles from "./viewMaterialInDB.module.scss";

const ViewMaterialList = (props) => {
  let materialList = <p>List is empty</p>;

  if (props.materialList.length > 0) {
    materialList = (
      <ul className={styles["master-ul"]}>
        {props.materialList.map((item) => (
          <ItemMaterialDB key={item.id}>
            <span>{item.name} - </span>
            <span>{item.value}</span>
          </ItemMaterialDB>
        ))}
      </ul>
    );
  }

  let content = materialList;

  if (props.error) {
    content = <p>{props.error}</p>;
  }

  if (props.loading) {
    content = <p>Loading DB...</p>;
  }

  return (
    <div className={styles.box}>
      <h3>Material in database:</h3>
      {content}
    </div>
  );
};

export default ViewMaterialList;
