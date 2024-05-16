const canvasPOO = document.getElementById("canvasPOO");
const canvasPOO_1 = document.getElementById("canvasPOO_1");
const canvasPOO_2 = document.getElementById("canvasPOO_2");
const ctx = canvasPOO.getContext("2d");
const ctx1 = canvasPOO_1.getContext("2d");
const ctx2 = canvasPOO_2.getContext("2d");

canvasPOO.height = "200";
canvasPOO.width = "300";
canvasPOO.style.background = "#FAE8FF";

canvasPOO_1.height = "200";
canvasPOO_1.width = "300";
canvasPOO_1.style.background = "#6BEFB3";

canvasPOO_2.height = "200";
canvasPOO_2.width = "300";
canvasPOO_2.style.background = "#225784";

class Circle {
    constructor(x, y, radius, color, text, textColor, borderColor, canvasType) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.textColor = textColor;
        this.borderColor = borderColor;
        this.canvasType = canvasType; // Agregar tipo de canvas (POO, POO_1 o POO_2)
        this.speedX = Math.random() * 2 - 1; // Velocidad en dirección X
        this.speedY = Math.random() * 2 - 1; // Velocidad en dirección Y
    }

    draw(context, fillRule) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fill(fillRule); // Aplicar relleno con la regla especificada

        // Cambiar color del contorno según el tipo de canvas
        context.strokeStyle = this.borderColor;
        // Cambiar grosor del contorno
        context.lineWidth = 2; // Grosor del contorno (puedes cambiar este valor)
        // Dibujar el contorno del círculo
        context.stroke();

        // Cambiar color del texto y dibujarlo centrado en el centro del círculo
        context.fillStyle = this.textColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `${this.fontSize}px Times New Roman`; // Usar tamaño de fuente dinámico
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    // Función para ajustar el tamaño de la fuente de acuerdo con el radio del círculo
    setFontSize(radius) {
        this.fontSize = Math.min(2 * radius, 0.5 * radius); // Tamaño de la fuente proporcional al radio del círculo
    }

    // Actualizar la posición del círculo
    updatePosition(canvasWidth, canvasHeight) {
        this.posX += this.speedX;
        this.posY += this.speedY;

        // Verificar los límites del canvas y ajustar la posición para evitar que los círculos se salgan
        if (this.posX - this.radius <= 0 || this.posX + this.radius >= canvasWidth) {
            this.speedX *= -1; // Invertir la dirección en X si el círculo toca los bordes laterales
            // Ajustar la posición para que el círculo no se salga completamente del canvas
            this.posX = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.posX));
        }
        if (this.posY - this.radius <= 0 || this.posY + this.radius >= canvasHeight) {
            this.speedY *= -1; // Invertir la dirección en Y si el círculo toca los bordes superior o inferior
            // Ajustar la posición para que el círculo no se salga completamente del canvas
            this.posY = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.posY));
        }
    }
}

// Función para obtener un radio aleatorio proporcional al tamaño del canvas, con un rango específico
function getRandomRadius(canvasWidth, canvasHeight, minRadius, maxRadius) {
    return Math.floor(Math.random() * (maxRadius - minRadius) + minRadius);
}

// Para canvasPOO, valores específicos
let posX = canvasPOO.width / 2;
let posY = canvasPOO.height / 2;
let radius = 80;
let circleFixed = new Circle(posX, posY, radius, 'pink', 'Tec', 'black', '#FF62B3', "POO");
circleFixed.setFontSize(radius); // Establecer tamaño de la fuente proporcional al radio del círculo
circleFixed.draw(ctx);

// Para canvasPOO_1, valores aleatorios con tamaños de círculo y texto variados
let randomX = Math.random() * (canvasPOO_1.width - 2 * radius) + radius;
let randomY = Math.random() * (canvasPOO_1.height - 2 * radius) + radius;
// Modificar el rango de valores aleatorios para el radio específicamente para canvasPOO_1
let randomRadius = getRandomRadius(canvasPOO_1.width, canvasPOO_1.height, 20, 60); // Establecer un rango de radio entre 20 y 60
let circleRandom = new Circle(randomX, randomY, randomRadius, '#1d6963', 'Tec', 'white', '#94FF62', "POO_1");
circleRandom.setFontSize(randomRadius); // Establecer tamaño de la fuente proporcional al radio del círculo
circleRandom.draw(ctx1);

// Para canvasPOO_2, valores aleatorios con tamaños de círculo y texto variados
const arrayCircle = [];

for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * canvasPOO_2.width;
    let randomY = Math.random() * canvasPOO_2.height;

    let randomRadius = getRandomRadius(canvasPOO_2.width, canvasPOO_2.height, 10, 30); // Reducir el rango de tamaños de los círculos
    let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", i + 1, 'white', 'black', "POO_2"); // Cambio de color del contorno a negro
    miCirculo.setFontSize(randomRadius); // Establecer tamaño de la fuente proporcional al radio del círculo
    arrayCircle.push(miCirculo);
}

// Función para dibujar y actualizar la posición de los círculos en canvasPOO_2
function drawAndUpdate() {
    ctx2.clearRect(0, 0, canvasPOO_2.width, canvasPOO_2.height); // Limpiar el canvas
    arrayCircle.forEach(circle => {
        circle.updatePosition(canvasPOO_2.width, canvasPOO_2.height); // Actualizar la posición del círculo
        circle.draw(ctx2); // Dibujar el círculo actualizado
    });
}

// Dibujar los círculos en canvasPOO_2 al cargar la página
drawAndUpdate();
