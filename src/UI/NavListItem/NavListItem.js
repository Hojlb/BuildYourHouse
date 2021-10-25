import styles from "./NavListItem.module.scss";

const NavListItem = (props) => {
  return (
    <li className={styles["list-item"]}>
      <button onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    </li>
  );
};
export default NavListItem;
