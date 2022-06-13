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

let barrilImagen = new Image();
barrilImagen.src = "src/barril.png";

const obstaculos = [];
const barriles = [];

let destructorx = "";

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
  // for (let barril of barriles) {
  //     barril.borrar();
  //     barril.y += 3;
  //     barril.dibujar();
  //     if (barril.detectarColision()) {
  //         console.log("BOOM!");
  //     }
  // }
};

const jugarBarril = () => {
  for (let barril of barriles) {
    barril.borrar();
    barril.y += 3;
    barril.dibujar();
    if (barril.detectarColision()) {
      console.log("BOOM!");
    }
  }
}

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

const crearBarril = (x) => {
  if (x === '') {
    x = 731.5;
  } 
  const posicionPopaDestructor = destructor.x.width;
   const barril = new Barril(
    destructor.x,
    destructor.y,
    20,
    25,
    barrilImagen,
    ctx
   );

  barriles.push(barril);
  barril.dibujar();
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
    destructorx = destructor.x -= 15;
  }
  if (e.key === "ArrowRight") {
    destructor.x += 15;
    destructorx = destructor.x += 15;
  }
  if (e.code === "Space") {
    setInterval(jugarBarril, 130);
    //setInterval(crearBarril, 9000);
    console.log(barriles);
    crearBarril(destructorx);
  }
  destructor.dibujar();
};

window.addEventListener("load", cargaInicial);

window.addEventListener("keydown", moverdestructor);





// start() {
//   this.toggleScreen('start-screen',false);
//   this.toggleScreen('canvas',true);
//   this.prepareCanvas();
//   this.init();
//   this.loop = setInterval(() => {
//       this.update();
//       this.render();
//   }, 1000/this.fps);
// };

// toggleScreen(id,toggle) {
//   let element = document.getElementById(id);
//   let display = ( toggle ) ? 'block' : 'none';
//   element.style.display = display;
// };

// function startGame() {
//   gameloop.start();
// }

