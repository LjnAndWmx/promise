let fs = require('fs')
let Promise1 = require('./2.promise')
let promise = new Promise1((resolve,reject)=>{
    reject('hello')
})
let promise2 = promise.then(data=>{
   // return data //如何将data向下传递就是调用promise2的resolve方法
    return new Promise((resolve,reject)=>{
        resolve('hello')
    })
},err=>{
    return 100
})

promise2.then(data=>{
    console.log('success',data)
},err=>{
    console.log('-----',err)
})

// function read(...args){
//     return new Promise((resolve,reject)=>{
//         fs.readFile(...args,function(err,data){
//             if(err){
//                 reject(err)
//             }
//             resolve(data)
//         })
//     })
// }