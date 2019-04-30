/*
NOTE: You will need to add and modify code in this file to complete this project.
I have defined a few functions and variables to help guide you but that doesn't mean no other variables or functions are necessary.
If you think you have a better / different way to do things, you are free to do so :)
*/
const GAME_STEPS = ["SETUP_PLAYER", "SETUP_BOARD", "GAME_START"];
let gameStep = 0; // The current game step, value is index of the GAME_STEPS array.
let board = [];
let boardEntity = ".";
let boardEntityNextStep = "";
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
    rarity: 0,
    use: function use(target) {
      target.hp += 25;
    } //restores 25hp to the specified target
  },
  {
    name: "Unusual potion",
    type: "potion",
    value: 10,
    rarity: 1,
    use: function use(target) {
      target.hp += 50;
    } //restores 50hp to the specified target
  },
  {
    name: "Rare potion",
    type: "potion",
    value: 20,
    rarity: 2,
    use: function use(target) {
      target.hp += 100;
    } //restores 100hp to the specified target
  },
  {
    name: "Epic potion",
    type: "potion",
    value: 50,
    rarity: 3,
    use: function use(target) {
      target.hp = target.getMaxHp;
    } //restores max hp to the specified target
  },
  {
    name: "Common bomb",
    type: "bomb",
    value: 7,
    rarity: 0,
    use: function use(target) {
      target.hp -= 50;
    } //deals 50hp damage to the specified target
  },
  {
    name: "Unusual bomb",
    type: "bomb",
    value: 12,
    rarity: 1,
    use: function use(target) {
      target.hp -= 75;
    } //deals 75hp damage to the specified target
  },
  {
    name: "Rare bomb",
    type: "bomb",
    value: 25,
    rarity: 2,
    use: function use(target) {
      target.hp -= 150;
    } //deals 150hp damage to the specified target
  },
  {
    name: "Epic bomb",
    type: "bomb",
    value: 100,
    rarity: 3,
    use: function use(target) {
      target.hp = target.hp * 0.9;
    } //deals 0.9 * hp damage to the specified target
  },
  {
    name: "Epic key",
    type: "key",
    value: 150,
    rarity: 3,
    use: function use(target) {
      if (target.isLocked === true) {
        target.isLocked = false;
      }
    } //Unlocks the door to a dungeon
  }
];

// Creates an item entity by cloning one of the item objects and adding the position and type properties.
// item is a reference to one of the items in the items variable. It needs to be cloned before being assigned the position and type properties.

function createItem(item, position) {
  let newItem = clone(item);
  newItem.position = position;

  return newItem;
}

// Clones an array of objects
// returns a new array of cloned objects. Useful to clone an array of item objects
//{original, clone if original === clone return true else return false}
function cloneArray(objs) {
  let newArrObj = [];
  for (let i = 0; i < objs.length; i++) {
    newArrObj[i] = clone(objs[i]);
  }
  return newArrObj;
}

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
  }
  return true;
}

