var myGamePiece;
var myFloor, myFloor1, myFloor2, myFloor3, myFloor4, myFloor5, myFloor6, myFloor7, myFloor8, myFloor9;
var myEnemy;
var myBackground;

function startGame() {
    myGamePiece = new component(50, 50, "img/Ember.png", 0, 700, "image");
    myBackground = new component (1000, 1000, "img/Background.jpg", 0, 0, "image");
    myEnemy = new component (100, 100, "img/Fan.gif", 600, 800, "image")
    myFloor = new component(100, 100, "img/StartFloor.png", 0, 900, "image");
    myFloor1 = new component(100, 100, "img/Floor.png", 100, 900, "image");
    myFloor2 = new component(100, 100, "img/Floor.png", 200, 900, "image");
    // myFloor3 = new component(100, 100, "img/Floor.png", 300, 900, "image");
    myFloor4 = new component(100, 100, "img/Floor.png", 400, 900, "image");
    myFloor5 = new component(100, 100, "img/Floor.png", 500, 900, "image");
    myFloor6 = new component(100, 100, "img/Floor.png", 600, 900, "image");
    myFloor7 = new component(100, 100, "img/Floor.png", 700, 900, "image");
    myFloor8 = new component(100, 100, "img/Floor.png", 800, 900, "image");
    myFloor9 = new component(100, 100, "img/EndFloor.png", 900, 900, "image");
    myBackground = new component (1000, 1000, "img/Background.jpg", 0, 0, "image");
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
        this.hitBlock1();
        this.hitBlock2();
        // this.hitBlock3();
        this.hitBlock4();
        this.hitBlock5();
        this.hitBlock6();
        this.hitBlock7();
        this.hitBlock8();
        this.hitBlock9();
        this.hitBottom();
        this.hitEnemy();
           
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            myGameArea.stop();
            // this.gravitySpeed = -(this.gravitySpeed);
            ctx.font = "45px Cute Font";
            ctx.fillStyle = "White";
            ctx.fillText("Game Over Loser", 350, 500);
        }
    }

    this.hitBlock = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor.x+(myFloor.width/2))&&(this.x+(this.width/2)>myFloor.x-(myFloor.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed) * this.bounce;
        } 
    }
    this.hitBlock1 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor1.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor1.x+(myFloor1.width/2))&&(this.x+(this.width/2)>myFloor1.x-(myFloor1.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
    this.hitBlock2 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor2.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor2.x+(myFloor2.width/2))&&(this.x+(this.width/2)>myFloor2.x-(myFloor2.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
    // this.hitBlock3 = function() {
    //     var blockbottom = myGameArea.canvas.height - (myFloor3.height + this.height);
    //     if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor3.x+(myFloor3.width/2))&&(this.x+(this.width/2)>myFloor3.x-(myFloor3.width/2)))) {
    //         this.y = blockbottom;
    //         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    //     } 
    // }
    this.hitBlock4 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor4.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor4.x+(myFloor4.width/2))&&(this.x+(this.width/4)>myFloor4.x-(myFloor4.width/4)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
    this.hitBlock5 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor5.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor5.x+(myFloor5.width/2))&&(this.x+(this.width/2)>myFloor5.x-(myFloor5.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
    this.hitBlock6 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor6.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor6.x+(myFloor6.width/2))&&(this.x+(this.width/2)>myFloor6.x-(myFloor6.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
    this.hitBlock7 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor7.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor7.x+(myFloor7.width/2))&&(this.x+(this.width/2)>myFloor7.x-(myFloor7.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
    this.hitBlock8 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor8.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor8.x+(myFloor8.width/2))&&(this.x+(this.width/2)>myFloor8.x-(myFloor8.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
    }
    this.hitBlock9 = function() {
        var blockbottom = myGameArea.canvas.height - (myFloor9.height + this.height);
        if (this.y > blockbottom && ((this.x-(this.width/2))<(myFloor9.x+(myFloor9.width/2))&&(this.x+(this.width/2)>myFloor9.x-(myFloor9.width/2)))) {
            this.y = blockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
            myGameArea.stop();
            ctx.font = "45px Cute Font";
            ctx.fillStyle = "White";
            ctx.fillText("You Win", 400, 500);
            
        } 
    }
    this.hitEnemy = function() {
        var enemybottom = myGameArea.canvas.height - (myEnemy.height + myEnemy.height + this.height);
        if (this.y > enemybottom && ((this.x-(this.width/2))<(myEnemy.x+(myEnemy.width/2))&&(this.x+(this.width/4)>myEnemy.x-(myEnemy.width/4)))) {
            this.y = enemybottom;
            myGameArea.stop();
            ctx.font = "45px Cute Font";
            ctx.fillStyle = "White";
            ctx.fillText("Game Over Loser", 350, 500);
        } 
    }

    // myGamePiece.prototype.checkCollision = function (body) {
    //     var leftCollision = (body.col === 0);
    //     var topCollision = (body.row === 0);
    //     var rightCollision = (body.col === myGamePiece.width - 1);
    //     var bottomCollision = (body.row === myGamePiece.height - 1);
    // }
}

function updateGameArea() {
    if (myGamePiece.hitEnemy(myEnemy)) {
        myGameArea.stop();
    } else if (myGamePiece.hitBlock9(myFloor9)) {
        myGameArea.stop();
    } else {
    
        myGameArea.clear();
        myBackground.newPos();
        myBackground.update();
        myGamePiece.speedX = 0;
        if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 6;}
        if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece.speedX = 6;}
        if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -6;}
        if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece.speedX = -6;}
        myGamePiece.newPos();
        myGamePiece.update();
        myFloor.update();
        myFloor1.update();
        myFloor2.update();
        // myFloor3.update();
        myFloor4.update();
        myFloor5.update();
        myFloor6.update();
        myFloor7.update();
        myFloor8.update();
        myFloor9.update();
        myEnemy.update();
    }
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