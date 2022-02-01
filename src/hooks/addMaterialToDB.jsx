import { useCallback } from "react";

const addMaterialToDB = () => {
  const sendData = useCallback(async (data, link) => {
    try {
      const response = await fetch(link, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json"
        }
      });
      const dataResp = await response.json();
      console.log(dataResp);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong! (addMaterialToDB)"
      );
    }
  }, []);

  return {
    sendData
  };
};
export default addMaterialToDB;
