import React from "react";

const LoadHistoryItm = (props) => {
  const { list } = props;

  return (
    <React.Fragment>
      <div className="table-col">
        <p>
          {list.nameLoad} * {list.thicknessValue} (мм)
        </p>
      </div>
      <div className="table-col">
        <p>
          норм {list.charactValueLoadArea}(кПа) * {list.coeffLoad}
        </p>
        <p> расч{list.designValueLoadArea} (кПа)</p>
      </div>

      {list.widthValue === 0 ? (
        <div></div>
      ) : (
        <div className="table-col">
          <p>
            норм {list.charactValueLoadLine}(кН/м) * {list.coeffLoad}
          </p>
          <p>расч {list.designValueLoadLine}(кН/м)</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoadHistoryItm;
