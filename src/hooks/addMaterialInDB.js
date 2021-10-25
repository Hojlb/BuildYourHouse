import { useState, useCallback } from "react";

const addMaterialInDB = (material) => {
  const sendData = useCallback(async (data) => {
    try {
      const response = await fetch(
        "https://react-http-database-default-rtdb.firebaseio.com/materials/concrete_mortar.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const dataResp = await response.json();
      console.log(dataResp);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong! (addMaterialInDB)"
      );
    }
  }, []);

  return {
    sendData
  };
};
export default addMaterialInDB;
