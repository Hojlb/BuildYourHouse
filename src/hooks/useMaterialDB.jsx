import { useState, useCallback } from "react";

const useMaterialDB = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const getData = useCallback(async (applyData, link) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(link, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Request failed! (useMaterialDB())");
      }

      const dataResp = await response.json();
      applyData(dataResp);
    } catch (error) {
      setError(error.message || "Something went wrong! (useMaterialDB)");
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    isloading,
    getData
  };
};

export default useMaterialDB;
