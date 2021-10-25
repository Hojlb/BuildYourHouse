import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserAuth";
import FoundationReducer from "./FoundationStore";
import LoadTableReducer from "./LoadTableStore";

const store = configureStore({
  reducer: {
    auth: UserReducer,
    foundation: FoundationReducer,
    loadTable: LoadTableReducer
  }
});

export default store;
