//the data model stuff
//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
let isWin = false;
let canvas;
let movenumber = 0;
let context;
let model = {
    board: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
    //either r or b (red or black)
    next: "R",
    win: false,
}
let boardFlag = true;
let boardLock = false;

//modified from https://jayhawk-nation.web.app/examples/TicTacToe
function RoundClickX(x) {
 return (Math.ceil((x-150)/100 )-1)
}
function RoundClickY(x) {
    return (Math.ceil((x-150)/100))
   }



//draws the board and "connect four" onscreen 
function render() {
    //adapted from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
    context.clearRect(0,0,canvas.width,canvas.height)
    context.strokeRect(150,50,700,600); 
    for ( i = 0; i < 7 ; i++)
    {
        //horizontal component
    context.beginPath();
    context.moveTo(150,50 + 100*i);
    context.lineTo(850,50 + 100*i);
    context.stroke();
        //vertical component
    context.beginPath();
    context.moveTo(250 + 100*i, 50);
    context.lineTo(250 + 100*i, 650);
    context.stroke();
       } 

    context.font = "82pt Bebas Nueue";
    context.fillStyle = "orange";
    context.textAllign = "center";
    
    context.fillText("CONNECT FOUR", 75, 750);

    context.fillStyle= "Black";
    context.fillRect(400,800,200,50);

    context.font = "46pt Bebas Nueue";
    context.fillStyle = "orange";
    context.textAllign = "center";
    context.fillText("RESET",408,845)
    
    context.font = "46pt Bebas Nueue";
    context.fillStyle = "black";
    context.textAllign = "center";
    context.fillText("Turn: ",75,845);    
    context.fillStyle = "red";
    context.fillText("Red",230,845);
    
    
}

//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#Canvas");
    context = canvas.getContext('2d');
    render();
})


//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
document.addEventListener("click", click1 => {
    if (boardLock == true)
    {
        return;
    }
    pos = getXY(canvas, click1);
    const [i,j] = [RoundClickX(pos.x),RoundClickY(pos.y)]
    let jmod = j;
    if ((click1.x < 150) || i > 6 || i < 0)
    {
        return;
    }
    if ((click1.y < 50) || j > 5)
    {
        return;
    }

    if ((model.board[j][i] != 0))
{
return;
}
//this makes the chip drop to the lowest empty spot in a row
//it also is terrible, but it works
let jtest = j;
while ( jtest < 5)
{
    if (model.board[jmod+1][i] ==0)
    {
        jmod = jmod +1;
    }
    jtest = jtest + 1;
}

renderMoves(i,jmod);
WinCheck(i,jmod);
})


document.addEventListener("click", click2 => {
    pos = getXY(canvas, click2);
    if ((pos.x >= 400) && pos.x <= 600 && pos.y >= 800 && pos.y <= 850)
    {
        reset();
    }
    
})



//adjusting mouse pointer data because of relative positioning of centered div
//copied from https://stackoverflow.com/questions/29501447/why-does-css-centering-mess-up-canvas-mouse-coordinates/29501632
function getXY(canvas, event) {
    var rect = canvas.getBoundingClientRect();  // absolute position of canvas
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}


function renderMoves(x,y) {
    if (model.next == "R")
    {
        context.beginPath();
        context.fillStyle = "red";
        context.arc(200 + 100*x,100 + 100*y,45,0,2*Math.PI,true);
        context.fill();
        model.board[y][x] = "R";
        model.next = "B";
    }
    else
    {
        context.beginPath();
        context.fillStyle = "Black";
        context.arc(200 + 100*x,100 + 100*y,45,0,2*Math.PI,true);
        context.fill();
        model.board[y][x] = "B";
        model.next = "R";
    }
    movenumber = movenumber + 1;
  
    if (model.next == "R")
    {
        context.clearRect(229,800,150,50);
        context.fillStyle = "red";
        context.fillText("Red",230,845);
    }
    else
    {
        context.clearRect(229,800,150,50);
        context.fillStyle = "black";
        context.fillText("Black",230,845)
    }
}


