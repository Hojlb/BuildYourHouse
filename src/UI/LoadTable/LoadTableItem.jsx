import React from "react";

const LoadTableItem = (props) => {
  return (
    <div>
      <select name="material">
        {props.materialList.map((item) => {
          return (
            <option key={item.id} value="item.name">
              {item.name}
            </option>
          );
        })}
      </select>
      <input type="number" />
      <input type="text" />
    </div>
  );
};
export default LoadTableItem;
