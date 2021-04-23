export let dependencys = new Map();
let target = null;

export const handlerData = {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver);
        if(typeof target[key] != 'object' && target[key] != null){
            if(dependencys.has(key)){
                dependencys.get(key).depend();
            }else{
                let newDep = new Dep();
                newDep.depend()
                dependencys.set(key, newDep);
            }
        } 

        return result;
    },
    set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        if(typeof target[key] != 'object' && target[key] != null){
            if(dependencys.has(key)) dependencys.get(key).notify(); 
        }
        return result;
    }
}

export const handlerProxy = {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver); 
        if(dependencys.has(receiver)){
            dependencys.get(receiver).depend();
        }else{
            let newDep = new Dep();
            newDep.depend()
            dependencys.set(receiver, newDep);
        }
        return result;
    },
    set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        if(dependencys.has(receiver)) dependencys.get(receiver).notify(); 
        return result;
    }
}

export function watcher(func){
    target = func;
    target()
    target = null;
}

class Dep{
    constructor(){
        this.subscribers = [];
    }
    depend(){
        if(target && !this.subscribers.includes(target)){
            this.subscribers.push(target);
        }
    }
    notify(){
        this.subscribers.forEach( sub => sub());
    }
}