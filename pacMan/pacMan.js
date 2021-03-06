$(document).ready(function(){

    var gameStatus = "off";

    var soundStart = document.getElementById("myAudioPac_start");
    soundStart.volume = 0.2;
    var soundChomp = document.getElementById("myAudioPac_chomp");
    soundChomp.volume = 0.2;
    var soundFruit = document.getElementById("myAudioPac_fruit");
    soundFruit .volume = 0.2;
    var soundDeath = document.getElementById("myAudioPac_death");
    soundDeath.volume = 0.2;
    var soundWin = document.getElementById("myAudioPac_win");
    soundWin.volume = 0.2;
    var soundLose = document.getElementById("myAudioPac_lose");
    soundLose.volume = 0.2;

    var world =[
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,1,1,1,1,1,2],
        [2,1,2,1,1,2,2,1,1,2,2,2,2,1,2,2,1,2,1,2,2,1,2],
        [2,1,1,2,2,2,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,2,2],
        [2,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,2,1,1,1,2,2,1,1,1,1,1,1,2,1,4,1,2,2,1,1,2],
        [2,1,2,2,2,2,2,1,1,2,2,1,2,2,2,1,1,1,2,2,1,2,2],
        [2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2],
        [2,1,4,2,1,1,1,1,1,2,1,1,2,1,1,1,1,2,2,2,1,4,2],
        [2,1,1,2,1,2,2,1,1,2,2,1,2,4,1,1,2,2,1,1,1,1,2],
        [2,1,1,1,1,2,2,1,1,2,1,1,2,1,2,1,2,1,1,2,2,1,2],
        [2,1,1,1,1,1,1,1,4,1,1,1,2,1,1,1,1,1,4,2,1,1,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    ];

    var pacman1 = {
        name: "pacManPacman1",
        x: 4,
        y: 40,
        lifebar: "pacManLife1",
        life: 3,
        score: 0,
        gameover: "pacMan1GameOver"
    };

    function defaultPacman1(){
        pacman1.x = 4;
        pacman1.y = 40;
        pacman1.life = 3;
        pacman1.score = 0;
        document.getElementById(pacman1.lifebar).style.backgroundColor = "green";
    }

    var r_ghost = {
        name: "pacManR_ghost",
        x: 14,
        y: 50
    }

    var y_ghost = {
        name: "pacManY_ghost",
        x: 13,
        y: 40
    }

    var g_ghost = {
        name: "pacManY_ghost",
        x: 24,
        y: 46
    }

    function defaultR_ghost(){
        r_ghost.x = 14;
        r_ghost.y = 50;
        y_ghost.x = 13;
        y_ghost.y = 40;
        g_ghost.x = 24;
        g_ghost.y = 46;
    }

    function displayWorld(){
        var output = "";

        for(var i = 0; i < world.length; i++){
            output += "\n<div class='pacManRow'>\n";
            for(var j = 0; j < world[i].length; j++){     
                if(world[i][j] == 2){
                    output += "<div class='pacManBrick'></div>";
                }
                else if(world[i][j] == 1){
                    output += "<div class='pacManCoin'></div>";
                }
                else if(world[i][j] == 0){
                    output += "<div class='pacManEmpty'></div>";
                }
                else if(world[i][j] == 4){
                    output += "<div class='pacManCherry'></div>";
                }
            }
            output += "\n</div>";
        }
        document.getElementById('pacManWorld').innerHTML = output;
    }

    function displayPacman(pacman){
        var name = pacman.name;
        document.getElementById(name).style.top = pacman.y*20 + "px";
        document.getElementById(name).style.left = pacman.x*20 + "px";
    }

    function displayGhosts(){
        document.getElementById('pacManR_ghost').style.top = r_ghost.y*20 + "px";
        document.getElementById('pacManR_ghost').style.left = r_ghost.x*20 + "px";
        document.getElementById('pacManY_ghost').style.top = y_ghost.y*20 + "px";
        document.getElementById('pacManY_ghost').style.left = y_ghost.x*20 + "px";
        document.getElementById('pacManG_ghost').style.top = g_ghost.y*20 + "px";
        document.getElementById('pacManG_ghost').style.left = g_ghost.x*20 + "px";
    }

    function displayScore(){
        document.getElementById('pacManScore1').innerHTML = pacman1.score;
    }

    function displayLife(){
        document.getElementById('pacManLife1').innerHTML = pacman1.life;
    }

    function checkGhostCol(pacman, ghost){
        if (pacman.x == ghost.x & pacman.y == ghost.y){
            displayGhosts();
            displayPacman(pacman);
            soundDeath.play();
            if (pacman.life > 1){
                pacman.life--;
                alert("You've hit a Ghost and have lost a PacMan Life. Lives remaining: " + pacman.life + " . Are you ready?");
            }
            else if (pacman.life == 1){
                pacman.life--;
                soundLose.play();
                alert("You have " + pacman.life + " lives remaining... You've lost...");
            }
            pacman.x = 4;
            pacman.y = 40;
            displayPacman(pacman);
            
        }


        if (pacman.life == 0){
            var pacLifeBar = pacman.lifebar;
            var pacGameOver = pacman.gameover;
            document.getElementById(pacLifeBar).style.backgroundColor = "red";
            removeDisplay(pacman);
            document.getElementById(pacGameOver).style.visibility = "visible";
            gameOver();
        }
        displayLife();
    }

    function moveGhost(ghost){
        var move = Math.trunc(((Math.random() * 4) + 1));
        plusX = 3;
        plusY = 39;
        if (move == 1){ //Move UP
            if(world[ghost.y-1-plusY][ghost.x-plusX] != 2){
                ghost.y--;
            }
        }
        else if (move == 2){ //Move DOWN
            if(world[ghost.y+1-plusY][ghost.x-plusX] != 2){
                ghost.y++;
            }
        }
        else if (move == 3){ //Move LEFT
            if(world[ghost.y-plusY][ghost.x-1-plusX] != 2){
                ghost.x--;
            }
        }
        else if (move == 4){ //Move RIGHT
            if(world[ghost.y-plusY][ghost.x+1-plusX] != 2){
                ghost.x++;
            }
        }
        if (pacman1.life != 0){
            checkGhostCol(pacman1, r_ghost);
            checkGhostCol(pacman1, g_ghost);
            checkGhostCol(pacman1, y_ghost);
        }
        displayGhosts();
    }

    //this works to remove the object display
    function removeDisplay(object){
        var name = object.name;
        if (name == "pacManPacman1"){
            document.getElementById(name).style.top = 780 + "px";
            document.getElementById(name).style.left = 60 + "px";
        }
    }

    displayWorld();
    displayScore();
    displayLife();
    displayPacman(pacman1);
    displayGhosts();

    document.onkeydown = function(e){
        if (gameStatus == "on"){
            //PacMan1 Moves
            if (pacman1.life != 0){
                if (e.keyCode == 65 && world[pacman1.y-39][pacman1.x-1-3] != 2){ //PacMan1 Move Left
                    document.getElementById('pacManPacman1').style.backgroundImage = "url('pacMan/img/pacman1_l.gif')";
                    pacman1.x--;
                }
                else if (e.keyCode == 68 && world[pacman1.y-39][pacman1.x+1-3] != 2){ //PacMan1 Move Right
                    document.getElementById('pacManPacman1').style.backgroundImage = "url('pacMan/img/pacman1_r.gif')";
                    pacman1.x++;
                }
                else if (e.keyCode == 87 && world[pacman1.y-1-39][pacman1.x-3] != 2){ //PacMan1 Move Up
                    document.getElementById('pacManPacman1').style.backgroundImage = "url('pacMan/img/pacman1_u.gif')";
                    pacman1.y--;
                }
                else if (e.keyCode == 83 && world[pacman1.y+1-39][pacman1.x-3] != 2){ //PacMan1 Move Down
                    document.getElementById('pacManPacman1').style.backgroundImage = "url('pacMan/img/pacman1_d.gif')";
                    pacman1.y++;
                }
            }

            //PacMan1 Scores
            if (pacman1.life != 0){
                if(world[pacman1.y-39][pacman1.x-3] == 1){
                    world[pacman1.y-39][pacman1.x-3] = 0;
                    pacman1.score += 10;
                    soundChomp.play();
                }
                if(world[pacman1.y-39][pacman1.x-3] == 4){
                    world[pacman1.y-39][pacman1.x-3] = 0;
                    pacman1.score += 50;
                    soundFruit.play();
                }
                displayPacman(pacman1);
                checkGhostCol(pacman1, r_ghost);
                checkGhostCol(pacman1, g_ghost);
                checkGhostCol(pacman1, y_ghost);
            }

            displayScore();
            displayWorld();
            checkCoins(pacman1);
        }
    }

    var ghost1;
    $("#pacMangameButton").click(function(){
        soundStart.play();
        world =[
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,1,1,1,1,1,2],
            [2,1,2,1,1,2,2,1,1,2,2,2,2,1,2,2,1,2,1,2,2,1,2],
            [2,1,1,2,2,2,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,2,2],
            [2,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,1,2,1,1,1,2,2,1,1,1,1,1,1,2,1,4,1,2,2,1,1,2],
            [2,1,2,2,2,2,2,1,1,2,2,1,2,2,2,1,1,1,2,2,1,2,2],
            [2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2],
            [2,1,4,2,1,1,1,1,1,2,1,1,2,1,1,1,1,2,2,2,1,4,2],
            [2,1,1,2,1,2,2,1,1,2,2,1,2,4,1,1,2,2,1,1,1,1,2],
            [2,1,1,1,1,2,2,1,1,2,1,1,2,1,2,1,2,1,1,2,2,1,2],
            [2,1,1,1,1,1,1,1,4,1,1,1,2,1,1,1,1,1,4,2,1,1,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        ];
        displayWorld();
        defaultPacman1();
        document.getElementById(pacman1.gameover).style.visibility = "hidden";
        document.getElementById('pacManPacman1').style.backgroundImage = "url('pacMan/img/pacman1_r.gif')";
        displayPacman(pacman1);
        displayScore();
        displayLife();
        defaultR_ghost();
        displayGhosts();
        setTimeout(function () {
            gameStatus = "on";
            document.getElementById('pacMangameButton').style.visibility = "hidden";
            ghost1 = setInterval( () =>{moveGhost(r_ghost);}, 400);
            ghost2 = setInterval( () =>{moveGhost(y_ghost);}, 400);
            ghost3 = setInterval( () =>{moveGhost(g_ghost);}, 400);
        }, 4000);
    });

    function gameOver(){
        gameStatus = "off";
        clearInterval(ghost1);
        clearInterval(ghost2);
        clearInterval(ghost3);
        document.getElementById("pacMangameButton").innerHTML = "Play Again?";
        document.getElementById('pacMangameButton').style.visibility = "visible";
    }

    function checkCoins(pacman1){
        var total = pacman1.score;

        if(total == 1980){
            gameOver();
            if (pacman1.life != 0){
                document.getElementById(pacman1.gameover).innerHTML = "You've Won!";
                document.getElementById(pacman1.gameover).style.visibility = "visible";
                displayPacman(pacman1);
                soundWin.play();
            }
            displayPacman(pacman1);
        }
    }
});