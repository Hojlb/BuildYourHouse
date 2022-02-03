import { loadTableAction } from "./LoadTableStore";
import { uiActions } from "./uiSlice";

export const fetchLoadDB = (type) => {
  return async (dispatch) => {
    const deadLoadDBLink =
      "https://react-http-database-default-rtdb.firebaseio.com/materials/concrete_mortar.json";
    const funcLoadDBLink =
      "https://react-http-database-default-rtdb.firebaseio.com/functional_load.json";

    const fetchData = async (link) => {
      const response = await fetch(link, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(`Request failed! (in FetchLoadDB - connect to ${link}`);
      }

      const dataResp = await response.json();
      return dataResp;
    };

    try {
      if (type === "deadLoad") {
        let response = await fetchData(deadLoadDBLink);
        dispatch(loadTableAction.updateMaterialList(response));
      } else {
        let response = await fetchData(funcLoadDBLink);
        dispatch(loadTableAction.updateFumcLoadList(response));
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message
        })
      );
    }
  };
};

export const sendLoadToDB = () => {
  return async (dispatch) => {};
};
