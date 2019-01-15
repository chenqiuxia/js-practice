// https://segmentfault.com/a/1190000004384515

// export default class  Observer{
//     constructor(value) {
//         this.value = value
//         this.walk(value)
//     }
//     //递归。。让每个字属性可以observe
//     walk(value){
//         Object.keys(value).forEach(key=>this.convert(key,value[key]))
//     }
//     convert(key, val){
//         defineReactive(this.value, key, val)
//     }
// }
//
//
// export function defineReactive (obj, key, val) {
//     var dep = new Dep()
//     var childOb = observe(val)
//     Object.defineProperty(obj, key, {
//         enumerable: true,
//         configurable: true,
//         get: ()=>{
//             // 说明这是watch 引起的
//             if(Dep.target){
//                 dep.addSub(Dep.target)
//             }
//             return val
//         },
//         set:newVal=> {
//             var value =  val
//             if (newVal === value) {
//                 return
//             }
//             val = newVal
//             childOb = observe(newVal)
//             dep.notify()
//         }
//     })
// }
//
//
// export function observe (value, vm) {
//     if (!value || typeof value !== 'object') {
//         return
//     }
//     return new Observer(value)
// }
//
// export default class Dep {
//     constructor() {
//         this.subs = []
//     }
//     addSub(sub){
//         this.subs.push(sub)
//     }
//     notify(){
//         this.subs.forEach(sub=>sub.update())
//     }
// }
//
// Dep.target = null



export default class Observer {
    constructor (value) {
        this.value = value
        this.walk(value)

    }
    walk (value) {
        Object.keys(value).forEach(key => this.convert(key, value[key]))
    }
    convert (key, value) {
        this.defineReactive(this.value,key, value)
    }
    defineReactive (obj, key ,value) {
        let dep = new Dep();
        let childOb = observe(value)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: () => value,
            set: newValue => {
                if (newValue === value) {
                    return
                }
                value = newValue
                childOb = observe(newValue)
                dep.notify()
            }
        })

    }
}
export default class Dep {
    constructor () {
        this.subs = []
    }
    addSub (sub) {
        this.subs.push(sub)
    }
    notify () {
        this.subs.forEach(sub => sub.update())
    }
}

Dep.target = null

function observe (value) {
    if (!value || typeof value != 'object') {
        return
    } else {
        return new Observer(value)
    }

}

export default class Watcher {
    constructor () {

    }
}
