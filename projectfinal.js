const GAME_STEPS = ["SETUP_PLAYER", "SETUP_BOARD", "GAME_START"];
let gameStep = 0;

function print(arg, color) {
  if (typeof arg === "object") console.log(arg);
  else console.log("%c" + arg, `color: ${color};`);
}

function printSectionTitle(title, count = 20) {
  let dash = "-";
  let countDash = dash.repeat(20);
  let newSection = countDash + title + countDash;
  print(newSection, "blue");
}

let player = {
  name: "",
  level: 1,
  items: [{}, {}], //(array of objects)
  skills: [
    //(array of objects - will have 2 skill objects: confuse and steal)
    { name: "confuse" },
    { name: "steal" }
  ],
  attack: 10,
  speed: 3000,
  hp: 100,
  gold: 0, //(number - 0 to start. Can get gold by selling items to the tradesman)
  exp: 0, //(number - 0 to start. Experience points, increase when slaying monsters)
  type: "player",
  position: {} //(object - can be left out and set when needed)
  //getMaxHp (function - a method that returns max hp. Value is level * 100, e.g. level 2 -> 200 max hp)
  //levelUp (function - a method to update the level and the different properties affected by a level change. Level up happens when exp >= [player level * 20])
  //getExpToLevel (function - a method returning exp required to level. Value is level * 20, e.g. level 2 -> 40exp required)
};

// The items property will need to be a new array of cloned item objects
function createPlayer(name, level = 1, items = []) {
  player.name = name;
  print(
    "Welcome " +
      player.name +
      "!" +
      " You are at level " +
      player.level +
      "." +
      " You have these items: " +
      "."
  );
}

// Array of item objects. These will be used to clone new items with the appropriate properties.
const items = [
  {
    name: "Common potion",
    type: "potion",
    value: 5,
    rarity: 0
    //use: player => hp + 25 //restores 25hp to the specified target
  },
  {
    name: "Common bomb",
    type: "bomb",
    value: 7,
    rarity: 0
    //use: //deals 50hp damage to the specified target
  },
  {
    name: "Epic key",
    type: "key",
    value: 150,
    rarity: 3
    //use: //Unlocks the door to a dungeon
  }
];

// Clones an array of objects
// returns a new array of cloned objects. Useful to clone an array of item objects
//{original, clone if original === clone return true else return false}
function cloneArray(objs) {
  let newArr = [];
  for (let i = 0; i < objs.length; i++) {
    newArr[i] = objs[i];
  }
  return newArr;
}

cloneArray(items);

function createBoard(rows, columns) {
  for (x = 0; x < rows; x++) {
    board[x] = [];
    for (y = 0; y < columns; y++) {
      if (x === 0 || x === rows - 1 || y === 0 || y === columns - 1) {
        board[x][y] = "#";
      } else {
        board[x][y] = ".";
      }
    }
  }
  return board;
}

function printBoard() {
  // Prints the board
  let boardStr = "";
  for (x = 0; x < board.length; x++) {
    for (y = 0; y < board[0].length; y++) {
      boardStr += board[x][y];
    }
    boardStr += "\n";
  }
  print(boardStr);
}

// Creates the board and places player
function initBoard(rows, columns) {
  return createBoard(rows, columns);
}

// Sets the position property of the player object to be in the middle of the board
// You may need to use Math methods such as Math.floor()
function placePlayer() {
  let x = Math.floor(board.length / 2);
  let y = Math.floor(board[0].length / 2);
  board[x][y] = "P";
  return board;
}

initBoard(7, 15);
placePlayer();
printBoard();

function setupPlayer() {
  printSectionTitle("SETUP PLAYER");
  print(
    "Please create a player using the createPlayer function. Usage: createPlayer('Bob')"
  );
  print(
    "You can optionally pass in a level and items, e.g. createPlayer('Bob', 3, [items[0], items[2]]). items[0] refers to the first item in the items variable"
  );
  print("Once you're done, go to the next step with next()");
}

function setupBoard() {
  printSectionTitle("SETUP BOARD");
  print("Please create a board using initBoard(rows, columns)");
  print(
    "Setup monsters, items and more using createMonster(attr), createItem(item, pos), createTradesman(items, pos), createDungeon(pos), updateBoard(entity)"
  );
  print("Once you're done, go to the next step with next()");
}

function startGame() {
  printSectionTitle("START GAME");
  print("Hello " + player.name);
  print(
    "You are ready to start your adventure. Use move('U' | 'D' | 'L' | 'R') to get going."
  );
  printBoard();
}

function gameOver() {
  printSectionTitle("GAME OVER");
}

function next() {
  gameStep++;
  run();
}

function run() {
  switch (GAME_STEPS[gameStep]) {
    case "SETUP_PLAYER":
      setupPlayer();
      break;
    case "SETUP_BOARD":
      setupBoard();
      break;
    case "GAME_START":
      startGame();
      break;
  }
}

print("Welcome to the game!", "gold");
print("Follow the instructions to setup your game and start playing");

run();
