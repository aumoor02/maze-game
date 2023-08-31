"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
let cellWidth = 50;
let cellHeight = 50;



// Player Image
class Player {
    constructor() {
        // player position
        this.x = 5;
        this.y = 10;
        //player velocity
        this.vx = 5;
        this.vy = -5;
        // player dimensions
        this.height = 30;
        this.width = 30;

        this.image = document.getElementById('player');
    }
}

// Finish Image
class Finish {
    constructor() {
        this.x = 200;
        this.y = 250;
        this.height = 50;
        this.width = 50;

        this.image = document.getElementById('finish')
    }
}

// creates images using the information from the above classes
const player = new Player();
const finish = new Finish();

// when the window loads, the maze, player, and finish will be drawn
window.addEventListener('load', draw);


// executes if the event key is one of the following options
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        player.x += player.vx;
    } else if (e.key === 'ArrowLeft') {
        player.x -= player.vx;
    } else if (e.key === 'ArrowUp') {
        player.y += player.vy;
    } else if (e.key === 'ArrowDown') {
        player.y -= player.vy;
    }

})


function collisionDetection() {
    for (let y = 0; y < maze1.length; y++) {
        for (let x = 0; x < maze1.length; x++) {
            const cell = maze1[y][x];
            if (cell === 1) {
                const wallX = x * cellWidth;
                const wallY = y * cellHeight;
                
                if (
                    player.x < wallX + cellWidth &&
                    player.x + player.width > wallX &&
                    player.y < wallY + cellHeight &&
                    player.y + player.height > wallY
                ) {
                        player.x = 5;
                        player.y = 10;
                    } 

                if (player.x < 0 || 
                    player.x + player.width > canvas.width || 
                    player.y < 0 || 
                    player.y + player.height > canvas.height) {
                        player.x = 5;
                        player.y = 10;
                    }
                
                if (player.x < finish.x + finish.width &&
                    player.x + player.width > finish.x &&
                    player.y < finish.y + finish.height &&
                    player.y + player.height > finish.y ) {
                    alert('Congratulations! You Won!');
                    clearInterval(interval);
                    document.reload();
                }
            }
            
        }
    }
}



// maze design
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
            const cell = maze1[y][x];
            if (cell === 1) {
                const cellX = x * 50;
                const cellY = y * 50;
                // walls are black
                ctx.fillStyle = "black";
                ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
            }
        }
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(ctx);
    ctx.drawImage(finish.image, finish.x, finish.y, finish.height, finish.width);
    ctx.drawImage(player.image, player.x, player.y, player.height, player.width);
    collisionDetection();
    //requestAnimationFrame(draw);
}

const interval = setInterval(draw, 10);