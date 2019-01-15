export default class Watcher {
    constructor(vm, expOrFn, cb) {
        this.cb = cb
        this.vm = vm
        //此处简化.要区分fuction还是expression,只考虑最简单的expression
        this.expOrFn = expOrFn
        this.value = this.get()
    }
    update(){
        this.run()
    }
    run(){
        const  value = this.get()
        if(value !==this.value){
            this.value = value
            this.cb.call(this.vm)
        }
    }
    get(){
        Dep.target = this
        //此处简化。。要区分fuction还是expression
        const value = this.vm._data[this.expOrFn]
        Dep.target = null
        return value
    }
}