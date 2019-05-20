/*
 * @Author: BlingBling 
 * @Date: 2018-07-07 17:33:32
 * @Last Modified by: AvTiMp
 * @Last Modified time: 2019-05
 */


//eleList = ["",]
game = new newGame();
eleList = []
window.onload = function() {
    //游戏初始化
    let backendUri = ""

    // 获取eleList， 作为1024游戏每个方块的显示等级，如[2,4,8,16,32,64,128,256,512,1024]
    $.getJSON("./config/config.json", function (data) {
        if (data.eleList != undefined && data.eleList != "") {
            eleList = data.eleList
            game.eleList = eleList
            console.log("使用本地配置的eleList");
            init()
        } else {
            backendUri = data.backendUri
            if (backendUri == undefined || backendUri == ""){
                alert("invalid backend")
            } else {
                $.get(backendUri + "/elelist",function(data,status){
                    //console.log("数据: " + data + "\n状态: " + status);
                    eleList = JSON.parse(data).eleList
                    game.eleList = eleList
                    console.log("使用后端配置的eleList");
                    init()
                })
            }
        }
    })

};



//游戏逻辑
function init() {
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
}


//重画格子
function draw(){
    for(var i=0;i<game.board.length;i++){
        var cell = game.board[i];
        var id = cell.id;
        var num = cell.num;
        var cellHtml = document.getElementById(id);
        if(num !== 0){
			var index = getClassNum(num)
            cellHtml.className="gameCell num"+index;
            cellHtml.innerText = eleList[index];
        }else{
            cellHtml.className="gameCell";
            cellHtml.innerText = "";
        }
    }
    //重画分数
    var score = document.getElementById("score");
    score.innerHTML = game.score;
}

function getClassNum(num) {
	for (var i=0; i<eleList.length;i++) {
		if (eleList[i] == num) {
			return i
		}
	}
	return 1
}



 