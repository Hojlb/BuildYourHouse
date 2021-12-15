import {calcGroundResist, choseMcoeff, calcD1Coeff, calcDbCoeff, getDepthCoeff} from "../../../lib/Foundation/StripFoundation.js";

describe("Test for StripFoundation lib", () => {
	describe("Test for choseMcoeff fu", () => {
		it("checking array choseMcoeff", () => {
			expect(choseMcoeff(0))
				.toEqual([0, 1, 3.14]);
			expect(choseMcoeff(45))
				.toEqual([3.66, 15.64, 14.64]);
			expect(choseMcoeff(28))
				.toEqual([0.98, 4.93, 7.4]);
		});

		it("checking throws if friction angle is ...", () => {
			expect(() => choseMcoeff("-1"))
				.toThrow();
			expect(() => choseMcoeff("46"))
				.toThrow();
			expect(() => choseMcoeff("9iik"))
				.toThrow();
			expect(() => choseMcoeff("45")).not
				.toThrow();
		})
	});

	describe("Test for calcD1Coeff fu", () => {
		it("checking result value for without basement", () => {
			expect(calcD1Coeff(-2.3, -1.2))
				.toBeCloseTo(1.1);
		});
		it("checking result value for with basement", () => {
			expect(calcD1Coeff(-2.3, -2.0))
				.toBeCloseTo(0.3);
		});
		it("checking throws, when d1<0", () => {
			expect(() => calcD1Coeff(-2.3, -3.0)).toThrow();
		});

	});

	describe("Test for calcDbCoeff fu", () => {
		//width of building = WB
		it("WB=20.001m db=0.8 res=0", () => {
			expect(calcDbCoeff(20.001, -2.0, -1.2))
				.toBe(0);
		});
		it("WB=7m db=2 res=2", () => {
			expect(calcDbCoeff(7, -3.0, -1))
				.toBe(2);
		});
		it("WB=7m db=2.2 res=2", () => {
			expect(calcDbCoeff(7, -3.1, -0.9))
				.toBe(2);
		});
		it("WB=20m db=1.8 res=1.8", () => {
			expect(calcDbCoeff(20, -3.0, -1.2))
				.toBeCloseTo(1.8);
		});
	});

	describe("Test for getDepthCoeff fu", () => {
		it("case without-basement", () => {
			const testObj = {
				widthOfBuilding: 0,
				isBasement: false,
				benchmarkBottomSlab: -3.2,
				benchmarkPlan: -1.0,
				benchmarkFloorBasement: 0
			};

			expect(getDepthCoeff(testObj))
				.toEqual({d1: 2.2, db:0});
		});
		it("checking throws from calcD1Coeff fu", () => {
			const testObj1 = {
				widthOfBuilding:0,
				isBasement: false,
				benchmarkBottomSlab:0,
				benchmarkPlan:0,
				benchmarkFloorBasement:0
			};
			const testObj2 = {
				widthOfBuilding:0,
				isBasement: true,
				benchmarkBottomSlab:-1,
				benchmarkPlan:-4,
				benchmarkFloorBasement:-3
			};

			expect(() => getDepthCoeff(testObj1)).toThrowError(/calcD1Coeff/);

			expect(() => getDepthCoeff(testObj2)).toThrowError(/calcD1Coeff/);

		});
		it("case with-basement and truth value", () => {
			const testObj1 = {
				widthOfBuilding: 0,
				isBasement: true,
				benchmarkBottomSlab: -3.2,
				benchmarkPlan: -1,
				benchmarkFloorBasement: -2
			};
			const testObj2 = {
				widthOfBuilding: 0,
				isBasement: true,
				benchmarkBottomSlab: -3.2,
				benchmarkPlan: -1,
				benchmarkFloorBasement: -2.7
			};

			expect(getDepthCoeff(testObj1))
				.toEqual({d1: 1.2, db: 1});

			expect(getDepthCoeff(testObj2))
				.toEqual({d1: 0.5, db: 1.7});
	});
	});

	describe("Test for calcGroundResist fu", () => {
		it("checking the result with MathCAD block with entered of truth data - #1", () => {
			const initialData = {
				coeffGamma1: 1.25,
				coeffGamma2: 1,
				coeffK: 1.1,
				Mg: 0.51,
				coeffKz: 1,
				widthFoundation: 1,
				gamma2: 16,
				Mq: 3.06,
				d1: 0.9,
				gamma2Above: 16,
				db: 0.37,
				Mc: 5.66,
				adhesion: 0
			};

			expect(calcGroundResist(initialData))
				.toBeCloseTo(73.438);
		});
		it("checking the result with MathCAD block with entered of truth data - #2", () => {
			const initialData = {
				coeffGamma1: 1.25,
				coeffGamma2: 1,
				coeffK: 1.1,
				Mg: 0.51,
				coeffKz: 1,
				widthFoundation: 1,
				gamma2: 16,
				Mq: 3.06,
				d1: 0.9,
				gamma2Above: 16,
				db: 0.37,
				Mc: 5.66,
				adhesion: 0
			};

			expect(calcGroundResist(initialData))
				.toBeCloseTo(73.438);
		});

	});

});

// .toBeCloseTo - для чисел с плавающей точкой