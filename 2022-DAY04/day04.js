const fs = require("fs");

const lines = fs
  .readFileSync("testday04.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline
// template credit to @thibpat on GitHub
// sorting function courtesy of @thibpat

function part1() {}
const res = lines.map((line) => {
  const [first, second] = line
    .split(",")
    .map((interval) => interval.split("-").map(Number))
    .sort((a, b) => {
      const oneSize = a[1] - a[0];
      const twoSize = b[1] - b[0];
      return twoSize - oneSize;
    });
  const isFirstContainingSecond =
    first[0] <= second[0] && second[1] <= first[1];

  //console.log({ first, second, isFirstContainingSecond });

  return isFirstContainingSecond ? 1 : 0;
});
console.log(res.reduce((a, b) => a + b, 0));

function part2() {
  const res = lines.map((line) => {
    const [first, second] = line
      .split(",")
      .map((interval) => interval.split("-").map(Number))
      .sort((a, b) => {
        const oneSize = a[1] - a[0];
        const twoSize = b[1] - b[0];
        return twoSize - oneSize;
      });

    const overlapOfAnyType = first[1] >= second[0] && second[1] >= first[0];
    // interval A - B and C - D
    // B must be greater than C
    // D must be greater than A
    return overlapOfAnyType ? 1 : 0;
  });

  console.log(res.reduce((a, b) => a + b, 0));
}
part1();
part2();
