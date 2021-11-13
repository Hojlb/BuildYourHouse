import { TableBtn as BtnLoadTable } from "/src/UI/Button/Table/ControlsBtn";
import { useDispatch } from "react-redux";
import { loadTableAction as ActLoad } from "/src/store/LoadTableStore";
import { ICONS } from "/src/constants/ICONS";
import styles from "./loadTable.module.scss";

const LoadHeadTable = (props) => {
  const isShow = props.showDBControls;
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(ActLoad.addLoadRow());
  };

  const showMaterialDBHandler = () => {
    props.showDB();
  };

  return (
    <thead>
      <tr>
        <th> Материал </th>
        <th> Толщина, мм </th>
        <th> Норм. зн. нагрузки, кН/м2</th>
        <th> Коэф. нагрузки</th>
        <th> Расч. зн. нагрузки, кН/м2</th>
        <th> Грузования ширина, мм</th>
        <th> Норм. зн. нагрузки, кН/м</th>
        <th> Расч. зн. нагрузки, кН/м</th>
        <th>
          <BtnLoadTable className={styles.icon_middle} onClick={addItemHandler}>
            {ICONS.addItem}
          </BtnLoadTable>
          <BtnLoadTable
            className={styles.icon_middle}
            onClick={showMaterialDBHandler}
          >
            {isShow ? ICONS.show : ICONS.hidden}
          </BtnLoadTable>
        </th>
      </tr>
    </thead>
  );
};

export default LoadHeadTable;
