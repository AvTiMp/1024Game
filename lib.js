/*
 * @Author: BlingBling 
 * @Date: 2018-07-07 17:33:32 
 * @Last Modified by: BlingBling
 * @Last Modified time: 2018-07-09 00:21:33
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
    //块元素
    this.board = new Array();
    //已使用元素
    this.onList = new Array();
    //未使用元素
    this.emptyList = new Array();
    this.gameInit = function () {
        this.score = 0;
        this.gameEnd = false;
        this.board = new Array();
        for (let i = 0; i < 16; i++) {
            this.board.push(new cell(i));
            this.emptyList.push(i);
        }
        return "init done";
    }
    // 两格想乘
    this.cellPlus = function (cell1, cell2) {
        console.log(cell1);
        console.log(cell2);
        if(cell1.num == cell2.num){
            //将cell1 乘到cell2
            var cellIndex = this.onList.indexOf(cell1.id);
            this.onList.splice(cellIndex,1);
            this.emptyList.push(cell1.id);
            cell2.num *= cell1.num;
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
            return 2;
        }else{
            return 4;
        }
    }
    //随机选择1-2个空格子
    this.selectCell = function () {
        var temp = parseInt(Math.random() * this.emptyList.length);
        var id = this.emptyList[temp];
        this.emptyList = this.emptyList.splice(temp,1);
        this.onList.push(id);
        var num = this.randomNum();
        this.board[id].num = num;
        return this.board[id];
    }
    //随机生成2个带数字的格子
    this.chooseCell = function () {
        var temp = Math.random();
        this.selectCell();
        if(temp > 0.5 && this.emptyList.length > 0){
            this.selectCell();
        }
    }
    //按键事件
    this.keyDown = function (event) {
        switch(event){
            case "L":this.keyLeftCal();this.chooseCell();break;
        }
    }
    //按左键计算
    this.keyLeftCal = function () {
        //向左计算每一格
        for(let i=0;i<4;i++){
            for(let j=3;j >= 1;j--){
                var temp1 = i * 4 + j;
                var temp2 = i * 4 + j -1;
                this.cellPlus(this.board[temp1],this.board[temp2]);
            }
            //检查中间是否留空
            for(let m = 0;m < 4;m++){
                var temp = i * 4 + m;
                if(this.board[temp].num == 0 && (temp+1)%4 != 0){
                    //右边左移一位
                    var temp1 = temp + 1;
                    var cell1 = this.board[temp];
                    var cell2 = this.board[temp1];
                    //互换num
                    cell1.num = cell2.num;
                    cell2.num = 0;
                    //处理emptylist，onlist
                    this.emptyList.push(cell2.id);
                    this.onList.push(cell1.id);
                    var cell2Index = this.onList.indexOf(cell2.id);
                    this.onList.splice(cell2Index,1);
                    var cell1Index = this.emptyList.indexOf(cell1.id);
                    this.emptyList.splice(cell1Index,1);
                }
            }
        }
    }

}


var game = new newGame();



 