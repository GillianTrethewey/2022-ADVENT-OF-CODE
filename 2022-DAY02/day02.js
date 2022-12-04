const fs = require("fs");

const data = fs
  .readFileSync("day02.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n") // Split on newline
  .map((line) => line.split(" ")); // Parse each line into a number

// scores for playing rock, paper, scissors:
// rock gives 1 point
// paper gives 2 points
// scissors gives 3 points

const play = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

// symbols shorthand for opponent's plays are A, B, C
// for your plays are X, Y, Z

const inputMap = {
  A: play.rock,
  B: play.paper,
  C: play.scissors,
  X: play.rock,
  Y: play.paper,
  Z: play.scissors,
};

// Determine the score of win, lose, or draw combined with what you played
const points = (opponentPlay, yourPlay) => {
  if (opponentPlay === yourPlay) {
    return yourPlay + 3;
  }
  if (
    (opponentPlay === play.rock && yourPlay === play.paper) ||
    (opponentPlay === play.paper && yourPlay === play.scissors) ||
    (opponentPlay === play.scissors && yourPlay === play.rock)
  ) {
    // You win
    return yourPlay + 6;
  }
  // You lose
  return yourPlay;
};

// Put it all together ...
const problem1 = () => {
  const outcomes = data.map((e) => {
    const opponentPlay = inputMap[e[0]];
    const yourPlay = inputMap[e[1]];
    return points(opponentPlay, yourPlay);
  });
  console.log(outcomes.reduce((a, b) => a + b, 0));
};

const solution = {
  A: {
    X: play.scissors,
    Y: play.rock,
    Z: play.paper,
  },
  B: {
    X: play.rock,
    Y: play.paper,
    Z: play.scissors,
  },
  C: {
    X: play.paper,
    Y: play.scissors,
    Z: play.rock,
  },
};

const problem2 = () => {
  const outcomes = data.map((e) => {
    const opponentPlay = inputMap[e[0]];
    const yourPlay = solution[e[0]][e[1]];
    return points(opponentPlay, yourPlay);
  });
  console.log(outcomes.reduce((a, b) => a + b, 0));
};

problem1();
problem2();
