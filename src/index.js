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
obstaculoImagen.src = "src/icono_submarino recortada.png";

let barrilImagen = new Image();
barrilImagen.src = "src/barril logo.jpeg";

const obstaculos = [];
const barriles = [];

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
  const randomPositionY = Math.floor(Math.random() * 530);
  const obstaculo = new Objeto(
    1000,
    randomPositionY + 95,
    180,
    30,
    obstaculoImagen,
    ctx
  );
  obstaculos.push(obstaculo);
};

const crearBarriles = (e) => {
    if (e.key === "Space") {   
      for (let barril of barriles) {
          barril.borrar();
          barril.y += 3;
          barril.dibujar();
      }
    }
    
    const barril = new Objeto(
        
    );
    barriles.push(barril);
}


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

  destructor.dibujar();
};


window.addEventListener("load", cargaInicial);

window.addEventListener("keydown", moverdestructor);

window.addEventListener("keydown", crearBarriles);