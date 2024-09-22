const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 700;

/*
For fullscreen:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
*/

const numStars = 500;
const size = 1;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const FULL_CIRCLE = 2 * Math.PI;

const speed = 5;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;  // x location
        this.y = Math.random() * canvas.height; // y location
        this.z = Math.random() * canvas.width;  // z location (depth of star)
    }

    move() {
        this.z -= speed;
        if (this.z <= 0) {
            this.z = canvas.width;
        }
    }

    show() {
        const x = (this.x - centerX) * (canvas.width / this.z) + centerX;
        const y = (this.y - centerY) * (canvas.width / this.z) + centerY;
        const radius = size * (canvas.width / this.z);

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x, y, radius, 0, FULL_CIRCLE);
        ctx.fill();
    }
}


const stars = Array(numStars).fill().map(() => new Star());

const draw = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.show();
        star.move();
    })
}

const update = () => {
    draw();
    requestAnimationFrame(update);
}

update();
