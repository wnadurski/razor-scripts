const fs = require("node:fs");

const scriptFileName = "./record-movement.txt";
const pathFileName = "./path.json";
const path = JSON.parse(fs.readFileSync(pathFileName, "utf8"));
const movesListName = "moveList";
const miningDirection = "North";

const getListItem = (action, number = 1) => {
  let output = "";
  for (let i = 0; i < number; ++i) {
    output += `@pushlist '${movesListName}' "${action}"\n`;
  }
  return output;
};

let output =
  "if not listexists moveList\n" +
  "  @createlist moveList\n" +
  "endif\n" +
  "@clearlist moveList\n\n";

path.forEach((p, i, all) => {
  let previousDir = i > 0 ? all[i - 1] : undefined;
  previousDir =
    previousDir &&
    (typeof previousDir === "string" ? previousDir : previousDir[0]);
  if (p === "Mine" && previousDir && previousDir !== miningDirection) {
    output += getListItem(miningDirection);
    output += getListItem(p);
    output += getListItem(previousDir);
  } else if (typeof p === "string") {
    output += getListItem(p);
  } else {
    output += getListItem(p[0], p[1]);
  }
});

fs.writeFileSync(scriptFileName, output);

// const data = fs.readFileSync("./scratch_20.txt", "utf8");
//
// console.log(
//   data
//     .split("\n")
//     .slice(4)
//     .reduce((acc, line) => {
//       console.log(line);
//       if (line.startsWith("//") || line.trim() === "") {
//         return acc;
//       }
//       const last = acc.length > 0 ? acc[acc.length - 1] : undefined;
//       const action = line.trim().slice(22, -1);
//       console.log("action", action);
//       if (action === "") {
//         console.log("here");
//       }
//       if (!last) {
//         return [...acc, [action, 1]];
//       }
//       if (last[0] === action) {
//         last[1] += 1;
//         return acc;
//       }
//       return [...acc, [action, 1]];
//     }, [])
//     .map(([action, count]) => (count === 1 ? action : [action, count])),
// );
