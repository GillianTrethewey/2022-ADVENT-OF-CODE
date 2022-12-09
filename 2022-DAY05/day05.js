const fs = require("fs");

const lines = fs
  .readFileSync("day05.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, ""); // remove all \r characters to avoid issues on Windows
// no trim since whitespaces at beginning of data
// template credit to @thibpat on GitHub

const [rawStacks, rawMoves] = lines.split("\n\n").map((x) => x.split("\n"));
const parsedStacks = rawStacks.map((line) =>
  [...line].filter((value, index) => index % 4 === 1)
);

const indexes = parsedStacks.pop(); // last array ['1', '2', '3', etc]

const stacks = {};

for (const line of parsedStacks) {
  // rearrange so the data columns are in their own array
  for (let i = 0; i < line.length; i++) {
    if (line[i] !== " ") {
      if (!stacks[indexes[i]]) {
        stacks[indexes[i]] = [];
      }
      stacks[indexes[i]].unshift(line[i]);
    }
  }
}

const moves = [];
for (const move of rawMoves) {
  const match = /move (\d+) from (\d+) to (\d+)/g.exec(move);
  moves.push({
    count: parseInt(match[1]),
    from: parseInt(match[2]),
    to: parseInt(match[3]),
  });
}

console.log(moves);

function part1() {
  const localStacks = JSON.parse(JSON.stringify(stacks));
  for (const move of moves) {
    for (let i = 0; i < move.count; i++) {
      const crate = localStacks[move.from].pop();
      localStacks[move.to].push(crate);
    }
  }
  console.log(
    indexes
      .map((value) => {
        const stack = localStacks[value];
        return stack[stack.length - 1];
      })
      .join("")
  );
} //BZLVHBWQF
function part2() {
  const localStacks = JSON.parse(JSON.stringify(stacks));
  for (const move of moves) {
    const crates = localStacks[move.from].splice(-move.count, move.count);
    localStacks[move.to] = localStacks[move.to].concat(crates);
  }

  console.log(
    indexes
      .map((value) => {
        const stack = localStacks[value];
        return stack[stack.length - 1];
      })
      .join("")
  );
}
part1();
part2();
