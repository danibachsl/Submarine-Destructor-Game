const canvas = document.querySelector("#canvas");
canvas.width = 1000;
canvas.height = 600;
const ctx = canvas.getContext("2d");


// IMÁGENES
let destructorImagen = new Image();
destructorImagen.src = "src/destructor.png";

let obstaculoImagen = new Image();
obstaculoImagen.src = "src/icono_submarino recortada.png";

let barrilImagen = new Image();
barrilImagen.src = "src/barril.png";

let explosionImagen = new Image();
explosionImagen.src = "src/explosion logo.png";

// ARRAYS
const obstaculos = [];
const barriles = [];
let counter = 0;

// AUDIOS
var barrelaudio = new Audio('src/barrel drop.mp3');
var explosionsubmarino = new Audio('src/Explosion submarino 2.mp3');


let destructorx = "";

const destructor = new Objeto(731.5, 75, 213, 95, destructorImagen, ctx);


var runGame = function () {
  document.getElementById("newGame").style.display = "none";
  document.getElementById("main").style.display = "block";
};


const jugar = () => {
  for (let obstaculo of obstaculos) {
    obstaculo.borrar();
    obstaculo.x -= 4;
    obstaculo.dibujar();
    // if (obstaculo.comprobarPosicionEnCanvas()){
    //     // Ejecutar GAME OVER
    // }
  }
};

const jugarBarril = () => {
  velocidadbarril = 4;
  barriles.forEach (barril => {
    barril.borrar();
    barril.y += barril.velocidadbarril;
    barril.dibujar();
    for (let obstaculo of obstaculos) {
      if (barril.detectarColision(obstaculo)) { 
        explosionsubmarino.play();                       // COLISIÓN BARRIL CON SUBMARINO
        let barrilindex = barriles.indexOf(barril);           
        barriles.splice(barrilindex, 1);      
        barril.borrar();           
        let obstaculoIndice = obstaculos.indexOf(obstaculo);  
        obstaculos.splice(obstaculoIndice, 1);
        obstaculo.borrar();
        crearExplosion(barril); 
        counter++;
        document.getElementById("counter").innerText = counter;
      }
    }                                                         
  });
}

const crearExplosion = (barril) => {
  const explosion = new Explosion(
    barril.x,
    barril.y,
    70,
    70,
    explosionImagen,
    ctx
  );
  explosion.dibujar();
  setTimeout(() => explosion.borrar(), 1000);
}

const crearObstaculos = () => {
  const randomPositionY = Math.floor(Math.random() * (530 - 300) + 300);
  const obstaculo = new Objeto(
    1000,
    randomPositionY,
    165,
    27,
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
    barrelaudio.play();
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

