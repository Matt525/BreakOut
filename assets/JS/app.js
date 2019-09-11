// Defining Variables
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 0;
let dy = -2;
let ballRadius;
let px = document.getElementById('paragraphX');
let py = document.getElementById('paragraphY');

// functions to redefine text within the paragraphs thus tracking frames. 
let xTrack = () =>{px.innerHTML = 'X = ' +  x;}
let yTrack = () =>{py.innerHTML = 'Y = ' +  y;}
let draw = () => {

        // create the ball
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI*2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
        x += dx;    
        y += dy;
        
            // Actual bouncing effect is generated by a loop 
            // loop below is set to change the dy variable when the Y variable reaches a certain frame
            if(y === 0 || y === canvas.height){
                // dy becomes positive or negative thus redirecting the drawing
                dy = -dy; 
            }

    }

// Below are the functions defined above with set Intervals at which the functions will continue to rn.
let path = setInterval(draw, 50);
let trackX = setInterval(xTrack,10);
let trackY = setInterval(yTrack,10);































