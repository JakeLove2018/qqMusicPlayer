(function(root){
    function AudioManage(){
        this.audio = new Audio;
        this.status = 'pause';//默认为暂停

    }
    AudioManage.prototype ={
        //加载音乐
        load(src){
            this.audio.src = src;//设置音乐的路径
            this.audio.load();
        },
        //播放音乐
        play(){
            this.audio.play()
            this.status = 'play';
        },
        //暂停音乐
        pause(){
            this.audio.pause()
            this.status = 'pause';
        },
        //音乐播放完成事件
        end(fn){
            this.audio.onended = fn;
        },
        //调到某个音乐的时间点
        playTo(time){
            this.audio.currentTime = time;  //单位为秒
        }
    }
    root.music = new AudioManage();//暴露实例对象
})(window.player || (window.player = {}));