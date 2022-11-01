import calculateCorrelation from "calculate-correlation";

const findCorrelation = (coinsArray) => {
  let firstArray = coinsArray[0];
  let secondArray = coinsArray[1];

  const newFirstArray = [];
  const newSecondArray = [];
  firstArray.map((item) => newFirstArray.push(item[0]));
  secondArray.map((item) => newSecondArray.push(item[0]));
  const filteredCommonArray = newFirstArray.filter((item) =>
    newSecondArray.includes(item)
  );

  console.log(filteredCommonArray);
  const finalArray = [];

  for (let i = 0; i < filteredCommonArray.length; i++) {
    let firstItem = firstArray.filter(
      (item) => item[0] === filteredCommonArray[i]
    );
    let secondItem = secondArray.filter(
      (item) => item[0] === filteredCommonArray[i]
    );
    //const correlation = calculateCorrelation(firstItem, secondItem);
    //console.log(correlation);
    finalArray.push([
      filteredCommonArray[i],
      firstItem[0][1],
      secondItem[0][1],
    ]);
  }

  const finalArr1 = [];
  finalArray.map((item) => finalArr1.push(item[1]));
  const finalArr2 = [];
  finalArray.map((item) => finalArr2.push(item[2]));
  const correlation = calculateCorrelation(finalArr1, finalArr2);

  return {
    arrayWithStamps: finalArray,
    correlation: correlation,
    initialTimeStamp: filteredCommonArray[0],
    finalTimeStamp: filteredCommonArray.slice(-1),
  };
};

export default findCorrelation;
