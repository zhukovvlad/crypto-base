const findMaxInArray = (array) => {
  const newArray = [];
  array.map((item) => newArray.push(item[1]));
  console.log("Our new Array: ", newArray);
  console.log("Max element: ", Math.max(...newArray));
  return newArray;
};

export default findMaxInArray;
