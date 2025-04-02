import { Element } from './Element.js';

export default class Node_gazon extends Element {
    constructor(x, y, htmlElement) {
        super(htmlElement);
        this.name = "node_gazon"
        this.x = x;
        this.y = y;
        this.id = x + y*5;
        if(this.id % 2 == 0){
            this.even = true
        } else {
            this.even = false
        }
        this.occupe = false;
    }
    souligneNode(){
        this.element.style.border = "3px solid blue"
    }
    deSouligneNode(){
        this.element.style.border = ""
    }
    quandJetonRentre(jeton){
        this.occupe = false;
        this.jetonOnTop = jeton
    }
    quandJetonSort(){
        this.occupe = false;
        this.jetonOnTop = "";
    }
    detruireGazon(){
        this.detruireElement();
    }
}