const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Obtiene las dimensiones de la pantalla actual 
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// El canvas tiene las mismas dimensiones que la pantalla 
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = '#03e8fc';

class Circle {
    constructor(x, y, radius, color, text, velocidad) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;

        this.velocidad = velocidad;
        this.dx = (Math.random() - 0.5) * this.velocidad; // Velocidad horizontal aleatoria
        this.dy = (Math.random() - 0.5) * this.velocidad; // Velocidad vertical aleatoria
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color; // Color 
        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.font = '18px Arial';
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 5; // Grosor del circulo 
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }
    update(context) {
        this.draw(context);

        // Verificar colisión con los bordes de la pantalla y ajustar posición si está cerca de los bordes
        if (this.posX + this.radius >= window_width) {
            this.posX = window_width - this.radius - 1;
            this.dx = -this.dx; // Invertir la velocidad horizontal si choca con el borde derecho
        } else if (this.posX - this.radius <= 0) {
            this.posX = this.radius + 1;
            this.dx = -this.dx; // Invertir la velocidad horizontal si choca con el borde izquierdo
        }
        if (this.posY + this.radius >= window_height) {
            this.posY = window_height - this.radius - 1;
            this.dy = -this.dy; // Invertir la velocidad vertical si choca con el borde inferior
        } else if (this.posY - this.radius <= 0) {
            this.posY = this.radius + 1;
            this.dy = -this.dy; // Invertir la velocidad vertical si choca con el borde superior
        }

        // Actualizar posición en función de la velocidad
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let arrayCircle = [];

// Generar círculos aleatorios y agregarlos al array
for(let i = 0; i < 10; i++){
    let randomX = Math.random() * window_width; // Posición en x
    let randomY = Math.random() * window_height; // Posición en y
    let randomRadius = Math.floor(Math.random() * 100 + 5); // Tamaño del radio
    let randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`; // Color aleatorio
    let randomSpeed = Math.random() * 10 + 5; // Velocidad aleatoria (entre 5 y 15)

    let miCirculo = new Circle(randomX, randomY, randomRadius, randomColor, 'Círculo ' + (i+1), randomSpeed);
    arrayCircle.push(miCirculo);
}

// Actualizar y dibujar todos los círculos en el canvas
let updateCircles = function () {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });
};
updateCircles();
