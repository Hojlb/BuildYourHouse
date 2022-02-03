export const transformData = (dataResp) => {
  let resArray = [];
  for (const itmKey in dataResp) {
    resArray.push({
      id: itmKey,
      name: dataResp[itmKey].name,
      value: dataResp[itmKey].value
    });
  }
  return resArray;
};
