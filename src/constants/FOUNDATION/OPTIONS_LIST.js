export const FOUNDATION_OPTIONS = [
  {
    //0
    id: "widthWall",
    labelName: "Толщина стены, мм",
    type: "number"
  },
  {
    //1
    id: "foundationSlabHeight",
    labelName: "Толщина фундаментной плиты, мм",
    type: "number"
  },
  {
    //2
    id: "widthOfBuild",
    labelName: "Ширина здания, м",
    type: "number"
  },
  {
    //3
    id: "benchmarkZeroFloor",
    labelName: "Отметка 0,000, м",
    type: "number"
  },
  {
    //4
    id: "benchmarkPlanning",
    labelName: "Красная отм. земли (в расчетном месте), м",
    type: "number"
  },
  {
    //5
    id: "benchmarkBottomFoundationSlab",
    labelName: "Отметка низа подушки, м",
    type: "number"
  },
  {
    //6
    id: "benchmarkFloorBasement",
    labelName: "Отметка пола техподполья (подвала), м",
    type: "number"
  },
  {
    //7
    id: "benchmarkTopWall",
    labelName: "Отметка верха фундаментных блоков, м",
    type: "number"
  },
  {
    //8
    id: "coeffGamma1",
    labelName: "Гамма 1 (от типа грунта и здания)",
    type: "number",
    options: { min: "1", max: "2", step: "0.05" }
  }
];
