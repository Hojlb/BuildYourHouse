import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./Main.module.scss";

const Main = (props) => {
  return (
    <main className={styles["main"]}>
      <Sidebar />
      <section className={styles["main_content"]}>{props.children}</section>
    </main>
  );
};

export default Main;
