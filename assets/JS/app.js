// Set Variables
console.time();
const canvas = document.getElementById("myCanvas");
// canvas.style.backgroundImage = "url('/imgSource/breakoutWallpaper.jpg')";
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
let brickRowCount = Math.floor(Math.random() * 4);
let brickColumnCount = 7; 
let brickWidth = 30;
let brickHeight = 15;
let brickPadding = 10;
let brickOffsetTop = 15;
let brickOffsetLeft = 15;
let ballColor = "red";
let sK = document.getElementById('scoreKeeper'); 
let score = 0;
let restartGame = document.getElementById('restartButton');


let rgbRandom = 'rgb(' + Math.floor(Math.random() * 255) + ',' +  Math.floor(Math.random() * 255) + ',' +  Math.floor(Math.random() * 255) + ')';

let colorRandomizer = () => {    
    let randomColor = 'linear-gradient(' + rgbRandom + ',' + rgbRandom + ',' + ')'
    document.body.style.backgroundColor = randomColor;
        console.log(randomColor);

        

}


let bricks = [];
// looping through brick rows and columns. 
        for(let c = 0; c < brickColumnCount; c++){
                    bricks[c] = [];
                    
        for(let r = 0; r < brickRowCount; r++){
                    bricks[c][r] = {x: 0, y: 0, status: 1};
                    
            }
        }


// Syntax below keeps track of the X and Y coordinates of the ball && your score. 
let xTrack = () =>{px.innerHTML = 'X = ' +  x;}
let yTrack = () =>{py.innerHTML = 'Y = ' +  y;}
let yourScore = () => {sK.innerHTML = 'Your Score Is : ' + score;}



let draw = () => {
             
        // creating the ball object  
        
                ball();         
                ballLogic();
                drawBricks();
                paddleBoard();
                brickCollision();
                yourScore();
                keyLogger();
                
                
                    }

                    

    //     // drawing the bricks 

    let drawBricks = () => {
               

                // looping through each column and row coordinates to draw a block. 
            
                            for(let c = 0; c<brickColumnCount; c++){
                            for(let r = 0; r < brickRowCount; r++){
                                if(bricks[c][r].status == 1) {
                                    let bX = c*(brickWidth+brickPadding)+brickOffsetLeft;
                                    let bY = r*(brickHeight+brickPadding)+brickOffsetTop;
                                    bricks[c][r].x = bX; 
                                    bricks[c][r].y = bY;
                                    ctx.beginPath();
                                    ctx.rect(bX, bY, brickWidth, brickHeight);
                                    ctx.fillStyle = 'purple';
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
                                            
                                    if(b.status == 1){
                                            //  if the coordinates of the ball are within the brick coordinates
                                            //  ball will be redirected and also brick status will default to 0 thus 
                                            //  not drawing another brick in its place.
                                        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                                            dy = -dy;
                                            b.status = 0;
                                            score += 1;  

                                        }
                                    }

                            }

                    }
                        // Syntax below tracks when player has won by alerting player and reloading page upon 
                        // reaching the maximum set integer for the score variable.
                    if(score == 18){
                        clearInterval(draw);
                        alert('You\'ve Won!');
                        confirm('Restart?', window.location.reload());
                    }
                   
    }
            // Drawing the ball.

            

    let ball = () => { 
        
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    ctx.beginPath();
                                    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                                    ctx.fillStyle = ballColor;
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
                            // if x coordinate of ball is within the paddleboard x and Width values 
                            // then the ball will be redirected thus simulating a bounce off of the paddleboard.
                        if(x > pbX && x < pbX + pbW){
                            dy += 0.09;
                            dy = -dy;
                        
                        }

                            // Game over scenario 
                               else {
                                   clearInterval(draw);
                                         alert("Game Over", location.reload());
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


            // Below syntax tracks mouse coordinates and repositions the paddleboard accordingly.

    let mouseAction = (e) =>{
                
                // set relativeX to equal mouses X position minus canvas width from edge of window to left side of the canvas.
                
                let relativeX = e.clientX - canvas.offsetWidth;
                // if previouse position is greater than zero and less than the canvas width
                // paddleboard X coordinate is repositioned based on relativeX minus the paddleboard width divided by 2.(The center of the paddleboard)
                
                if(relativeX > 0 && relativeX < canvas.width){
                    pbX = relativeX - pbW/2; 
                }
            }


            var keyState = {};

let keyLogger = () => {

                    // Syntax below listens for events on the keyboard and mouse and executes the functions accordingly 
                    window.addEventListener('mousemove', mouseAction, true); 

                    window.addEventListener('keydown',function(event){
                        keyState[event.keyCode || event.which] = true;
                    },true);    
                    window.addEventListener('keyup',function(e){
                        keyState[event.keyCode || event.which] = false;
                    },true);



                    // Below syntax listens for specific keyboard keys and changes variable values to provide movement to paddleboard 

                            if (keyState[37] || keyState[65]){
                                pbX -= 1;
                            }    
                            if (keyState[39] || keyState[68]){
                                pbX += 1;
                            }

                            



}    


    console.timeEnd();






 restartGame.addEventListener('click', () =>{
        window.location.reload(); 
    })



// Below are the functions defined above with set Intervals at which the functions will continue to rn.
let path = setInterval(draw, 10);
let keyEvent = setInterval(keyLogger, 10);
let trackScore = setInterval(yourScore,10);
let backgroundColors = setInterval(colorRandomizer, 2000);

























