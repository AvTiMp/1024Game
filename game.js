/*
 * @Author: BlingBling 
 * @Date: 2018-07-07 17:31:40 
 * @Last Modified by: BlingBling
 * @Last Modified time: 2018-07-09 00:20:15
 * GAME LOGIC
 */

window.onload = function(){
    //游戏初始化
    console.log(game.gameInit());
    //游戏逻辑
    var startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click",function(){
        console.log("游戏开始");
        game.chooseCell();
        draw();
        var mask = document.getElementById("mask");
        mask.className = "display_none";
        document.onkeydown = function(e) {
            var keyNum=window.event ? e.keyCode :e.which;
            switch (e.keyCode){
                case 37:console.log("left");game.keyDown("L");draw();break;
                case 38:console.log("up");break;
                case 39:console.log("right");break;
                case 40:console.log("down");break;
            }
        }
    });
    
};

//按下左键
function keyLeft(){
    //每一行，右边向左作乘法
    
}

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
        }
    }
}






 