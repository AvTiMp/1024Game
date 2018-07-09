/*
 * @Author: BlingBling 
 * @Date: 2018-07-07 17:31:40 
 * @Last Modified by: BlingBling
 * @Last Modified time: 2018-07-09 16:04:13
 * GAME LOGIC
 */

window.onload = function(){
    //游戏初始化
    console.log(game.gameInit());
    //游戏逻辑
    var startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click",function(){
        console.log("游戏开始");
        game.gameInit()
        game.chooseCell();
        draw();
        //遮罩层
        var mask = document.getElementById("mask");
        //游戏结束元素
        var gameOverText = document.getElementById("gameOverText");
        // var gameOverBtn = document.getElementById("gameOverBtn");
        mask.className = "display_none";
        startBtn.className = "display_none";
        var showEndMask = false;
        document.onkeydown = function(e) {
            var keyNum=window.event ? e.keyCode :e.which;
            if(game.gameEnd){
                
                return;
            }
            switch (e.keyCode){
                case 37:game.keyDown("L");break;
                case 38:game.keyDown("U");break;
                case 39:game.keyDown("R");break;
                case 40:game.keyDown("D");break;
            }
            //重画格子
            draw();
            if(game.gameEnd){
                mask.className="mask flex";
                gameOverText.className="maskText";
                startBtn.className = "btn";
                startBtn.innerText ="RESTART GAME";
            }
            console.log("game over:"+game.gameEnd);
        }
    });
    
};

//重画格子
function draw(){
    for(var i=0;i<game.board.length;i++){
        var cell = game.board[i];
        var id = cell.id;
        var num = cell.num;
        var cellHtml = document.getElementById(id);
        if(num != 0){
            cellHtml.className="gameCell num"+num;
            cellHtml.innerText = num;
        }else{
            cellHtml.className="gameCell";
            cellHtml.innerText = "";
        }
    }
    //重画分数
    var score = document.getElementById("score");
    score.innerHTML = game.score;
}






 