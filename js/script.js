var myGamePiece;
var myFloor = [];

function startGame() {
    myGamePiece = new component(100, 100, "img/Ember.png", 0, 700, "image");
    myFloor = new component(100, 100, "img/Floor.png", 100, 900, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.bounce = 1; 
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBlock();
        this.hitBottom();
           
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
    this.hitBlock = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor.x+(myFloor.width/2))&&(this.x+(this.width/2)>myFloor.x-(myFloor.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 3;}
    if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece.speedX = 3;}
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -3;}
    if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece.speedX = -3;}
    myGamePiece.newPos();
    myGamePiece.update();
    myFloor.update();
}

// function moveup() {
//     myGamePiece.speedY = -1; 
// }

// function movedown() {
//     myGamePiece.speedY = 1; 
// }

// function moveleft() {
//     myGamePiece.speedX = -3; 
// }

// function moveright() {
//     myGamePiece.speedX = 3; 
// }

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}