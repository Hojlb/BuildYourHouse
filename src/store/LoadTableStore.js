import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  id: "",
  materialName: "--Select--",
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
  initialState: { loadList: [{ ...initialState, id: uuidv4() }] },
  reducers: {
    addLoadRow(state) {
      let prevState = [...state.loadList];
      // let prevIndex = prevState.findIndex((item) => item.id === action.payload);
      // prevState.splice(prevIndex + 1, 0, { ...initialState, id: uuidv4() });
      state.loadList = [...prevState, { ...initialState, id: uuidv4() }];
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
    }
  }
});

export const loadTableAction = loadTableSlice.actions;
export default loadTableSlice.reducer;
