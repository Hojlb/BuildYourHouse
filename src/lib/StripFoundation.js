// сделать разбивку данных в объект типа
let groundDB = [
  {
    number: 1, //#
    name: "песок ср. ср пр.",
    density: 16, // удельный вес кН/м3
    adhesion: 2.5, // коэффициент сцепления кПа
    frictionАngle: 20, // угол внутреннего трения, градусы
    stiffness: 30 // модуль деформаций, МПа
    // добавить пористость ?!
  }
];
console.log(groundDB);

let commonHeightProp = {
  optionOfScheme: "without-basement", // вариант конструктивной схемы фундаментов

  benchmarkZeroFloor: 145.9, //отметка 0.000
  benchmarkPlan: -0.34, //отметка планировки
  benchmarkBottomSlab: -1.61, //отметка низа подушки

  benchmarkFloorBasement: -0.71, // отметка пола техподполья

  benchmarkTopWall: -0.3, // отметка верха длоков (стены)

  heightSlab: 300, // высота подушки, будет меняться по мере расчета если она
  //менее 500 и принят сборный вариант фундамента
  widthOfBuild: 21 // ширина здания - для db
};

console.log(commonHeightProp);

function calcD1Coeff(benchmarkBottomSlab, benchmarkSecondary) {
  // TODO: добавить округление результата d1 до 2х знаков после запятой
  return -benchmarkBottomSlab + benchmarkSecondary;
}

function calcDbCoeff(widthOfBuilding, benchmarkFloorBasement, benchmarkPlan) {
  // TODO: добавить округление результата db до 2х знаков после запятой
  let db = -benchmarkFloorBasement + benchmarkPlan;

  return widthOfBuilding <= 20 && db >= 2 ? 2 : widthOfBuilding > 20 ? 0 : db;
}

function getDepthCoeff(obj) {
  const {
    widthOfBuilding,
    optionOfScheme,
    benchmarkBottomSlab,
    benchmarkPlan,
    benchmarkFloorBasement
  } = obj;
  switch (optionOfScheme) {
    case "without-basement":
      return {
        d1: calcD1Coeff(benchmarkBottomSlab, benchmarkPlan),
        db: 0
      };
    case "with-basement":
      return {
        d1: calcD1Coeff(benchmarkBottomSlab, benchmarkFloorBasement),
        db: calcDbCoeff(widthOfBuilding, benchmarkFloorBasement, benchmarkPlan)
      };

    default:
      console.error("check getDepthCoeff");
  }
}

console.log(getDepthCoeff(commonHeightProp));

// otherCoeff - коэффициенты гамма1, гамма2 и k - гамма1 зависит от типа грунта
//гамма2 от типа здания, жесткости/гибкости
//k - от методики определения характеристик грунтов
function calcGroundResist(
  widthSlab,
  frictionАngle,
  adhesion,
  depthCoeff = {},
  otherCoeff
) {}

function mainFu() {
  // будет анализировать результаты и выдавать результат
}
