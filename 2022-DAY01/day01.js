const fs = require("fs");

const file = fs.readFileSync("day01.txt", "utf8");
const data = file.split("\n").map((n) => Number(n));

// Problem 1

let caloriesList = [];

const groupTheData = (arr, key) => {
  let temp = [];
  const result = [];
  arr.forEach((e) => {
    if (e !== key) {
      temp.push(e);
    } else {
      result.push(temp);
      temp = [];
    }
  });
  return result;
};

let groupedData = groupTheData(data, 0);

caloriesList.push(
  groupedData.map((e) => e.reduce((a, c) => a + parseInt(c), 0))
);

caloriesList = caloriesList[0];
let elfWithMax = Math.max(...caloriesList);

console.log(`Maximum Calories: ${elfWithMax}`);

// Problem 2
let topThreeCalories = [...caloriesList]
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, c) => a + Number(c), 0);

console.log(`Sum of Top 3 Calories: ${topThreeCalories}`);
