const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//Obtiene las dimensiones de la pantalla actual 
const window_height = window.innerHeight;
const window_width = window.innerWidth;

//El canvas tiene las mismas dimensiones que la pantalla 
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
        this.dx = 1 * this.velocidad;
        this.dy = 1 * this.velocidad;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color; //Color 
        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.font = '18px Arial';
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 5; //Grosor del circulo 
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }
    update(context) {
        this.draw(context);
        // Si el circulo supera el margen derecho, entonces se mueve a la izquierda
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        // Si el circulo supera el margen inferior o superior, entonces se invierte la dirección vertical
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }

}

let arrayCircle = [];

// Generar círculos aleatorios y agregar los al array
for(let i = 0; i < 10; i++){
    let randomX = Math.random() * window_width;//posicion en x
    let randomY = Math.random() * window_height;//posicion en y
    let randomRadius = Math.floor(Math.random() * 100 + 5);//Tamaño

    let miCirculo = new Circle(randomX, randomY, randomRadius, '#30597a', 'Hola ' + (i+1), Math.random() * 5 + 1);
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
