const {series,src,dest,watch} =require("gulp");
const htmlClean = require("gulp-htmlclean");
const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const stripDubug = require("gulp-strip-debug");
const uglify = require("gulp-uglify");
// const imageMIn = require("gulp-imagemin");//目前的插件问题还没有解决，后续会看看那些的出问题
const connect = require("gulp-connect");//gulp服务器
const folder = { //修改路径
    src:"src/",
    dist:"dist/"
}
function html(){
    return src(folder.src+ "html/*")
        .pipe(htmlClean())
        .pipe(dest(folder.dist + "html/"))
        .pipe(connect.reload());
}
function css(){
    return src(folder.src+ "css/*")
    .pipe(less()).pipe(cleanCss())
    .pipe(dest(folder.dist + "css/"))
    .pipe(connect.reload());
}
function js(){
    return src(folder.src+ "js/*")
    // .pipe(uglify())
    // .pipe(stripDubug()) 
    .pipe(dest(folder.dist + "js/"))
    .pipe(connect.reload());
}
function image(){
    return src(folder.src+ "image/*")
    // .pipe(imageMIn())
    .pipe(dest(folder.dist + "image/"))
}
function server(cb){//实现服务器
    connect.server({
        port:"1573",
        livereload:true,//自动刷新
    })
    cb()
}
//服务器配合文件监听，不用重新执行gulp，直接刷新就行
watch(folder.src + "html/*",function(cb){
    html()
    cb()
})
watch(folder.src + "css/*",function(cb){
    css()
    cb()
})
watch(folder.src + "js/*",function(cb){
    js()
    cb()
})
exports.default = series(html,css,js,image,server);