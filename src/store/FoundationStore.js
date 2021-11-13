import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const tempGroundState = {
  number: "", //#
  name: "",
  density: "", // удельный вес кН/м3
  adhesion: "", // коэффициент сцепления кПа
  frictionАngle: "", // угол внутреннего трения, градусы
  stiffness: "", // модуль деформаций, МПа
  depth: "" //мощность слоя, м
  // добавить пористость ?!
};

//Должно быть централизовано из одного места запись в localStorage
// сейчас из UserAuth и FoundationStore

// let initialFoundationState = localStorage.getItem("BYH_USER_AUTH")
//   ? JSON.parse(localStorage.getItem("BYH_USER_AUTH"))
//   : tempGroundState;

// const setDataStorage = (payload) => {
//   localStorage.setItem("BYH_USER_AUTH", JSON.stringify(payload));
// };

const foundationSlice = createSlice({
  name: "foundation",
  initialState: { ground: [{ ...tempGroundState, id: uuidv4() }], options: {} },
  reducers: {
    addGroundRow(state, action) {
      let prevState = [...state.ground];
      let prevIndex = prevState.findIndex((item) => item.id === action.payload);
      prevState.splice(prevIndex + 1, 0, { ...tempGroundState, id: uuidv4() });
      state.ground = [...prevState];
    },

    removeGroundRow(state, action) {
      if (state.ground.length === 1) {
        state.ground = [{ ...tempGroundState, id: uuidv4() }];
      } else {
        state.ground = state.ground.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    changeGroundData(state, action) {
      state.ground = state.ground.map((item) =>
        item.id === action.payload.id
          ? Object.assign({}, item, action.payload)
          : item
      );
    }
  }
});

export const foundationAction = foundationSlice.actions;
export default foundationSlice.reducer;