//also checks for ties but WinCheck is a more fun function name and this is a solo project so I don't have to be super thorough with function names
//also I can spaghetti code a bit but I am sure you've noticed that by now
//in true programming fashion I will leave my very unoptimized code for someone else to refactor
function WinCheck(x,y){
    
    //winning move is 4 vertically stacked chips
    if (y <= 2)
    {
        if (model.board[y][x] == model.board[y+1][x] && model.board[y][x] == model.board[y+2][x] && model.board[y][x] == model.board[y+3][x])
        {
            isWin = true;
        }
    }
    //winning move is 4 horizontally stacked chips
    if (x > 2 && model.board[y][x] == model.board[y][x-1] && model.board[y][x] == model.board[y][x-2] && model.board[y][x] == model.board[y][x-3])
    {
        isWin= true;
    }
    if (x > 0 && model.board[y][x] == model.board[y][x-1] && model.board[y][x] == model.board[y][x+1] && model.board[y][x] == model.board[y][x+2])
    {
        isWin= true;
    }
    if (x > 1 && model.board[y][x] == model.board[y][x-1] && model.board[y][x] == model.board[y][x-2] && model.board[y][x] == model.board[y][x+1])
    {
        isWin= true;
    }
    if (x < 4 && model.board[y][x] == model.board[y][x+1] && model.board[y][x] == model.board[y][x+2] && model.board[y][x] == model.board[y][x+3])
    {
        isWin= true;
    } 
    //diagonal conditions for rightward facing diagonals
    if (x > 2 && y < 3 && model.board[y][x] == model.board[y+1][x-1] && model.board[y][x] == model.board[y+2][x-2] && model.board[y][x] == model.board[y+3][x-3])
    {
        isWin= true;
    }
    if (x <6 && x > 1 && y > 0 && y < 4 && model.board[y][x] == model.board[y+1][x-1] && model.board[y][x] == model.board[y+2][x-2] && model.board[y][x] == model.board[y-1][x+1])
    {
        isWin= true;
    }
    if (x < 5 && x > 0 && y > 1 && y < 5 && model.board[y][x] == model.board[y+1][x-1] && model.board[y][x] == model.board[y-1][x+1] && model.board[y][x] == model.board[y-2][x+2])
    {
        isWin= true;
    }
    if (x < 4 && y > 2 && model.board[y][x] == model.board[y-1][x+1] && model.board[y][x] == model.board[y-2][x+2] && model.board[y][x] == model.board[y-3][x+3])
    {
        isWin= true;
    } 
    //diagonal condition for leftward facing diagonals
    if (x < 4 && y < 3 && model.board[y][x] == model.board[y+1][x+1] && model.board[y][x] == model.board[y+2][x+2] && model.board[y][x] == model.board[y+3][x+3])
    {
        isWin= true;
    }
    if (x <5 && x > 0 && y > 0 && y < 4 && model.board[y][x] == model.board[y-1][x-1] && model.board[y][x] == model.board[y+1][x+1] && model.board[y][x] == model.board[y+2][x+2])
    {
        isWin= true;
    }
    if (x < 6 && x > 1 && y > 1 && y < 5 && model.board[y][x] == model.board[y+1][x+1] && model.board[y][x] == model.board[y-1][x-1] && model.board[y][x] == model.board[y-2][x-2])
    {
        isWin= true;
    }
    if (x > 2 && y > 2 && model.board[y][x] == model.board[y-1][x-1] && model.board[y][x] == model.board[y-2][x-2] && model.board[y][x] == model.board[y-3][x-3])
    {
        isWin= true;
    } 
    //other stuff
    if (movenumber == 42 && isWin == false)
    {
    boardLock = true;
   var bruh = new Promise ((resolve,reject) => {
        setTimeout( () => {resolve()},1000)
        
   }) 
   bruh.then(() => {NoWin()})
    }
    if (isWin == true)
    {
        

        if (model.board[y][x] == "R")    {
            boardLock = true;
           var bruh = new Promise ((resolve,reject) => {
                setTimeout( () => {resolve()},1000)
                
           }) 
           bruh.then(() => {RedWin()})
            }
        else 
        {
                boardLock = true;
               var bruh = new Promise ((resolve,reject) => {
                    setTimeout( () => {resolve()},1000)
                    
               }) 
               bruh.then(() => {BlackWin()})
        }
        



       
    }
}



function reset()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    for ( i = 0; i < 6; i++)
    {
        for ( j = 0; j<7; j++)
        {
            model.board[i][j] = 0;
        }
    }
    model.next = "R";
    movenumber = 0;
    isWin = false;
    render();
    boardLock = false;
}

function RedWin()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    context.font = "46pt Bebas Nueue";
    context.fillStyle = "red";
    context.textAllign = "center";
    context.fillText("Red has won the game!",215,300);

    context.fillStyle= "Black";
    context.fillRect(400,800,200,50);

    context.font = "46pt Bebas Nueue";
    context.fillStyle = "orange";
    context.textAllign = "center";
    context.fillText("RESET",408,845);
}

function BlackWin()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    context.font = "46pt Bebas Nueue";
            context.fillStyle = "Black";
            context.textAllign = "center";
            context.fillText("Black has won the game!",200,300);

            context.fillStyle= "Black";
            context.fillRect(400,800,200,50);
        
            context.font = "46pt Bebas Nueue";
            context.fillStyle = "orange";
            context.textAllign = "center";
            context.fillText("RESET",408,845);

            
        }

function NoWin()
{
    context.clearRect(0,0,canvas.width,canvas.height);

    context.font = "46pt Bebas Nueue";
context.fillStyle = "orange";
context.textAllign = "center";
context.fillText("The game is a tie!",268,300);


    context.fillStyle= "Black";
context.fillRect(400,800,200,50);

context.font = "46pt Bebas Nueue";
context.fillStyle = "orange";
context.textAllign = "center";
context.fillText("RESET",408,845);
}
