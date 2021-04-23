import { handlerData, handlerProxy, watcher } from "./handler.mjs";
import { mergeDOMElements } from "./compare.mjs";
import { Attribute, Section } from "./enumeration/constants.mjs";

export class Page{

    constructor() {
        this.container = document.createElement('div');
        this.container.setAttribute('id', Section.PAGE_CONTAINER);
        this.data = this.getData();
        this.makeReactivy();
        watcher(()=>{
            this.mountPage();
        })
    }

    mountPage(){
        this.container.innerHTML = this.getHTML();
        this.removePersistEventListener();
        mergeDOMElements(document.getElementById(Section.PAGE_CONTAINER), this.container);
        this.addPersistEventListener();
    }

    getHTML(){}

    makeReactivy(){
        for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                if(typeof this.data[key] === 'object' && this.data[key] !== null){
                    this.data[key] = new Proxy(this.data[key], handlerProxy);
                }
            }
        }
        this.data = new Proxy(this.data, handlerData);
    }

    addPersistEventListener(){
        let persistElements = document.getElementById(Section.PAGE_CONTAINER).querySelectorAll(`[${Attribute.MODEL}]`);
        for (let index = 0; index < persistElements.length; index++) {
            const persistElement = persistElements[index];
            let attributeValue = persistElement.getAttribute(Attribute.MODEL);
            if(this.data.hasOwnProperty(attributeValue)) {
                persistElement.value = this.data[attributeValue];
                persistElement.addEventListener(...this.persistEventListener);
            }
        }
    }

    removePersistEventListener(){
        let persistElements = document.getElementById(Section.PAGE_CONTAINER).querySelectorAll(`[${Attribute.MODEL}]`);
        for (let index = 0; index < persistElements.length; index++) {
            const persistElement = persistElements[index];
            let attributeValue = persistElement.getAttribute(Attribute.MODEL);
            if(this.data.hasOwnProperty(attributeValue)) {
                persistElement.removeEventListener(...this.persistEventListener);
            }
        }
    }

    persistEventListener = ['keyup', () => {
        this.setPersistValue(event, this.data);
    }]
    
    setPersistValue(event, data){
        data[event.target.getAttribute('i-model')] = event.target.value
    }


}