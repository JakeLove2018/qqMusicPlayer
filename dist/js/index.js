(function($,player){
    function MusicPlayer(dom){
        this.wrap = dom;//播放器容器，加载模块 列表切歌
        this.dataList = []//存储获取请求到的数据
        this.indexObj = null //歌曲索引 对象
        // this.now = 0;//歌曲索引、
        this.rotateTimer = null; 
    };
    MusicPlayer.prototype = {
        init(){ // 初始化
            this.getDom();//获取参数
            this.getData("../mock/data.json");//请求数据
        },
        getDom(){//获取页面元素
            this.record = document.querySelector(".sonImg img");//旋转图片
            this.controlBtns = document.querySelectorAll(".control li");//底部导航按钮
        },
        getData(url){
            var This = this;
            $.ajax({
                url:url,
                method:'get',
                success:function(data){
                    This.dataList = data; //存储请求数据
                    // This.listPlay();//列表切歌
                    This.indexObj = new player.controlIndex(data.length);
                    This.loadMusic(This.indexObj.index);//加载音乐
                    This.musicControl();//添加音乐操作功能
                },
                error:function(){
                    console.log("数据请求失败");
                }
            })
        },
        loadMusic(index){ //加载音乐
            player.render(this.dataList[index]);
            player.music.load(this.dataList[index].audioSrc);
            //播放音乐 条件判断 只有装太为play的状态才能播放
            if(player.music.status == 'play'){
                player.music.play();
                this.controlBtns[2].className = 'playing';//按钮状态成播放
                this.imgRotate(0);
            }
            this.list
        },
        musicControl(){//上一首 下一首 暂停 
            //s上一首
            var This = this;
            this.controlBtns[1].addEventListener('touchend',function(){
                player.music.status = 'play';
                // This.now--;
                This.loadMusic(This.indexObj.prve());
            });
            //播放和暂停
            this.controlBtns[2].addEventListener('touchend',function(){
                if(player.music.status == 'play'){
                    player.music.pause();
                    this.className = '';
                    This.imgStop();
                }else{
                    player.music.play();
                    this.className = 'playing ';
                    var deg = This.record.dataset.rotate || 0;
                    This.imgStop (deg);
                    
                }
            });

            //下一首
            this.controlBtns[3].addEventListener('touchend',function(){
                player.music.status = 'play';
                // This.now--;
                // This.loadMusic(++This.now);
                This.loadMusic(This.indexObj.next());
            });
        },
        imgRotate(deg){//旋转唱片
            var This = this;
            clearInterval(this.rotateTimer)
            this.rotateTimer = setInterval(function(){
                deg = +deg + 0.2; //字符串转换成数字
                This.record.style.transform = 'rotate(' +deg + ' deg )';
                This.record.dataset.rotate = deg;//把旋转的角度存储到标签身上
            },1000/60)
        },
        imgStop(){
            clearInterval(this.imgRotateTimer);
        } ,
        // listPlay(){
        //     this.list = player.listControll(this.dataList,this.wrap);
            
        // }
    };
    
    var wrap = document.getElementById("wrap");
    var musicPlayer = new MusicPlayer(wrap);
    musicPlayer.init();
})(window.Zepto,window.player);