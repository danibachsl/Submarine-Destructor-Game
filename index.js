const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.style.background = "lightgray";

let pelotaImage = new Image();
pelotaImage.src = "src/Pelota.png";

let destructorImagen = new Image();
destructorImagen.src = "/Users/danibachslobo/Desktop/IRONHACK/GAME PROJECT/src/images/destructor.png";

let submarinoImagen = new Imagen();
submarinoImagen.src = "/Users/danibachslobo/Desktop/IRONHACK/GAME PROJECT/src/images/icono_submarino.png";

const obstaculos = [];

const destructor = new Objeto(250, 0, 60, destructorImagen, ctx);

const jugar = () => {
    for (let obstaculo of obstaculos) {
        obstaculo.borrar();
        obstaculo.y -= 10;
        obstaculo.dibujar();
        if (destructor.detectarColision(obstaculo)) {
            console.log("¡Le has dado!");
        }
    }
};

const crearObstaculos = () => {
    const randomPosicionY = Math.floor(Math.random() * 480);
    const obstaculo = new Objeto(
        570,
        120,
        60,
        obstaculoImagen,
        ctx
    );
    obstaculos.push(obstaculo);
}

const cargaInicial = () => {
    destructor.dibujar();
    setInterval(jugar, 1000);
    setInterval(crearObstaculos, 7000);
};

const moverDestructor = (e) => {
    destructor.borrar();
    if (e.key === "ArrowLeft") {
        destructor.x -= 15;
    }
    if (e.key === "ArrowRight") {
        destructor.x += 15;
    }
    destructor.dibujar();
};

window.addEventListener("load", cargaInicial);

window.addEventListener("keydown", moverDestructor);