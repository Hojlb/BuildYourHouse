export const calcSummValues = (array, calcItem) => {
  return array.reduce((sum, current) => {
    return Math.round((sum + current[calcItem]) * 1000) / 1000;
  }, 0);
};
