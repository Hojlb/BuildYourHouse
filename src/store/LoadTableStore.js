import { createSlice } from "@reduxjs/toolkit";
import { transformData } from "../lib/transformDataFromDB";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  id: "",
  type: "", // deadLoad, funcLoad, snowLoad, windLoad
  materialName: "",
  materialValue: 0,
  thicknessValue: 0,
  coeffLoad: 0,
  widthValue: 0,
  charactValueLoadArea: 0,
  charactValueLoadLine: 0,
  designValueLoadArea: 0,
  designValueLoadLine: 0
};

const loadTableSlice = createSlice({
  name: "loadTable",
  initialState: { loadList: [], materialList: [], functionLoadList: [] },
  reducers: {
    addLoadRow(state, action) {
      const load = Object.assign(
        {},
        { ...initialState, id: uuidv4() },
        action.payload
      );
      state.loadList = [...state.loadList, load];
    },

    removeLoadRow(state, action) {
      if (state.loadList.length === 1) {
        state.loadList = [{ ...initialState, id: uuidv4() }];
      } else {
        state.loadList = state.loadList.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    changeLoadData(state, action) {
      state.loadList = state.loadList.map((item) =>
        item.id === action.payload.id
          ? Object.assign({}, item, action.payload)
          : item
      );
    },

    updateMaterialList(state, action) {
      if (state.materialList.length !== action.payload.length) {
        let resData = transformData(action.payload);
        state.materialList = [...resData];
      }
    },

    updateFumcLoadList(state, action) {
      if (state.functionLoadList.length !== action.payload.length) {
        let resData = transformData(action.payload);
        state.functionLoadList = [...resData];
      }
    }
  }
});

export const loadTableAction = loadTableSlice.actions;
export default loadTableSlice.reducer;
