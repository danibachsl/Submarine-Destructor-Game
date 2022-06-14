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

let explosionImagen = new Image();
explosionImagen.src = "src/explosion logo.png";

const obstaculos = [];
const barriles = [];
const explosiones = [];

let destructorx = "";

const destructor = new Objeto(731.5, 75, 213, 95, destructorImagen, ctx);


const jugar = () => {
  for (let obstaculo of obstaculos) {
    obstaculo.borrar();
    obstaculo.x -= 4;
    obstaculo.dibujar();
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
  velocidadbarril = 4;
  barriles.forEach (barril => {
    barril.borrar();
    barril.y += barril.velocidadbarril;
    barril.dibujar();
    for (let obstaculo of obstaculos) {
      if (barril.detectarColision(obstaculo)) {
        // console.log("¡Tocado!");
        barril.borrar();
        explosion.dibujar();
        obstaculo.borrar();
      }
    }
  }); 

  //(let barril of barriles) {
    // barril.borrar();
    // barril.y += velocidadbarril;
    // barril.dibujar();
    // if (barril != null) {
    //   barril.dibujar();
    // }
    // if (barril.detectarColision()) {
    //   console.log("BOOM!");
    // }
    // if (barril.y >= 600) {
    //   barril = null;
      
    // }
 // }
  //setInterval(jugarBarril, 130);
}

const crearExplosion = () => {
  const explosion = new Explosion(
    barril.x,
    barril.y,
    20,
    25,
    explosionImagen,
    ctx
  );
  explosiones.push(explosion);
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
    destructor.x + 203,
    destructor.y + 95,
    20,
    25,
    barrilImagen,
    ctx
   );

  barriles.push(barril);
  console.log(barriles);
}


const cargaInicial = () => {
  destructor.dibujar();
  crearObstaculos();
  setInterval(jugar, 200);
  setInterval(crearObstaculos, 9000);
  setInterval(jugarBarril, 130);
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
    //jugarBarril();
    //setInterval(jugarBarril, 130);
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

