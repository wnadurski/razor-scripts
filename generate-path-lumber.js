const fs = require("node:fs");

const scriptFileName = "./record-movement-lumber2.txt";
const pathFileName = "./path-lumber-2.txt";
const path = fs.readFileSync(pathFileName, "utf8");
const movesListName = "moveListLumber";
const miningDirection = "South";
const ignoreIndexes = [276];

const getListItem = (action, number = 1) => {
  let output = "";
  for (let i = 0; i < number; ++i) {
    output += `@pushlist '${movesListName}' "${action}"\n`;
  }
  return output;
};

let output =
  `if not listexists ${movesListName}
` +
  `  @createlist ${movesListName}
` +
  "endif\n" +
  `@clearlist ${movesListName}

`;

const dirMap = {
  0: "North",
  1: "Right",
  2: "East",
  3: "Down",
  4: "South",
  5: "Left",
  6: "West",
  7: "Up",
};
let currentIndex = 0;
path
  .split("\n")
  .map((line) => line.trim())
  .forEach((line) => {
    if (!line) {
      return;
    }
    if (line.includes("WalkAction")) {
      const [, dir] = line.split("|");
      if (ignoreIndexes.includes(currentIndex)) {
        return;
      }
      output += `@pushlist '${movesListName}' "${dirMap[dir]}"\n`;
      currentIndex++;
    }
    if (line.includes("DoubleClickAction") || line.includes("HotKeyAction")) {
      if (ignoreIndexes.includes(currentIndex)) {
        return;
      }
      output += `@pushlist '${movesListName}' "Mine"\n`;
      currentIndex++;
    }
  });

fs.writeFileSync(scriptFileName, output);

//dclick 'hatchet' backpack
// waitfortarget
// targetrelloc 0 1

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
