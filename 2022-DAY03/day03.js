/*
Each line is split into two equal halves - left half is compartment 1, right half is compartment 2
Each letter (case-sensitive) represent an item - there will be one shared item between the two compartments
Lowercase item types a through z have priorities 1 through 26
Uppercase item types A throughh Z have priorities 27 through 52
Example test case line 1 gives a p as shared, which is 16
Suming the shared items gives a sum of 157
*/

const fs = require("fs");

const lines = fs
  .readFileSync("day03.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

function convertLetterToPriorityNumber(letter) {
  if (/[a-z]/.test(letter)) {
    //lowercase
    return letter.charCodeAt(0) - 96;
  } else {
    // uppercase
    return letter.charCodeAt(0) - 65 + 27;
  }
}

function part1() {
  const result = lines.map((line) => {
    const part1 = [...line.slice(0, line.length / 2)];
    const part2 = [...line.slice(line.length / 2)];

    let part1Set = new Set(part1);
    const intersection = part2.filter((x) => part1Set.has(x));
    const dedup = [...new Set(intersection)];

    return convertLetterToPriorityNumber(dedup[0]);
  });
  console.log(result.reduce((a, b) => a + b, 0));
}

function part2() {
  let sum = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const backpacks = [[...lines[i]], [...lines[i + 1]], [...lines[i + 2]]];

    let set = new Set(backpacks[0]);
    let intersection = backpacks[1].filter((x) => set.has(x));

    set = new Set(intersection);
    intersection = backpacks[2].filter((x) => set.has(x));

    const dedup = [...new Set(intersection)];

    sum += convertLetterToPriorityNumber(dedup[0]);
  }
  console.log(sum);
}

part1();
part2();
