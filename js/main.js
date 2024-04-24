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
        //context.clearRect(0, 0, window_width, window_height);

        this.draw(context);
        // Si el circulo supera el margen derecho, entonces se mueve a la izquierda
        if (this.posX + this.radius > window_width) {
            this.dx = -this.dx;
        }
        if (this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        // Si el circulo supera el margen izquierdo, entonces se mueve a la derecho
        if (this.posY + this.radius > window_height) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }

}

let arrayCircle = [];
/*
for(let i=0; i<10; i++){

    let randomX = Math.random() * window_width;//pocision en x
    let randomY = Math.random() * window_height;//posicion en y
    let randomRadius = Math.floor(Math.random() * 100 + 5);//Tamaño

    let miCirculo=new Circle(randomX, randomY, randomRadius, '#30597a', i+1);
    //Agrega el objeto al array 
    arrayCircle.push(miCirculo);
    arrayCircle[i].draw(ctx);

}*/
let randomX = Math.random() * window_width;//posicion en x
let randomY = Math.random() * window_height;//posicion en y
let randomRadius = Math.floor(Math.random() * 100 + 5);//Tamaño


let miCirculo = new Circle(randomX, randomY, randomRadius, '#30597a', 'Denme', 3);
miCirculo.draw(ctx);
let miCirculo1 = new Circle(randomX, randomY, randomRadius, "red", 'Chamba', 5);
miCirculo1.draw(ctx);

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    miCirculo.update(ctx);
    miCirculo1.update(ctx);
};
updateCircle();
/*
let miCirculo2=new Circle(100, 270, 50, 'blue', 'pachuca');
miCirculo2.draw(ctx); */