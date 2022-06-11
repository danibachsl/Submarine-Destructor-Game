const canvas = document.querySelector("#canvas");
canvas.width = 1000;
canvas.height = 600;
const ctx = canvas.getContext("2d");

// canvas.style.backgroundColor = "lightgray";

// var background = new Image();
// background.src = "src/fondo_mar.jpeg";

// // Make sure the image is loaded first otherwise nothing will draw.
// background.onload = function(){
//     ctx.drawImage(background,0,0, 1000, 600);   
// }
//

let destructorImagen = new Image();
destructorImagen.src = "src/destructor.png";

let obstaculoImagen = new Image();
obstaculoImagen.src = "src/icono_submarino.png";

const obstaculos = [];

const destructor = new Objeto(731.5, 75, 213, 95, destructorImagen, ctx);



const jugar = () => {
  for (let obstaculo of obstaculos) {
    obstaculo.borrar();
    obstaculo.x -= 4;
    obstaculo.dibujar();
    if (destructor.detectarColision(obstaculo)) {
      console.log("Has perdido");
    }
  }
};

const crearObstaculos = () => {
  const randomPositionY = Math.floor(Math.random() * (530 - 300) + 300);
  const obstaculo = new Objeto(
    1000,
    randomPositionY,
    180,
    70,
    obstaculoImagen,
    ctx
  );
  obstaculos.push(obstaculo);
};


const cargaInicial = () => {
  destructor.dibujar();
  crearObstaculos();
  setInterval(jugar, 130);
  setInterval(crearObstaculos, 9000);
};

const moverdestructor = (e) => {
  destructor.borrar();
  if (e.key === "ArrowLeft") {
    destructor.x -= 15;
  }
  if (e.key === "ArrowRight") {
    destructor.x += 15;
  }
  if (e.key === "Space") {
    this.shootPressed = true;
  }
  destructor.dibujar();
};

window.addEventListener("load", cargaInicial);

window.addEventListener("keydown", moverdestructor);