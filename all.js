//promise.all
const fs = require('fs');
//node中异步方法都有回调  并发 同时去读取文件 ，读取完毕的时机不一样
//并发操作 就是两个操作互不影响
const after = (timse, fn) => () => --timse == 0 && fn();

let out = after(2, () => {
    console.log(renderObj)
})
let renderObj = {};
fs.readFile('./name.txt', 'utf-8', function (err, data) {
    renderObj.name = data;
    out();
})
fs.readFile('./age.txt','utf-8',function(err,data){
    renderObj.age = data;
    out();
})