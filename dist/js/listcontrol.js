(function(root){
    function listControl(data,wrap){
        var list = document.createElement("div"),
            dl = document.createElement("dl"),
            dt = document.createElement("dt"),
            close = document.createElement("div"),
            musicList = [];
    list.className = 'list';
    dl.innerHTML = '播放列表';
    close.className = 'close';
    close.innerHTML = '关闭';
    dl.appendChild(dt);
    data.froEach(function(item,index){
        var dd = document.createElement("dd");
        dd.innerHTML = item.name;
        dl.appendChild(dd);
        musicList.push(dd);
    });
    list.appendChild(dl);
    list.appendChild(close);
    wrap.appendChild(list);
    return {
        dom:list,
        musicList:musicList,
    }
}
root.listControl = listControl();
})(window.player || (window.player = {}))