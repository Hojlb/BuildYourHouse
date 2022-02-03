import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserAuth";
import FoundationReducer from "./FoundationStore";
import LoadTableReducer from "./LoadTableStore";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: UserReducer,
    foundation: FoundationReducer,
    loadTable: LoadTableReducer,
    ui: uiSlice
  }
});

export default store;
