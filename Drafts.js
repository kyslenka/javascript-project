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
  