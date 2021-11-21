import "./RadioBasement.scss";
const RadioBasement = (props) => {
  return (
    <section className="radio_section">
      <h3>Наличие подполья</h3>
      <div className="r_s_item">
        <label htmlFor="withBasement">С подпольем</label>
        <input
          type="radio"
          id="withBasement"
          name="basement"
          value="withBasement"
          onChange={props.onChange}
        />
      </div>
      <div className="r_s_item">
        <label htmlFor="withoutBasement">Без подполья</label>
        <input
          checked={!props.isBasement}
          type="radio"
          id="withoutBasement"
          name="basement"
          value="withoutBasement"
          onChange={props.onChange}
        />
      </div>
    </section>
  );
};
export default RadioBasement;
