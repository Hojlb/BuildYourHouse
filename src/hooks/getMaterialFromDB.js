import { useState, useCallback } from "react";

const getMaterialFromDB = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const getData = useCallback(async (applyData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-http-database-default-rtdb.firebaseio.com/materials/concrete_mortar.json",
        {
          method: "GET"
        }
      );

      if (!response.ok) {
        throw new Error("Request failed! (getMaterialFromDB())");
      }

      const dataResp = await response.json();
      applyData(dataResp);
    } catch (error) {
      setError(error.message || "Something went wrong! (getMaterialFromDB)");
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    isloading,
    getData
  };
};

export default getMaterialFromDB;
