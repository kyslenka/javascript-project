print(dash.repeat(20) + "SETUP PLAYER" + dash.repeat(20), "blue");



let newItems = []
  .concat(items[0])
  .map(item => Object.assign({ name: "bomb", value: 7 }));

let newItems = items
  .map(a => {
    return { ...a };
  })
  .slice(0, 1);
newItems.name = "bomb";

let arr1 = wallStr.repeat(14) * 2;
let arr2 = "\n" + "#" + grassStr.repeat(12) + "#";
function add(arr1, arr2) {
  return arr1 + arr2;
}
add();

player.name = name 
print {"welcome player.name" print {'You are at level player.level', print ("Currently you have player.items")}


let str = "\n" + wallStr.repeat(14);
let str2 = "\n" + "#" + grassStr.repeat(12) + "#";
let newStr = str2;
newStr2 = str2.repeat(6);
function add(x, y) {
  return x + y + x;
}
console.log(add(str, newStr2));


let board1 = "";
let row = 7;
let column = 15;
for (x = 0; x < row; x++) {
  for (y = 0; y < column; y++) {
    if (x === 0 || x === 14 || y === 0 || y === 6) {
      board1 += "#";
    } else {
      board1 += ".";
    }
  }
  board1 += "\n";
}


the player console.log the function with his input (name, level) and it should call our function with inputing new variables


//function setName(name) {
//  return name;
//}

function cloneArray(objs) {
    let newArr = [];
    let cloneObjs = objs.map(object => {
      return { ...object }
    });
    
    //return newArr.push(cloneObjs);
    console.log(cloneObjs);
  }
  
  cloneArray(items)

  function cloneArray(objs) { // changes the whole array and change the properties of objects
    let newArr = [];
    for(let i = 0; i < objs.length; i++) {
      newArr[i] = objs[i];
    }
    return newArr;
    console.log(newArr[0] = 0 );
  }
  
  cloneArray(items);
  

  function cloneArray(objs) {
    let newArr = Array.from(objs, obj => Object.assign({}, obj)); // changes the whole array but doesn't change the properties of objects
    let original = objs;
    let clone = newArr;
  if (original === clone) {
    return true;
  } else {
  return false;
  }
  }
  
  cloneArray(items); //false


  function initBoard(rows, columns) {
    let player = "P";
    let position = player.position;
    createBoard(rows, columns);
  }

  initBoard(createBoard(rows, columns);


  function createBoard(rows, columns) {
    let board = [];
    for (x = 0; x < rows; x++) {
      for (y = 0; y < columns; y++) {
        if (x === 0 || x === rows - 1 || y === 0 || y === columns - 1)
          board += "#";
        else board += ".";
      }
      board += "\n";
    }
    return board;
  }

  function clone(entity) {
    let clonePlayer = [].concat(player[0]);
    return clonePlayer;
  }
  
  let clonePlayer = [].concat(player[0]);
  clonePlayer.splice(0, 1, "Adrian"); //doesn't work, replaces the whole content of an array
  

  function setName(name) {
    player.name = name;
    print("Player name set to " + name);
  }

  function clone(item) {
    let keys = Object.keys(items);
    let values = Object.values(items);
    newItemObj = {};
    for (i = 0; i < keys.length; i++) {
      newItemObj[keys[i]] = values[i];
    }
    return newItemObj;
  }

  function move(direction) {
    let newPosition = player.position;
    switch(direction) {
        case "U": 
            newPosition = {
                row: player.position.row - 1,
                column: player.position.column
            };
        break;
        case "D": 
            newPosition = {
                row: player.position.row + 1,
                column: player.position.column
            };
        break;
        case "L": 
            newPosition = {
                row: player.position.row,
                column: player.position.column - 1
            };
        break;
        case "R": 
        newPosition = {
            row: player.position.row,
            column: player.position.column + 1
        };
        break;
    }
    if (board[newPosition.row][newPosition.column].type !== "wall") {
        player.position = newPosition;
    }
    printBoard();
}

//let items[i] = startItems[i];
//item.position = startItem.position;


createPlayer.name = player.name;

function setName(name) {
    createPlayer.name = player.name;
    return name;
}
print();

//setInterval(() => playerHit(message, 3000));


//if (board[newPlayerPosition.row][newPlayerPosition.column].type !== "wall") {
    //player.position = newPlayerPosition;


    //if (player.position === grass.position) print("P");
  //if (player.position === newPlayerPosition) print(".");

  //if (player.position === newItem.position)
    //return player.item.push(NewItemObj); //print("P")
  //if (player.position === newPlayerPosition) print(".");


  function f(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
      reversed += str.charAt(i);
    }
    return reversed;
  }

  function updateBoard(entity) {
    board[entity.position.row][entity.position.column] = entity.type.slice(0, 1);
    
    printBoard();
}

function hitPlayer() {
    monster.hp = monster.hp - player.attack;
        print(monster.name + " hit!" + " -" + player.attack + " hp" + "\n" + "HP left: " + monster.hp);
        if(monster.hp <= 0) {
            clearInterval(interval1);
            print(monster.name + "defeated." + "\n" + "Congratulations! You have received 10 exp points");
        } //else if (monster.hp = 0) {
            //player.exp + 10; 
            //print(monster.name + "defeated." + "\n" + "Congratulations! You have received 10 exp points");
    //}
}

    let interval1 = setInterval(() => hitPlayer(), 3000);

function hitMonster() {
    player.hp = player.hp - monster.attack;
    print(player.name + " hit!" + " -" + monster.attack + " hp" + "\n" + "HP left: " + player.hp);
        if(player.hp <= 0) {
            clearInterval(interval2);
        //} else if (player.hp = 0) {
            //gameOver();
        //}
    }
}
    let interval2 = setInterval(() => hitMonster(), 6000);

    monster1.hp = monster1.hp - player.attack;
    let message = monster1.name + " hit!" + " -" + player.attack + " hp" + "\n" + "HP left: " + monster1.hp;

function playerHit(x) {
    print(x, "purple");
}

  print(playerHit(message));

  player.hp = player.hp - monster1.attack;
  let message1 = player.name + " hit!" + " -" + monster1.attack + " hp" + "\n" + "HP left: " + player.hp;

function monsterHit(x) {
    print(x, "red");
}

  print(monsterHit(message1));

  if (
    target === undefined &&
    startItems.type === "potion" &&
    entity.position === newPlayerPosition
  )

  function createTradesman(items, position) {
    newTradesman = clone(tradesman);
    newTradesman.items = cloneArray(items);
    newTradesman.position = position;
  
    return newTradesman;
  }

  function createBoard(rows, columns) {
    for (x = 0; x < rows; x++) {
      board[x] = [];
      for (y = 0; y < columns; y++) {
        if (x === 0 || x === rows - 1 || y === 0 || y === columns - 1) {
          board[x].push([
              {type: "wall", position: { row: 0, column: 0 }, symbol: "#"}
          ]);
        } else {
          board[x].push([
              {type: "grass", position: { row: 0, column: 0 }, symbol: "#"}   
          ]);
        }
      }
    }
  }

  //if (newPlayerPosition === monster.position) print("Encountered a " + monster.name + "!");
//if (newPlayerPosition === item.position) print("Found a " + item1 + "!");
//if (newPlayerPosition === tradesman.position) print("Encountered a tradesman!");
//if (newPlayerPosition === dungeon.position) print("Found a dungeon!");
//if (newPlayerPosition === dungeon.position && dungeon.isLocked === false && dungeon.hasPrincess === true) {
//printSectionTitle("GAME OVER");
//}
//if (player.position === newItem.position) {
//board[x][y] = ".";
//board[newPlayerPosition.row][newPlayerPosition.column] = "P";
//player.position = newPlayerPosition;
//}

 //if(player.items + tradesman.items[i]) {
// player.gold = player.gold - tradesman.items[].value;
//tradesman.items = tradesman.items - tradesman.items[];
//player.items = player.items + tradesman.items[];
//}
//if(tradesman.items + player.items[]) {
//player.gold = player.gold + player.items[].value;
//player.items = player.items - player.items[];
//tradesman.items = tradesman.items + player.items[];
//}
//}


function createBoard(rows, columns) {
    board = [];
    //let x = {};
    //let y = {};
    for (x = 0; x < rows; x++) {
      board[x] = [];
      for (y = 0; y < columns; y++) {
        if (x === 0 || x === rows - 1 || y === 0 || y === columns - 1) {
          board[x].push([
            { type: "wall", position: { row: 0, column: 0 }, symbol: "#" }
          ]);
        } else {
          board[x].push([
            { type: "grass", position: { row: 0, column: 0 }, symbol: "." }
          ]);
        }
      }
    }
  }

function printBoard() {
    // Prints the board
    for (i = 0; i < board.length; i++) {
      let boardDisplay = "";
      for (x = 0; x < board.length; x++) {
        for (y = 0; y < board[i][x].length; y++) {
          boardDisplay += board[i][x][y].symbol;
        }
        //boardDisplay += "\n";
      }
      print(boardDisplay);
    }
  }
  
  