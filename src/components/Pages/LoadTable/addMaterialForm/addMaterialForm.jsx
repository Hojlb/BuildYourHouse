import React, { useRef } from "react";
import { ConfirmBtn } from "/src/UI/Button/MaterialForm/ConfirmBtn";
import "./addMaterialForm.scss";

const AddMaterialForm = (props) => {
  const materialName = useRef();
  const materialValue = useRef();

  const submitMaterialHandler = (e) => {
    e.preventDefault();

    props.addMaterial({
      name: materialName.current.value,
      value: materialValue.current.value
    });
  };

  return (
    <form onSubmit={submitMaterialHandler} className="add-material">
      <h3>Database controls</h3>
      <div className={"add-material_itm"}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={materialName} />
      </div>

      <div className={"add-material_itm"}>
        <label htmlFor="value">Value</label>
        <input type="number" id="value" ref={materialValue} step="0.1" />
      </div>

      <ConfirmBtn className="btn">Add Material </ConfirmBtn>
    </form>
  );
};

export default AddMaterialForm;
