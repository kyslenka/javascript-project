/*
NOTE: You will need to add and modify code in this file to complete this project.
I have defined a few functions and variables to help guide you but that doesn't mean no other variables or functions are necessary.
If you think you have a better / different way to do things, you are free to do so :)
*/
const GAME_STEPS = ["SETUP_PLAYER", "SETUP_BOARD", "GAME_START"];
let gameStep = 0; // The current game step, value is index of the GAME_STEPS array.
let board = [];

// Utility function to print messages with different colors. Usage: print('hello', 'red');
function print(arg, color) {
  if (typeof arg === "object") console.log(arg);
  else console.log("%c" + arg, `color: ${color};`);
}

// Prints a blue string with the indicated number of dashes on each side of the string. Usage: printSectionTitle('hi', 1) // -hi-
// We set a default value for the count to be 20 (i.e. 20 dashes '-')
function printSectionTitle(title, count = 20) {
  let dash = "-";
  let countDash = dash.repeat(20);
  let newSection = countDash + title + countDash;
  print(newSection, "blue");
}

const RARITY_LIST = ["Common", "Unusual", "Rare", "Epic"];

// Array of item objects. These will be used to clone new items with the appropriate properties.
let items = [
  {
    name: "Common potion",
    type: "potion",
    value: 5,
    rarity: 0
    //use: player => player.hp + 25 //restores 25hp to the specified target
  },
  {
    name: "Unusual potion",
    type: "potion",
    value: 10,
    rarity: 1
    //use: player => player.hp + 25 //restores 25hp to the specified target
  },
  {
    name: "Rare potion",
    type: "potion",
    value: 20,
    rarity: 2
    //use: player => player.hp + 25 //restores 25hp to the specified target
  },
  {
    name: "Epic potion",
    type: "potion",
    value: 50,
    rarity: 3
    //use: player => player.hp + 25 //restores 25hp to the specified target
  },
  {
    name: "Common bomb",
    type: "bomb",
    value: 7,
    rarity: 0
    //use: monster => monster.hp - 50 //deals 50hp damage to the specified target
  },
  {
    name: "Unusual bomb",
    type: "bomb",
    value: 12,
    rarity: 1
    //use: monster => monster.hp - 50 //deals 50hp damage to the specified target
  },
  {
    name: "Rare bomb",
    type: "bomb",
    value: 25,
    rarity: 2
    //use: monster => monster.hp - 50 //deals 50hp damage to the specified target
  },
  {
    name: "Epic bomb",
    type: "bomb",
    value: 100,
    rarity: 3
    //use: monster => monster.hp - 50 //deals 50hp damage to the specified target
  },
  {
    name: "Epic key",
    type: "key",
    value: 150,
    rarity: 3
    //use: //Unlocks the door to a dungeon
  }
];

// Creates an item entity by cloning one of the item objects and adding the position and type properties.
// item is a reference to one of the items in the items variable. It needs to be cloned before being assigned the position and type properties.

function createItem(item, position) {
  let newItemObj = clone(item);
  newItemObj.type = type;
  newItemObj.position = position;

  return newItemObj;
}

// Uses a player item (note: this consumes the item, need to remove it after use)
// itemName is a string, target is an entity (i.e. monster, tradesman, player, dungeon)
// If target is not specified, item should be used on player for type 'potion'. Else, item should be used on the entity at the same position
// First item of matching type is used
function useItem(itemName, target) {}

// Clones an array of objects
// returns a new array of cloned objects. Useful to clone an array of item objects
//{original, clone if original === clone return true else return false}
function cloneArray(objs) {
  let newArrObj = [];
  for (let i = 0; i < objs.length; i++) {
    newArrObj[i] = objs[i];
  }
  return newArrObj;
}

startItems = cloneArray(items);

// Returns a new object with the same keys and values as the input object
function clone(entity) {
  let keys = Object.keys(entity);
  let values = Object.values(entity);
  objCopy = {};
  for (i = 0; i < keys.length; i++) {
    objCopy[keys[i]] = values[i];
  }
  return objCopy;
}

// returns true or false to indicate whether 2 different objects have the same keys and values

function assertEqual(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let values1 = Object.values(obj1);
  let keys2 = Object.keys(obj2);
  let values2 = Object.values(obj2);
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) return false;
    if (values1[i] !== values2[i]) return false;
    return true;
  }
}

let player = {
  name: "",
  level: 1,
  items: [], //(array of objects)
  skills: [], //[confuse, steal],
  attack: 10,
  speed: 3000,
  hp: 100,
  gold: 0, //(number - 0 to start. Can get gold by selling items to the tradesman)
  exp: 0, //(number - 0 to start. Experience points, increase when slaying monsters)
  type: "player",
  position: { row: 0, column: 0 }, //(object - can be left out and set when needed)
  getMaxHp: function() {
    this.hp = this.level * 100;
  }, //(function - a method that returns max hp. Value is level * 100, e.g. level 2 -> 200 max hp)
  levelUp: function() {
    //(function - a method to update the level and the different properties affected by a level change. Level up happens when exp >= [player level * 20])
    if (this.exp >= (this.level + 1) * 20) {
      this.level = this.level + 1;
      this.hp = this.level * 100;
      this.attack = this.level * 10;
      this.speed = 3000 / this.level;
    }
  },
  getExpToLevel: function() {
    //(function - a method returning exp required to level. Value is level * 20, e.g. level 2 -> 40exp required)
    this.exp = this.level * 20;
  }
};

