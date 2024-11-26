const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = 400;
const canvasBoxes = canvasSize / box;

// Snake
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Food
let food = {
    x: Math.floor(Math.random() * canvasBoxes) * box,
    y: Math.floor(Math.random() * canvasBoxes) * box
};

let score = 0;
let direction;

// Keydown event listener for direction control
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Check if snake collides with the wall or itself
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return (newHead.x < 0 || newHead.x >= canvasSize || newHead.y < 0 || newHead.y >= canvasSize);
}

// Draw everything on canvas
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move snake in the current direction
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // If the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvasBoxes) * box,
            y: Math.floor(Math.random() * canvasBoxes) * box
        };
    } else {
        snake.pop(); // Remove the tail
    }

    // New head position
    const newHead = { x: snakeX, y: snakeY };

    // Game over
    if (collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Your score: ' + score);
        return;
    }

    // Add new head
    snake.unshift(newHead);

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Call draw function every 100ms
let game = setInterval(draw, 100);