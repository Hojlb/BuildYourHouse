import React from "react";
import NavListItem from "../../UI/NavListItem/NavListItem";
import { NAVLIST } from "../../constants/NAVLIST";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const navList = NAVLIST.map((item) => {
  let uId = uuidv4();
  return {
    ...item,
    id: uId
  };
});

const Sidebar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthentication);
  return (
    <aside className={styles["aside"]}>
      <nav>
        <ul className={!isAuth && styles["disableItem"]}>
          {navList.map((item, index) => (
            <NavLink
              exact
              to={item.link}
              key={item.id}
              activeClassName={styles.activeBtn}
            >
              <NavListItem disabled={!isAuth}>
                {item.icon}
                <div>{item.name}</div>
              </NavListItem>
            </NavLink>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
