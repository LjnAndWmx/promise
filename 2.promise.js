console.log('--------------- my ---------------')
const PENDING = 'PENDING' //等待态
const FULFILLED = 'FULFILLED' //成功态
const REJECTED = 'REJECTED' //失败态
const resolvePromise = (promise2,x,resolve,reject)=>{
    //判断 可能你的promise要和别人的promise来混用
    //可能不同的promise库之间要互相调用
    if(promise2===x){//x 如果和promise是同一个人 x永远不能成功或失败，所以就卡死了，我们需要直接报错即可
        return reject(new TypeError('Chaining cycle detected for promise #<Promises>'))

    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];//存放成功时的回调函数
        this.onRejectedCallbacks = [];//存放失败时的回调函数
        //只有状态是等待态的时候 才可以更新状态
        let resolve = (value) => {
            if (this.status = PENDING) {
                this.status = FULFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        let reject = (reason) => {
            if (this.status = PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        //executor执行时，需要传入两个参数，给用户来改变状态的
        //executor(resolve,reject);
        try {
            executor(resolve, reject);
        } catch (error) { //表示当前有异常，那就使用这个异常作为promise失败的原因
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        //假如then返回的是promise对象
        //递归
        let promise2 = new Promise((resolve,reject)=>{
            if (this.status === FULFILLED) {
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                },0)
            }
            if (this.status === REJECTED) {
                setTimeout(()=>{
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                },0)
                
            }
            if(this.status = PENDING){//发布订阅
                
                this.onResolvedCallbacks.push(()=>{
                    //TODO
                    setTimeout(()=>{
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                    
                })
            }
        })
        
    }
}
module.exports = Promise