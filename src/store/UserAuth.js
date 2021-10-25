import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_USERS } from "../constants/ACCESS_USERS";

const tempUserAuth = {
  message: "",
  isAuthentication: false,
  access: "",
  user: { name: "", surname: "", login: "" }
};

let initialUserAuthState = localStorage.getItem("BYH_USER_AUTH")
  ? JSON.parse(localStorage.getItem("BYH_USER_AUTH"))
  : tempUserAuth;

const setDataUserLS = (payload) => {
  localStorage.setItem("BYH_USER_AUTH", JSON.stringify(payload));
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialUserAuthState,
  reducers: {
    login(state, action) {
      let result = {};
      const findUser = ACCESS_USERS.filter(
        (item) =>
          item.login === action.payload.login &&
          item.password === action.payload.password
      );
      //TODO: сделать проверку на сервере, и в зависимости от ответа сервера устанавливатеся значение
      if (findUser.length > 0) {
        result = {
          ...state,
          isAuthentication: true,
          user: {
            name: findUser[0].name,
            surname: findUser[0].surname,
            login: findUser[0].login
          },
          access: findUser[0].access
        };
      } else {
        return { ...state, message: "User is not find in database" };
      }

      setDataUserLS(result);
      return result;
    },

    logout(state) {
      setDataUserLS(tempUserAuth);
      state.isAuthentication = false;
      //  = {
      //   ...state,
      //   user: { ...tempUserAuth.user },
      //   isAuthentication: false,
      //   access: ""
      // };
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
