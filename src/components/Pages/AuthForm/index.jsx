import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/UserAuth";
import BtnUserAuthForm from "../../../UI/Button/BtnUserAuthForm/BtnUserAuthForm";
import styles from "./AuthForm.module.scss";
import { Redirect } from "react-router-dom";

const AuthForm = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthentication);
  const errorMessage = useSelector((state) => state.auth.message);

  const loginRef = useRef(null);
  const passwordRef = useRef();

  // useEffect(() => {
  //   loginRef.current.focus();
  // }, []);

  const submitAuth = (e) => {
    e.preventDefault();
    dispatch(
      authActions.login({
        login: loginRef.current.value,
        password: passwordRef.current.value
      })
    );
  };

  const userSignInForm = (
    <form onSubmit={submitAuth} action="">
      <section>
        <div className={styles["auth-form-item"]}>
          <label htmlFor="nameUF">Login</label>
          <input type="text" ref={loginRef} id="nameUF" />
        </div>
        <div className={styles["auth-form-item"]}>
          <label htmlFor="passUF">Password</label>
          <input type="password" ref={passwordRef} id="passUF" />
        </div>
      </section>
      {{ errorMessage } && <span> {errorMessage}</span>}
      <BtnUserAuthForm onClick={submitAuth}>Sign in</BtnUserAuthForm>
    </form>
  );

  return (
    <div className={styles["auth-form"]}>
      {(!isAuth && userSignInForm) || <Redirect to="/calcLoads" />}
    </div>
  );
};

export default AuthForm;
