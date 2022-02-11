import React from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/UserAuth";
import BtnUserAuthForm from "../../UI/Button/BtnUserAuthForm/BtnUserAuthForm";
import { ICONS } from "/src/constants/ICONS";
import { Link } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const { name, surname, login } = props.userData;

  const signOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={styles["header"]}>
      <Link to="/home">
        <div className={styles["header-logo"]}>
          <h2> {ICONS.home2} Remax</h2>
          <span>Build your house</span>
        </div>
      </Link>

      {props.isUserAuth && (
        <h3>Hello, {name && surname ? `${name} ${surname}` : login}</h3>
      )}
      {props.isUserAuth && (
        <Link to="/">
          <BtnUserAuthForm onClick={signOut} className={styles.button}>
            Sign out
          </BtnUserAuthForm>
        </Link>
      )}
    </header>
  );
};
export default Header;