let player = {
  name: "",
  level: 1,
  items: [], //(array of objects)
  skills: [{}, {}], //[confuse, steal],
  attack: 10,
  speed: 3000,
  hp: 100,
  gold: 20, //(number - 0 to start. Can get gold by selling items to the tradesman)
  exp: 35, //(number - 0 to start. Experience points, increase when slaying monsters)
  type: "Player",
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
function createPlayer(name, level = 1, items = []) {
  player.name = name;
  player.level = level;
  player.items = cloneArray(items);
  print(
    "Welcome " +
      player.name +
      "!" +
      " You are at level " +
      player.level +
      "." +
      " You have these items: "
  );
  print(player.items);
}

// Sets the board variable to a 2D array of rows and columns
// First and last rows are walls
// First and last columns are walls
// All the other entities are grass entities;

let cell = {
  entity: "",
  object: {}
};

function createBoard(rows, columns) {
  for (x = 0; x < rows; x++) {
    board[x] = [];
    for (y = 0; y < columns; y++) {
      board[x].push(clone(cell));
      if (x === 0 || x === rows - 1 || y === 0 || y === columns - 1) {
        board[x][y].entity = "#";
      } else {
        board[x][y].entity = ".";
      }
    }
  }
}

// Sets the position property of the player object to be in the middle of the board
// You may need to use Math methods such as Math.floor()

function placePlayer() {
  let x = Math.floor(board.length / 2);
  let y = Math.floor(board[0].length / 2);
  board[x][y].entity = "P";
  player.position.row = x;
  player.position.column = y;
  return board;
}

// Creates the board and places player
function initBoard(rows, columns) {
  print("Creating board and placing a player...");
  createBoard(rows, columns);
  createPlayer("Van", 1, [items[0], items[8]]);
  placePlayer();
  item1 = createItem(items[0], { row: 2, column: 7 });
  monster1 = createMonster(1, items[2], { row: 1, column: 7 });
  monster2 = createMonster(5, items[4], { row: 1, column: 8 });
  tradesman1 = createTradesman(items, { row: 3, column: 6 });
  dungeon1 = createDungeon({ row: 4, column: 7 }, true, false, items[4], 100);
  dungeon2 = createDungeon({ row: 3, column: 8 }, false, false, items[2], 200);
  dungeon3 = createDungeon({ row: 3, column: 3 }, true, true, items[8], 300);
  board[item1.position.row][item1.position.column].entity = "I";
  updateBoard(monster1);
  updateBoard(monster2);
  updateBoard(dungeon2);
  updateBoard(dungeon3);
  updateBoard(tradesman1);
  updateBoard(dungeon1);
  //useItem("Common potion", player);
  return printBoard();
}

function printBoard() {
  // Prints the board
  let boardDisplay = "";
  for (x = 0; x < board.length; x++) {
    for (y = 0; y < board[0].length; y++) {
      boardDisplay += board[x][y].entity;
    }
    boardDisplay += "\n";
  }
  print(boardDisplay);
}

// Updates the board by setting the entity at the entity position
// An entity has a position property, each board cell is an object with an entity property holding a reference to the entity at that position
// When a player is on a board cell, the board cell keeps the current entity property (e.g. monster entity at that position) and may need to have an additional property to know the player is there too.

function updateBoard(entity) {
  board[entity.position.row][entity.position.column].entity = entity.type.slice(
    0,
    1
  );
  board[entity.position.row][entity.position.column].object = entity;
}

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

// Creates a monster object with a random name with the specified level, items and position
// The items property will need to be a new array of cloned item objects
// The entity properties (e.g. hp, attack, speed) must respect the rules defined in the README
function createMonster(level = 1, items = [], position) {
  print("Creating a monster...");
  let monster = {
    name: monsterNames[Math.floor(Math.random() * monsterNames.length)], //(string - random from list of monster names)
    level: level, // (number - specified in parameters)
    hp: level * 100, //(number - max is level * 100)
    attack: level * 10, //(number - level * 10)
    speed: 6000 / level, //(number - 6000 / level)
    items: items, //(array of objects - may be empty or not depending on parameters)
    position: position, //(object - specified in parameters)
    type: "Monster",
    getMaxHp: function() {
      this.hp = this.level * 100;
    },
    //(function - a method that returns max hp. Value is level * 100, e.g. level 2 -> 200 max hp)
    getExp: function() {
      return this.level * 10;
    } //(function - returns exp received for defeating monster. Value is level * 10 e.g. level 2 -> 20 exp points received)
  };

  return monster;
}

// Creates a tradesman object with the specified items and position. hp is Infinity
// The items property will need to be a new array of cloned item objects
function createTradesman(items, position) {
  print("Creating tradesman...");
  let tradesman = {
    name: "", //(string - can be anything)
    hp: Math.pow(10, 1000), //(number - Infinity)
    items: items, //(array of objects - may be empty or not depending on parameters)
    position: position, //(object - specified in parameters)
    type: "Tradesman",
    getMaxHp: function() {
      this.hp = Math.pow(10, 1000);
    } //(function - a method that returns max hp. For tradesman it's Infinity)
  };

  return tradesman;
}

// Creates a dungeon entity at the specified position
// The other parameters are optional. You can have unlocked dungeons with no princess for loot, or just empty ones that use up a key for nothing.
function createDungeon(
  position,
  isLocked = true,
  hasPrincess = true,
  items = [],
  gold = 0
) {
  let dungeon = {
    isLocked: isLocked, //(boolean)
    hasPrincess: hasPrincess, //(boolean)
    items: items, //(array of objects)
    gold: gold, //(number)
    position: position, //(object - specified in parameters)
    type: "Dungeon"
  };
  return dungeon;
}

// Moves the player in the specified direction
// You will need to handle encounters with other entities e.g. fight with monster
function move(direction) {
  let newPlayerPosition = player.position;
  switch (direction) {
    case "U":
      newPlayerPosition = {
        row: player.position.row - 1,
        column: player.position.column
      };
      break;
    case "D":
      newPlayerPosition = {
        row: player.position.row + 1,
        column: player.position.column
      };
      break;
    case "L":
      newPlayerPosition = {
        row: player.position.row,
        column: player.position.column - 1
      };
      break;
    case "R":
      newPlayerPosition = {
        row: player.position.row,
        column: player.position.column + 1
      };
      break;
  }

  let x = newPlayerPosition.row;
  let y = newPlayerPosition.column;

  if (assertEqual(newPlayerPosition, item1.position)) {
    boardEntityNextStep = ".";
    player.items.push(item1);
    print("Found a " + item1.name + "!");
  }

  if (board[x][y].entity === "M") {
    boardEntityNextStep = ".";
    monster = board[x][y].object;
    print("Encountered a " + monster.name + "!");
    let interval1 = setInterval(() => hitPlayer(), player.speed);
    let interval2 = setInterval(() => hitMonster(), monster.speed);
    function hitPlayer() {
      monster.hp = monster.hp - player.attack;
      if (monster.hp < 0) {
        monster.hp = 0;
      }
      print(
        monster.name +
          " hit!" +
          " -" +
          player.attack +
          " hp" +
          "\n" +
          "HP left: " +
          monster.hp,
        "purple"
      );
      if (monster.hp <= 0) {
        clearInterval(interval1);
        clearInterval(interval2);
        player.exp = player.exp + monster.getExp();
        player.items = player.items.concat(monster.items);
        print(
          monster.name +
            " defeated." +
            "\n" +
            "Congratulations! You have received " +
            monster.getExp() +
            " exp points." +
            "\n" +
            "You received the following items:" +
            "\n"
        );
        print(monster.items);
        if ((player.level + 1) * 20 < player.exp) {
          player.levelUp();
          player.getMaxHp();
          player.getExpToLevel();
          print("Congratulations! You leveled up!");
        }
      }
    }

    function hitMonster() {
      player.hp = player.hp - monster.attack;
      if (player.hp < 0) {
        player.hp = 0;
      }
      print(
        player.name +
          " hit!" +
          " -" +
          monster.attack +
          " hp" +
          "\n" +
          "HP left: " +
          player.hp,
        "red"
      );
      if (player.hp <= 0) {
        clearInterval(interval1);
        clearInterval(interval2);
        gameOver();
      }
    }
  }

  if (assertEqual(newPlayerPosition, tradesman1.position)) {
    print(
      "You encountered a Mysterious trader! You can buy(itemIdx) and sell(itemIdx) items"
    );
    print("Items for sale:");
    boardEntityNextStep = "T";
    print(tradesman1.items);
  }

  if (board[x][y].entity === "D") {
    dungeon = board[x][y].object;
    boardEntityNextStep = "D";
    print("You found a dungeon!");
    if (dungeon.isLocked === true) {
      print(
        "You need a key to open it. If you have a key, try useItem(key) to unlock the door."
      );
      print(
        "Rumors are some monsters have keys to dungeons. The tradesman might also have spare keys to sell but they don't come cheap."
      );
    }
    if (dungeon.isLocked === false && dungeon.hasPrincess === false) {
      print("The dungeon is unlocked!");
      print("Unfortunately, there was no princess.");
      print(
        "As consolation, you found " + dungeon.gold + " gold and these items: "
      );
      print(dungeon.items);
      player.items = player.items.concat(dungeon.items);
      player.gold += dungeon.gold;
      dungeon.items = [];
      dungeon.gold = 0;
    }
    if (dungeon.isLocked === false && dungeon.hasPrincess === true) {
      print("The dungeon is unlocked!");
      print("You have freed the princess! Congratulations!");
      print(
        "The adventurer " +
          player.name +
          " and the princess lived happily ever after..."
      );
      gameOver();
    }
  }
  if (board[x][y].entity === ".") {
    boardEntityNextStep = ".";
  }
  if (board[x][y].entity !== "#") {
    board[player.position.row][player.position.column].entity = boardEntity;
    boardEntity = boardEntityNextStep;
    board[x][y].entity = "P";
    player.position = newPlayerPosition;
  } else {
    print("You hit the wall!");
  }
  printBoard();
}

// Uses a player item (note: this consumes the item, need to remove it after use)
// itemName is a string, target is an entity (i.e. monster, tradesman, player, dungeon)
// If target is not specified, item should be used on player for type 'potion'. Else, item should be used on the entity at the same position
// First item of matching type is used
function useItem(itemName, target) {
  for (i = 0; i < player.items.length; i++) {
    if (player.items[i].name === itemName) {
      if (player.items[i].type === "potion") {
        if (target === undefined) {
          target = player;
        }
        player.items[i].use(target);
        print(
          "Used " +
            target.items[i].type +
            "!" +
            " Total " +
            target.type +
            " HP: " +
            target.hp,
          "green"
        );
      }
      if (target === undefined) {
        target = board[player.position.row][player.position.column].object;
      }
      if (player.items[i].type === "bomb" && target.type === "Monster") {
        player.items[i].use(target);
        print(
          "You used " +
            player.items[i].name +
            " on" +
            target.name +
            "." +
            target.name +
            " hp is: " +
            target.hp +
            ".",
          "red"
        );
      }
      if (player.items[i].type === "key" && target.type === "Dungeon") {
        player.items[i].use(target);
      }
      player.items.splice(i, 1);
    }
  }
}

function sell(itemIdx) {
  if (assertEqual(player.position, tradesman1.position)) {
    player.gold += player.items[itemIdx].value;
    tradesman1.items.push(player.items[itemIdx]);
    print(
      "You sold a " +
        player.items[itemIdx].name +
        ". Your gold is: " +
        player.gold
    );
    player.items.splice(itemIdx, 1);
  }
}

function buy(itemIdx) {
  if (assertEqual(player.position, tradesman1.position)) {
    if (player.gold - tradesman1.items[itemIdx].value <= 0) {
      print(
        "You don't have enough gold! Required gold: " +
          tradesman1.items[itemIdx].value +
          ", you have: " +
          player.gold
      );
    } else {
      player.gold -= tradesman1.items[itemIdx].value;
      player.items.push(tradesman1.items[itemIdx]);
      print(
        "You purchased " +
          tradesman1.items[itemIdx].name +
          ". Your gold is: " +
          player.gold
      );
      tradesman1.items.splice(itemIdx, 1);
    }
  }
}

let skills = [
  {
    name: "steal",
    requiredLevel: 3, //(number - the skill should not be useable if player level is lower)
    cooldown: 25000, //(number - initial value is 0 meaning it's useable, over 0 means we have to wait. This gets updated to the cooldown value when skill is used and gradually decreases until it's back to 0)
    use: () => {} //(function - takes a target / entity as a parameter and uses the skill on it)
  },
  {
    name: "confuse",
    requiredLevel: 1,
    cooldown: 10000,
    use: () => {} //expects a target as parameter and reverses the name of the target entity as well as dealing [player level * 25] damage (e.g. level 1 -> deals 25hp)
  }
];

// Uses a player skill (note: skill is not consumable, it's useable infinitely besides the cooldown wait time)
// skillName is a string. target is an entity (typically monster).
function useSkill(skillName, target) {
  skills.name = skillName;
  monster1 = target;
  if (skillName === "confuse" && target === monster1 && skills.cooldown === 0) {
    print("Confusing " + monster1.name + "...");
    function monsterName(str) {
      //let str = monster1.name;
      let reversedName = "";
      for (let i = str.length - 1; i >= 0; i--) {
        reversedName += str.charAt(i);
      }
      return reversedName;
    }
    print(
      "..." +
        reversedName +
        ", target is confused and hurts itself in the process",
      "red"
    );
  }
  if (skillName === "steal" && skills.cooldown === 0) {
    if (player.level < 3) {
      print("You must be level 3 or higher to use this skill.", "red");
    } else {
      target.items = filter(target.items, rarity);
      player.items.concat(target.items);
    }
  }
}

function rarity(itemIndx) {
  if (target.items[itemIndx] <= 1) return true;
  return false;
}

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
