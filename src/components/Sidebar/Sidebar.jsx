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
              exact={item.name === "User" ? true : false}
              to={item.link}
              key={item.id}
            >
              <NavListItem disabled={!isAuth}>
                {item.icon}
                <div>{item.name}</div>
              </NavListItem>
            </NavLink>
          ))}
          {/* <NavLink exact to="/" onClick>
            <NavListItem isActive>
              {ICONS["home"]}
              <span>Home</span>
            </NavListItem>
          </NavLink>
          <NavLink to="/login">
            <NavListItem>
              {ICONS["user"]} <span>User</span>
            </NavListItem>
          </NavLink>
          <NavLink to="/calcLoads">
            <NavListItem>
              <span>Calc Loads</span>
            </NavListItem>
          </NavLink>
          <NavLink to="/calcFound">
            <NavListItem>
              <span>Calc Fund</span>
            </NavListItem>
          </NavLink>
          <NavLink to="/calcBrick">
            <NavListItem>
              {ICONS["brick"]} <span>Calk Brick</span>
            </NavListItem>
          </NavLink>
          <NavLink to="/settings">
            <NavListItem>
              {ICONS["settings"]} <span>settings</span>
            </NavListItem>
          </NavLink>
          <NavLink to="/about">
            <NavListItem>
              <span>About</span>
            </NavListItem>
          </NavLink> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
