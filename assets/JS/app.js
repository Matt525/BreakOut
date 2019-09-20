// Set Variables
console.time();
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = Math.random() * 1;
let dy = Math.random() * -1;
let ballRadius = 5;
let pbW = 30;
let pbH = 5;
let pbX = 150;
let pbY = canvas.height-pbH;
let movement = 2;
let rightButton = false; 
let leftButton = false;
let px = document.getElementById('paragraphX');
let py = document.getElementById('paragraphY');
let brickRowCount = 3;
let brickColumnCount = 6; 
let brickWidth = 30;
let brickHeight = 15;
let brickPadding = 10;
let brickOffsetTop = 15;
let brickOffsetLeft = 35;

 


// functions that show x + Y positions.
let xTrack = () =>{px.innerHTML = 'X = ' +  x;}
let yTrack = () =>{py.innerHTML = 'Y = ' +  y;}

let draw = () => {
              
            
            ball(); 
            drawBricks();        
            paddleBoard();
            keyLogger();  
            ballLogic();
            brickCollision();
            
    

                }

                

    //     // drawing the bricks 

    let drawBricks = () => {
               
        let bricks = [];
                    // looping through brick rows and columns. 
                            for(let c = 0; c < brickColumnCount; c++){
                                        bricks[c] = [];
                                        
                            for(let r = 0; r < brickRowCount; r++){
                                        bricks[c][r] = {x: 0, y: 0, status: 1};
                                        
                                }
                            }
                                        console.log()


                // looping through each column and row coordinates to draw a block. 
            
                            for(let c = 0; c<brickColumnCount; c++){
                            for(let r = 0; r < brickRowCount; r++){
                                if(bricks[c][r].status == 1) {
                                    let bX = c*(brickWidth+brickPadding)+brickOffsetLeft;
                                    let bY = r*(brickHeight+brickPadding)+brickOffsetTop;
                                    bricks[c][r].x = bX; 
                                    bricks[c][r].y = bY;
                                    console.log(bricks[c][r]);
                                    console.log(bX, bY);
                                    ctx.beginPath();
                                    ctx.rect(bX, bY, brickWidth, brickHeight);
                                    ctx.fillStyle = 'Green';
                                    ctx.fill(); 
                                    ctx.closePath();  
                            }
                        }
                }
       



    }

    let brickCollision = () => { 
            for(let c = 0; c < brickColumnCount; c++){
                    for(let r = 0; r < brickRowCount; r++){
                        let b = bricks[c][r];
                                    
                            if(b.stats == 1){
                                    //  if the coordinates of the ball are within the brick coordinates
                                    //  ball will be redirected and also brick status will default to 0 thus 
                                    //  not drawing another brick in its place.
                                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                                    dy = -dy;
                                    b.status = 0; 
                                }
                            }

                    }

            }
                   
    }
            // Drawing the ball.

    let ball = () => { 
        
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                    ctx.fillStyle = "red";
                    ctx.fill();
                    ctx.closePath();
                    x += dx;    
                    y += dy;
    }

        // The below syntax will redeclare the x and y coordinates of ball 
    let ballLogic = () =>{
                              // Actual bouncing effects is generated by the statements below. 
                    // loop below is set to change the dy variable when the Y variable reaches ballradius value
                   
                        // Y axis motion of the ball 
                    if(y + dy  < ballRadius) {
                            // dy becomes positive or negative thus redirecting the drawing.
                        dy = -dy;

                    }

                        // X axis motion of the ball 
                                // redefines dx variable when x variable reaches ballradius value or canvas width minus ballradius value
                    if(x + dx < ballRadius || x >= canvas.width-ballRadius){
                        dx = -dx; 
                            
                    }

                    else if(y + dy > canvas.height-ballRadius){
                            // if x coordinate of ball is within the paddleboards x and width values 
                            // then the ball will be redirected thus simulating a bounce off of the paddleboard.
                        if(x > pbX && x < pbX + pbW){
                            dy += 0.09;
                            dy = -dy;

                        
                        }
                            // Game over scenario 
                        else{
                            alert("Game Over");
                            clearInterval(draw);
                            location.reload();
                        }

                    } 
      

                    

}

    // paddleboard drawing 

    let paddleBoard = () => {
            
                    ctx.beginPath();
                    ctx.rect(pbX, canvas.height-pbH, pbW, pbH);
                    ctx.fillStyle = '#fff';
                    ctx.fill();
                    ctx.closePath();
            }


            var keyState = {};

let keyLogger = () => {
    
        

                    window.addEventListener('keydown',function(event){
                        keyState[event.keyCode || event.which] = true;
                    },true);    
                    window.addEventListener('keyup',function(e){
                        keyState[event.keyCode || event.which] = false;
                    },true);

  
                    if (keyState[37] || keyState[65]){
                        pbX -= 1;
                    }    
                    if (keyState[39] || keyState[68]){
                        pbX += 1;
                    }

    
}    


    console.timeEnd();










        
// *************************** TO-DO *****************************
// Keep paddle board from escaping canvas viewport****************
// Add bounce logic for paddleBoard*******************************
// Set bottom of canvas back to clearInterval() and set a game over screen************************
// Create Blocks and add logic************************************
// Style the canvas and main body*********************************










// Event listener set to document to track when key is pressed down 

// Below are the functions defined above with set Intervals at which the functions will continue to rn.
let path = setInterval(draw, 10);
let keyEvent = setInterval(keyLogger, 10);

// Uncomment syntax below to view X and Y coordinates of ball.

// let trackX = setInterval(xTrack,10);
// let trackY = setInterval(yTrack,10);

























