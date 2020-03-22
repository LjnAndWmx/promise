const fs = require('fs')
//订阅 就是将要做的事情先存储好，稍后发布的时候让订阅好的事情依次执行
//观察者模式和发布订阅之间有什么联系？----用一个数组存起来，然后依次执行
let e = {
    arr:[],//观察者------发布订阅 他们两者之间没有联系
    on(fn){//订阅是往观察者存放
        this.arr.push(fn)
    },
    emit(){//发布是依次执行观察者
        this.arr.forEach(fn=>fn())
        console.log(Object.keys(renderObj).length)
    }
}
e.on(()=>{
    console.log('读取到数据了')
})
let renderObj = {}
e.on(()=>{
    if(Object.keys(renderObj).length==2){
        console.log('都读取完毕了')
    }
})

fs.readFile('./age.txt','utf-8',function(err,data){
    renderObj['age'] = data
    e.emit()//触发  发射
})
fs.readFile('./name.txt','utf-8',function(err,data){
    renderObj['name'] = data
    e.emit()
})
