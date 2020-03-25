let fs = require('fs');
//有关联的请求 需要先通过第一个读取操作拿到返回结果，通过这个结果再去读取另一个文件
//上一个人输出是下一个人的输入
// fs.readFile('./name.txt','utf8',function(err,data){
//     fs.readFile('./age.txt','utf8',function(err,data){
//         console.log(data)
//     })
// }
// )
function read(...args){
    return new Promise((resolve,reject)=>{
        fs.readFile(...args,function(err,data){
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

//promise是通过链式调用的方式解决了多次请求并发问题
//成功的回调和失败的回调都可以返回一个结果
//情况1：如果返回的是一个promise，那么会让这个promise执行，并且采用他的状态，将成功或者失败的结果传递给外层的下一个then中
//情况2：如果返回的是一个普通值会把这个值作为外层的下一次then的成功的回调中
//情况3：抛出一个异常
read('./name.txt','utf8').then((data)=>{
    //console.log(data)
    return read(data+'1','utf8')
})
.catch(err=>{
    return 100
})//等同下面代码
// .then((data)=>{
//     console.log(data)
// },err=>{
//     return 100
// })
.then(data=>{
    console.log(data)//抛出异常可以走到 下次then的失败
    throw new Error('error');
})
// .then(null,(err)=>{
//     console.log(err)
// })
.catch(err=>{
    console.log(err)
    // console.log('只要上面then中没有捕获错误，就会执行这个catch')
})
.then(data=>{
    console.log(data)//undefined
})

//promise如何实现链式调用的 jq返回的this，promise的链式调用返回一个新的promise
//promise必须返回一个全新的promise，这样可以解决promise的状态问题，否则可能会出现promise刚开始成功又变了失败态