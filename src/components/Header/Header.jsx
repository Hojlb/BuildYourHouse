import React from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/UserAuth";
import BtnUserAuthForm from "../../UI/Button/BtnUserAuthForm/BtnUserAuthForm";
import { ICONS } from "/src/constants/ICONS";

const Header = (props) => {
  const dispatch = useDispatch();
  const { name, surname, login } = props.userData;

  const signOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={styles["header"]}>
      <a href="#home">
        <div className={styles["header-logo"]}>
          <h2> {ICONS.home2} Remax</h2>
          <span>Build your house</span>
        </div>
      </a>

      {!props.isUserAuth && <h5>Войдите в систему. Введите логин и пароль</h5>}
      {props.isUserAuth && (
        <h3>Hello, {name && surname ? `${name} ${surname}` : login}</h3>
      )}
      {props.isUserAuth && (
        <BtnUserAuthForm onClick={signOut}>Sign out</BtnUserAuthForm>
      )}
    </header>
  );
};
export default Header;
