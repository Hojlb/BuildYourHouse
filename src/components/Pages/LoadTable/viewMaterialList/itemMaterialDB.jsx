import React from "react";

const ItemMaterialDB = (props) => {
  return <li key={props.id}>{props.children}</li>;
};

export default ItemMaterialDB;
