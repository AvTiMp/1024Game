/*
 * @Author: BlingBling 
 * @Date: 2018-07-07 17:33:32 
 * @Last Modified by: AvTiMp
 * @Last Modified time: 2019-05
 */

var cell = function (id) {
    this.num = 0;
    this.id = id;
    this.x = parseInt(id / 4);
    this.y = id % 4;
}

cell.prototype = {
    clean:function(){
        this.num = 0;
    },
    setNum:function(num) {
        this.num = num;
    }
}

var newGame = function () {
    this.score = 0;
    this.gameEnd = false;
    this.eleList = [];
    //块元素
    this.board = new Array();
    //已使用元素
    this.onList = new Set();//new Array();
    //未使用元素
    this.emptyList = new Set();//new Array();
    this.gameInit = function () {
        this.score = 0;
        this.gameEnd = false;
        this.eleList = eleList;
        this.board = new Array();
        for (let i = 0; i < 16; i++) {
            this.board.push(new cell(i));
            this.emptyList.add(i);
        }
        return "init done";
    }
    // 两格想加
    this.cellPlus = function (cell1, cell2) {
        if(cell1.num == cell2.num){
			if (cell1.num === 0) {
				return 
			}
			var index = this.getClassNum(cell1.num)
            cell2.num = this.eleList[index+1];
            this.score += Math.pow(2, index+1);
            cell1.clean();
            return true;
        }else{
            return false;
        }
    }
    // 随机生成2或4
    this.randomNum = function () {
        var temp = Math.random();
        if( temp < 0.5){
            return this.eleList[0];
        }else{
            return this.eleList[1];
        }
    }
	
	this.getClassNum = function(num) {
		for (var i=0; i<this.eleList.length;i++) {
			if (this.eleList[i] == num) {
				return i
			}
		}
		return -1
	}
	
    //随机选择1-2个空格子
    this.selectCell = function () {
        var temp = parseInt(Math.random() * this.emptyList.size);
        var flag = 0;
        var id;
        for(var element of this.emptyList) {
            if(flag == temp ){
                id = element;
                break;
            }
            flag++;
        }
        this.emptyList.delete(id);
        this.onList.add(id);
        var ranNum = this.randomNum();
        this.board[id].num = ranNum;
        return this.board[id];
    }
    //随机生成2个带数字的格子
    this.chooseCell = function () {
        var temp = Math.random();
        this.selectCell();
        if(temp > 0.5 && this.emptyList.size > 0){
            this.selectCell();
        }
    }
    //按键事件
    this.keyDown = function (event) {
        switch(event){
            case "L":this.keyLeftCal();this.checkGameOver();break;
            case "R":this.keyRightCal();this.checkGameOver();break;
            case "U":this.keyUpCal();this.checkGameOver();break;
            case "D":this.keyDownCal();this.checkGameOver();break;
        }
        if(!this.gameEnd){
            this.chooseCell();
        }
    }
    //按左键计算
    this.keyLeftCal = function () {
        //首先全部格子向左靠边
        this.leftSide();
        //向左计算每一格
        for(let i=0;i<4;i++){
            for(let j=0;j <3;j++){
                var temp1 = i * 4 + j;
                var temp2 = i * 4 + j + 1;
                this.cellPlus(this.board[temp1],this.board[temp2]);
            }
        }
        this.leftSide();
        this.resetList();
    }
    //按右键计算
    this.keyRightCal = function () {
        //首先全部格子向右靠边
        this.rightSide();
        //向右计算每一格
        for(let i=0;i<4;i++){
            for(let j=3;j >0;j--){
                var temp1 = i * 4 + j;
                var temp2 = i * 4 + j - 1;
                this.cellPlus(this.board[temp1],this.board[temp2]);
            }
        }
		
        this.rightSide();
        this.resetList();
    }
    //按上键计算
    this.keyUpCal = function () {
        //首先全部格子向右靠边
        this.upSide();
        //向上计算每一格
        for(let i=0;i<4;i++){
            for(let j=0;j <3;j++){
                var temp1 = i + 4 * j;
                var temp2 = i + 4 * (j +1);
                this.cellPlus(this.board[temp1],this.board[temp2]);
            }
        }
        this.upSide();
        this.resetList();
    }
    //按下键计算
    this.keyDownCal = function () {
        //首先全部格子向右靠边
        this.downSide();
        //向下计算每一格
        for(let i=0;i<4;i++){
            for(let j=3;j >0;j--){
                var temp1 = i + 4 * j;
                var temp2 = i + 4 * (j -1);
                console.log(1111,temp1, temp2)
                this.cellPlus(this.board[temp1],this.board[temp2]);
            }
        }
        this.downSide();
        this.resetList();
    }
    //格子向左靠边
    this.leftSide = function() {
        for(var i=0;i<4;i++){
            var val = new Array();
            for(var m=0;m<4;m++){
                var num = this.board[i*4+m].num;
                if(num != 0){
                    val.push(this.board[i*4+m].num);
                }
            }
            for(var k=0;k<4;k++){
                if (k < val.length) {
                    this.board[i * 4 + k].num = val[k];
                } else {
                    this.board[i*4+k].num = 0;
                }
            }
        }
    }
    //格子向右靠边
    this.rightSide = function() {
        for(var i=0;i<4;i++){
            var val = new Array();
            for(var m=3;m>-1;m--){
                var num = this.board[i*4+m].num;
                if(num !== 0){
                    val.push(this.board[i*4+m].num);
                }
            }
            var len = val.length;
            var z = 0;
            for(var k=3;k>-1;k--){
                if (z < len) {
                    this.board[i * 4 + k].num = val[z];
                } else {
                    this.board[i*4+k].num = 0;
                }
                z++;
            }
        }
    }
    //格子向上靠边
    this.upSide = function() {
        for(var i=0;i<4;i++){
            var val = new Array();
            for(var m=0;m<4;m++){
                var num = this.board[i+4*m].num;
                if(num != 0){
                    val.push(this.board[i+4*m].num);
                }
            }
            for(var k=0;k<4;k++){
                if (k < val.length) {
                    this.board[i + 4 * k].num = val[k];
                } else {
                    this.board[i+4*k].num = 0;
                }
            }
        }
    }
    //格子向下靠边
    this.downSide = function() {
        for(var i=0;i<4;i++){
            var val = new Array();
            for(var m=3;m>-1;m--){
                var num = this.board[i+4*m].num;
                if(num != 0){
                    val.push(this.board[i+4*m].num);
                }
            }
            var z = 0;
            for(var k=3;k>-1;k--){
                if (z < val.length) {
                    this.board[i + 4 * k].num = val[z];
                } else {
                    this.board[i+4*k].num = 0;
                }
                z++;
            }
        }
    }
    //  重新设置list
    this.resetList = function() {
        this.onList = new Set();
        this.emptyList = new Set();
        for(var i=0;i<this.board.length;i++){
            var cell =  this.board[i];
            if(cell.num == 0){
                this.emptyList.add(cell.id);
            }else{
                this.onList.add(cell.id);
            }
        }
    }
    //gameOver
    this.checkGameOver = function() {
        if(this.emptyList.size ==0){
            this.gameEnd = true;
            return true;
        }else{
            this.gameEnd = false;
            return false;
        }
    }

}

function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}





 