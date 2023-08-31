"use strict";

const player = new Image();
player.src = "images\\Red_Circle(small).svg.png";


const finish = new Image();
finish.src = "images\\finish.jpg";


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
let x = 0;                // used to represent the x coordinate
let y = 0;                // used to represent the y coordinate (coordinates start at top left of canvas)

player.addEventListener('load', animatePlayer);

function animatePlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(finish, 200, 250, 50, 50);                    // draws finish @ location 200, 250 with height and width of 50px
  ctx.drawImage(player, x + 5, y + 10, 30, 30);              // draws player at starting location
  drawMaze(ctx);                                        // calls function to draw 2d maze, ctx makes it 2d
  requestAnimationFrame(animatePlayer);
}





window.addEventListener("load", function () {
  animatePlayer();
});

// window.addEventListener("keydown", function (e) {
//   if (e.key === "ArrowDown") {
//     y+= 5;
//   } else if (e.key === "ArrowUp") {
//     y-= 5;
//   } else if (e.key === "ArrowLeft") {
//     x-= 5;
//   } else if (e.key === "ArrowRight") {
//     x+= 5;
//   }
// });

window.addEventListener("keydown", function (e) {
  let newX = x;
  let newY = y;

  if (e.key === "ArrowDown") {
    newY += 5;
  } else if (e.key === "ArrowUp") {
    newY -= 5;
  } else if (e.key === "ArrowLeft") {
    newX -= 5;
  } else if (e.key === "ArrowRight") {
    newX += 5;
  }

  // Check collision with walls
  if (!isCollidingWithWalls(newX, newY)) {
    x = newX;
    y = newY;
  }
});

function isCollidingWithWalls(newX, newY,) {
  const playerLeft = newX;
  const playerRight = newX + 40;
  const playerTop = newY;
  const playerBottom = newY + 40;

  for (let y = 0; y < maze1.length; y++) {
    for (let x = 0; x < maze1[y].length; x++) {
      if (maze1[y][x] === 1) {
        const wallLeft = x * 50;
        const wallRight = (x + 1) * 50;
        const wallTop = y * 50;
        const wallBottom = (y + 1) * 50;

        if (
          playerRight > wallLeft &&
          playerLeft < wallRight &&
          playerBottom > wallTop &&
          playerTop < wallBottom
        ) {
          return true; // Collision detected
        }
      }
    }
  }

  return false; // No collision
}

const maze1 = [
  [0, 0, 0, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
];


function drawMaze(ctx) {


  // Nested loop to utilize the array to color the maze.
  // Uses coordinates coming from top left
  for (let y = 0; y < maze1.length; y++) {
    for (let x = 0; x < maze1[y].length; x++) {
      if (maze1[y][x] === 1) {
        // walls are black
        ctx.fillStyle = "black";
        ctx.fillRect(x * 50, y * 50, 50, 50);
      } else if (maze1[y][x] === -2) {
        // goal is red - represented by -2
        ctx.fillStyle = "red";
        ctx.fillRect(x * 50, y * 50, 50, 50);
      } else if (maze1[y][x] === -1) {
        // starting spot is green - represented by -1
        ctx.fillStyle = "green";
        ctx.fillRect(x * 50, y * 50, 50, 50);
      }
    }
  }
}


// I removed starting and goal spots and use top left corner: 0,0 as the player's initial
// position and used the star as the finish at 200, 250.





// need to add colliion detection for when the player impacts a wall
// and when a player reaches the star