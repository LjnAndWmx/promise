//函数柯里化---把一个函数的范围进行缩小，让函数变的更具体一些
//判断一个变量的类型
//判断类型 有四种方式 constructor instanceof typeof Object.prototype.toString.call
// function checkType(content,type){
//     return Object.prototype.toString.call(content) === `[object ${type}]`
// }
// let bool = checkType('hello','String')
// console.log(bool)

function checkType(type){
    //私有化，这个函数可以拿到上层函数的参数，这个空间不会被释放掉
    return function(content){
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}
let isString  = checkType('String')
let flag = isString('oooo')
console.log(flag)
let isBoolean = checkType('Boonlean')
let flag2 = isBoolean(true)
console.log(flag2)

let util = {}
['Number','String','Boolean'].forEach(item => {
    //相当于将函数 先调用依次
    // util['is'+item] = 

});