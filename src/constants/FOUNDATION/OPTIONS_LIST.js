export const FOUNDATION_OPTIONS = [
  {
    //0
    name: "widthWall",
    labelName: "Толщина стены, мм",
    type: "number"
  },
  {
    //1
    name: "foundationSlabHeight",
    labelName: "Толщина фундаментной плиты, мм",
    type: "number"
  },
  {
    //2
    name: "widthOfBuild",
    labelName: "Ширина здания, м",
    type: "number"
  },
  {
    //3
    name: "benchmarkZeroFloor",
    labelName: "Отметка 0,000, м",
    type: "number",
    placeholder: "абсолютная"
  },
  {
    //4
    name: "benchmarkPlanning",
    labelName: "Красная отм. земли (в расчетном месте), м",
    type: "number",
    placeholder: "относительная"
  },
  {
    //5
    name: "benchmarkBottomFoundationSlab",
    labelName: "Отметка низа подушки, м",
    type: "number",
    placeholder: "относительная"
  },

  {
    //6
    name: "benchmarkTopWall",
    labelName: "Отметка верха фундаментных блоков, м",
    type: "number",
    placeholder: "относительная"
  },
  {
    //7
    name: "coeffGamma1",
    labelName: "Гамма 1 (от типа грунта и здания)",
    type: "number",
    options: { min: "1", max: "2", step: "0.05" }
  },
  {
    //8
    name: "benchmarkFloorBasement",
    labelName: "Отметка пола техподполья (подвала), м",
    type: "number"
  }
];
