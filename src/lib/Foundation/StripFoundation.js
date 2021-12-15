import { MCOEFF } from "./constants/MCOEFF";
// сделать разбивку данных в объект типа
const groundDB = [
  {
    number: 1, //#
    name: "песок ср. ср пр.",
    density: 16, // удельный вес кН/м3
    adhesion: 2.5, // коэффициент сцепления кПа
    frictionAngle: 20, // угол внутреннего трения, градусы
    stiffness: 30 // модуль деформаций, МПа
    // добавить пористость ?!
  }
];

const options = {
  widthWall: "", //
  foundationSlabHeight: "", //
  widthOfBuild: "", //
  benchmarkZeroFloor: "", //
  benchmarkPlanning: "", //hplan
  benchmarkBottomFoundationSlab: "", //hpd
  benchmarkTopWall: "", //hbl
  coeffGamma1: "", //
  withBasement: false,
  benchmarkFloorBasement: "0.000"
};

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

const Rounder = (exp, range) => {
  return Math.round(exp * range) / range;
};

//tested
export function choseMcoeff(frictionAngle) {
  if (frictionAngle > 45 || frictionAngle < 0 || isNaN(frictionAngle))
    throw new Error(
      "choseMcoeff: Проверьте правильность ввода значений угла внутреннего трения"
    );
  else return MCOEFF[frictionAngle];
}

//tested
export function calcD1Coeff(benchmarkBottomSlab, benchmarkSecondary) {
  let d1 = Rounder(-benchmarkBottomSlab + benchmarkSecondary, 1000);

  if (d1 <= 0) throw new Error("calcD1Coeff: check entry benchmarks");
  else return d1;
}

//tested
export function calcDbCoeff(
  widthOfBuilding,
  benchmarkFloorBasement,
  benchmarkPlan
) {
  let db = Rounder(-benchmarkFloorBasement + benchmarkPlan, 1000);

  return widthOfBuilding <= 20 && db >= 2
    ? 2
    : widthOfBuilding > 20 || db <= 0
    ? 0
    : db;
}
//tested
export function getDepthCoeff(obj) {
  let {
    widthOfBuilding = 0,
    isBasement = false,
    benchmarkBottomSlab = 0,
    benchmarkPlan = 0,
    benchmarkFloorBasement = 0
  } = obj;

  return !isBasement
    ? {
        d1: calcD1Coeff(benchmarkBottomSlab, benchmarkPlan),
        db: 0
      }
    : {
        d1: calcD1Coeff(benchmarkBottomSlab, benchmarkFloorBasement),
        db: calcDbCoeff(widthOfBuilding, benchmarkFloorBasement, benchmarkPlan)
      };
}
// testing
// otherCoeff - коэффициенты гамма1, гамма2 и k - гамма1 зависит от типа грунта
//гамма2 от типа здания, жесткости/гибкости и ...
//k - от методики определения характеристик грунтов
export function calcGroundResist({
  coeffGamma1,
  coeffGamma2,
  coeffK,
  Mg,
  coeffKz,
  widthFoundation,
  gamma2,
  Mq,
  d1,
  gamma2Above,
  db,
  Mc,
  adhesion
}) {
  let coeff = Rounder((coeffGamma1 * coeffGamma2) / coeffK, 100);
  let MgProduct = Rounder(Mg * coeffKz * widthFoundation * gamma2, 1000);
  let MqProduct = Rounder(
    Mq * d1 * gamma2Above + (Mq - 1) * db * gamma2Above,
    1000
  );
  let McProduct = Rounder(Mc * adhesion, 1000);

  return Rounder(coeff * (MgProduct + MqProduct + McProduct), 1000);
}

export function CalcWidthFoundationCommon(ground) {
  let { frictionAngle, adhesion, density } = ground;
  let widthFoundation = 0;
  let groundRes = 0;
  let coeffGamma1 = 1;
  let coeffGamma2 = 1;
  let coeffK = 1;
  let [Mg, Mq, Mc] = choseMcoeff(frictionAngle);
  let coeffKz = 1;
  let gamma2Above = 16;
  let [d1, db] = getDepthCoeff();

  if (widthFoundation === 0 && groundRes === 0) {
    groundRes = calcGroundResist({
      coeffGamma1,
      coeffGamma2,
      coeffK,
      adhesion,
      Mg,
      coeffKz,
      widthFoundation: 1.2,
      gamma2: density,
      Mq,
      d1,
      gamma2Above,
      db,
      Mc
    });
  }

  // будет анализировать результаты и выдавать результат
}
