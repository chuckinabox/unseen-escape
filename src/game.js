CANVAS_HEIGHT = 256;
CANVAS_WIDTH = 256;
PLAYER_SPEED = 10;
PLAYER_MOVE_Y = 10;
let ticks = 0;
let grid = [42, 85, 128, 170, 213];


kontra.init();


//Controls
 let leftPressed = function() {return kontra.keys.pressed('left') || kontra.keys.pressed('a')};
 let rightPressed = function() {return kontra.keys.pressed('right') || kontra.keys.pressed('d')};
 let upPressed = function() {return  kontra.keys.pressed('up') || kontra.keys.pressed('w')};
 let downPressed = function() {return kontra.keys.pressed('down') || kontra.keys.pressed('s')};

//Player
var Player = kontra.sprite({
  x: 25,
  y: 150,
  width: 25,
  height: 25,
  color: 'blue'
});
//Camera
var Camera = kontra.sprite({
  x: 230,
  y: 5,
  width: 10,
  height: 25,
  color: 'green',
  dx: -3
});

//Lasers
let LasersX = [];
grid.forEach(gridNumber => {LasersX.push(kontra.sprite({
  x: CANVAS_WIDTH - 5,
  y: gridNumber,
  width: 5,
  height: 5,
  color: 'red'
}))})

let LasersY = [];
grid.forEach(gridNumber => {LasersY.push(kontra.sprite({
  x: gridNumber,
  y: CANVAS_WIDTH - 5,
  width: 5,
  height: 5,
  color: 'blue'
}))})


var loop = kontra.gameLoop({
  update: function(){
    //Laser cycle
     ticks++;

    if (ticks > 200) {
      LasersX.forEach( x => {x.width = 256; x.x = 0;});
      LasersY.forEach( y => {y.height = 256; y.y = 0;})
      ticks = 0;
    }

    if (ticks > 100) {
      LasersX.forEach( x => {x.width = 5; x.x = CANVAS_WIDTH - 5;});
      LasersY.forEach( y => {y.height = 5; y.y = CANVAS_WIDTH - 5;});

    }

    //Boundaries
    if (Player.x >= CANVAS_WIDTH - Player.width || Player.x <= 0) {
      Player.dx === 0;
      if (Player.x <= 0) {
        Player.x = 1;
      } else {
        Player.x = CANVAS_WIDTH-Player.width - 1;
      }
    }
    if (Player.y >= CANVAS_HEIGHT-Player.height || Player.y <= 0) {
      Player.dy === 0;
      if (Player.y <= 0){
        Player.y = 1;
      } else {
        Player.y = CANVAS_HEIGHT-Player.height - 1;
      }
    }

    //Snap to grid
    let closest = 0;
    for(y in grid){

      if (Math.abs(Player.y - grid[y]) < Math.abs(Player.y - closest)){
        closest = grid[y]
      }
    }

    if (Player.y - closest > PLAYER_MOVE_Y) {
      Player.y--
    }
    if (Player.y - closest < PLAYER_MOVE_Y){
      Player.y++
    }

    closest = 0;
    for(x in grid){

      if (Math.abs(Player.x - grid[x]) < Math.abs(Player.x - closest)){
        closest = grid[x]
      }
    }

    if (Player.x - closest > PLAYER_MOVE_Y) {
      Player.x--
    }
    if (Player.x - closest < PLAYER_MOVE_Y){
      Player.x++
    }
    //Horizontal Movement
    if (leftPressed() && rightPressed()){
      Player.dx = 0
    }
    else if (leftPressed()){
      Player.dx = -PLAYER_SPEED;
    } else if (rightPressed()){
      Player.dx = PLAYER_SPEED;
    } else {
      Player.dx = 0
    }
    //Vertical Movement
    if (upPressed() && downPressed()){
      Player.dy = 0
    }
    else if (upPressed()){
      Player.dy = -PLAYER_SPEED;
    } else if (downPressed()){
      Player.dy = PLAYER_SPEED;
    } else {
      Player.dy = 0
    }
    Player.update();

    //Camera
    if (Player.collidesWith(Camera)){
      Camera.color = 'black';
    }
    if (Camera.x < -Camera.width){
      Camera.x = CANVAS_WIDTH * 2;
      Camera.color = 'green'
    }
    Camera.update();

    LasersX.forEach(x => x.update())
    LasersY.forEach(y => y.update())

  },
  render: function(){
    Camera.render();
    Player.render();
    LasersX.forEach(x => x.render())
    LasersY.forEach(y => y.render())


  }
});

loop.start();
