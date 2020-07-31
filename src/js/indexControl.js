(function(root){    
    function Index(len){
        this.index = 0;//当前的索引值
        this.len = len;//数据长度 判断
    }    
    Index.prototype ={
        prev(){//取上一首索引
            return this.get(-1)//切到上一首
        },
        next(){
            return this.get(1)// 切换下一首
        },
        get(val){//获取索引 参数为+1或者-1
            this.index = (this.index + val + this.len) % this.len;//自己的数字 % 比自己大的数字得出的结果就是本身
            //变化索引值 +1 -1 有val决定
            return this.index;
        }

    };
    root.controlIndex = Index;
})(window.player || (window.player = {}));