const findMaxInArray = (array) => {
  return Math.max(...array.map((item) => item[1]));
};

export default findMaxInArray;
