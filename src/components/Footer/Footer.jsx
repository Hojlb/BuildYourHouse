import React from "react";
import styles from "./Footer.module.scss";

const Footer = (props) => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["copy"]}>
        <a
          href="https://github.com/Hojlb"
          target="_blank"
          className={styles["link"]}
          title="my GitHub"
        >
          <p>2021 MaxPolonsky, </p>
          <i className="bx bxl-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
