const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Poppins";
  game.textAlign = "end";

  //elemento que corresponde al nivel
  const map = maps[0];
  // variable: filas del mapa,metodo .trim: limpiar el estrin, quitar los espacios. metodo .split : creando un arreglo a partir de un estrin. ("\n") cada vez que alla un salto de linea
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });

  //vamos a recorrer este array bidimencional
  // forEach() ejecuta la función indicada una vez por cada elemento del arreglo.
  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      //coordenadas : tamaño de nuestros elementos , por lo que hay en el indice + 1 para comenzar desde el primer elemento
      //por aqui las coordenades que uno le de para inicio la toma de final
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      }

      game.fillText(emoji, posX, posY);
    });
  });

  moverPlayer();
}

function moverPlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}

function moveUp() {
  if (playerPosition.y < elementsSize) return console.log("Llegamos al limite");
  playerPosition.y -= elementsSize;
  console.log("Me quiero mover hacia arriba");
  startGame();
}

function moveLeft() {
  if (playerPosition.x == elementsSize)
    return console.log("Llegamos al limite");
  playerPosition.x -= elementsSize;
  console.log("Me quiero mover hacia izquierda");
  startGame();
}

function moveRight() {
  if (playerPosition.x > canvasSize) return console.log("Llegamos al limite");
  playerPosition.x += elementsSize;
  console.log("Me quiero mover hacia derecha");
  startGame();
}

function moveDown() {
  if (playerPosition.y == canvasSize) return console.log("Llegamos al limite");
  playerPosition.y += elementsSize;
  console.log("Me quiero mover hacia abajo");
  startGame();
}