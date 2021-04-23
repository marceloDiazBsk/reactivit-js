let equalsElements = 0;
let newElements = 0;
let removeElements = 0;
let replacedElements = 0;

export function mergeDOMElements(targetElement, sourceElement, targetElementParentNode) {
    if(targetElement){
        if(sourceElement){
            if(!targetElement.isEqualNode(sourceElement)){
                if(targetElement.cloneNode(false).isEqualNode(sourceElement.cloneNode(false))){
                    validateChildsDiferentes(targetElement.childNodes, sourceElement.childNodes, targetElement);
                }else {
                    targetElementParentNode.insertBefore(sourceElement.cloneNode(true), targetElement);
                    targetElementParentNode.removeChild(targetElement);
                    replacedElements++;
                }
            }else{
                equalsElements++;
            }
        }else{
            targetElementParentNode.removeChild(targetElement);
            removeElements++;
        }
    }else{
        if(sourceElement){
            targetElementParentNode.appendChild(sourceElement.cloneNode(true));
            newElements++;
        }
    }
}

function validateChildsDiferentes(targetElementChildNodes, sourceElementChildNodes, targetElementParentNode) {
    for (let index = 0; index < sourceElementChildNodes.length; index++) {
        mergeDOMElements(targetElementChildNodes[index], sourceElementChildNodes[index], targetElementParentNode)
    }
}