// Sets the player variable to a player object based on the specifications of the README file
// The items property will need to be a new array of cloned item objects
// Prints a message showing player name and level (which will be 1 by default)
function createPlayer(name, level = 1, items = startItems) {
  player.name = name;
  player.level = level;
  player.items = items;
  print(
    "Welcome " +
      player.name +
      "!" +
      " You are at level " +
      player.level +
      "." +
      " You have these items: " +
      player.items +
      "."
  );
}

// Sets the board variable to a 2D array of rows and columns
// First and last rows are walls
// First and last columns are walls
// All the other entities are grass entities;

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
}

// Sets the position property of the player object to be in the middle of the board
// You may need to use Math methods such as Math.floor()

function placePlayer() {
  let x = Math.floor(board.length / 2);
  let y = Math.floor(board[0].length / 2);
  board[x][y] = "P";
  return board;
}

// Creates the board and places player
function initBoard(rows, columns) {
  print("Creating board and placing a player...");
  createBoard(rows, columns);
  placePlayer();
}

function printBoard() {
  // Prints the board
  let boardDisplay = "";
  for (x = 0; x < board.length; x++) {
    for (y = 0; y < board[0].length; y++) {
      boardDisplay += board[x][y];
    }
    boardDisplay += "\n";
  }
  print(boardDisplay);
}

// Updates the board by setting the entity at the entity position
// An entity has a position property, each board cell is an object with an entity property holding a reference to the entity at that position
// When a player is on a board cell, the board cell keeps the current entity property (e.g. monster entity at that position) and may need to have an additional property to know the player is there too.
function updateBoard(entity) {}

const monsterNames = [
  "Bigfoot",
  "Centaur",
  "Cerberus",
  "Chimera",
  "Ghost",
  "Goblin",
  "Golem",
  "Manticore",
  "Medusa",
  "Minotaur",
  "Ogre",
  "Vampire",
  "Wendigo",
  "Werewolf"
];

let monster = {
  name: "", //(string - random from list of monster names)
  level: 0, // (number - specified in parameters)
  hp: 0, //(number - max is level * 100)
  attack: 0, //(number - level * 10)
  speed: 0, //(number - 6000 / level)
  items: [{}, {}], //(array of objects - may be empty or not depending on parameters)
  position: {}, //(object - specified in parameters)
  type: "monster",
  getMaxHp: function() {
    this.hp = this.level * 100;
  } //(function - a method that returns max hp. Value is level * 100, e.g. level 2 -> 200 max hp)
  //getExp: //(function - returns exp received for defeating monster. Value is level * 10 e.g. level 2 -> 20 exp points received)
};

// Creates a monster object with a random name with the specified level, items and position
// The items property will need to be a new array of cloned item objects
// The entity properties (e.g. hp, attack, speed) must respect the rules defined in the README
function createMonster(level, items, position) {
  print("Creating a monster...");
  insideMonster = clone(monster);
  insideMonster.level = level;
  insideMonster.items = items;
  insideMonster.position = position;
  insideMonster.attack = level * 10;
  insideMonster.speed = 6000 / level;
  insideMonster.hp = level * 100;

  return insideMonster;
}

let tradesman = {
  name: "", //(string - can be anything)
  hp: Math.pow(10, 1000), //(number - Infinity)
  items: [{}, {}], //(array of objects - may be empty or not depending on parameters)
  position: {}, //(object - specified in parameters)
  type: "tradesman",
  getMaxHp: function() {
    this.hp = Math.pow(10, 1000);
  } //(function - a method that returns max hp. For tradesman it's Infinity)
};

// Creates a tradesman object with the specified items and position. hp is Infinity
// The items property will need to be a new array of cloned item objects
function createTradesman(items, position) {
  insideTradesman = clone(tradesman);
  insideTradesman.items = cloneArray(items);
  isideTradesman.position = position;

  return insideTradesman;
}

let dungeon = {
  isLocked: true, //(boolean)
  hasPrincess: true, //(boolean)
  items: [{}, {}], //(array of objects)
  gold: 0, //(number)
  position: {}, //(object - specified in parameters)
  type: "dungeon"
};

// Creates a dungeon entity at the specified position
// The other parameters are optional. You can have unlocked dungeons with no princess for loot, or just empty ones that use up a key for nothing.
function createDungeon(
  position,
  isLocked = true,
  hasPrincess = true,
  items = [],
  gold = 0
) {
  insideDungeon = clone(dungeon);
  insideDungeon.position = position;
  insideDungeon.isLocked = isLocked;
  insideDungeon.hasPrincess = hasPrincess;
  insideDungeon.items = items;
  insideDungeon.gold = gold;
}

const grass = ".";

const wall = "#";

const wallEntity = {
  type: "wall",
  position: { row: 0, column: 0 }
};

const grassEntity = {
  type: "grass",
  position: { row: 0, column: 0 }
};

// Uses a player skill (note: skill is not consumable, it's useable infinitely besides the cooldown wait time)
// skillName is a string. target is an entity (typically monster).
function useSkill(skillName, target) {}

// Moves the player in the specified direction
// You will need to handle encounters with other entities e.g. fight with monster
function move(direction) {}

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
