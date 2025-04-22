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
    souligneNode(importance){
        if (importance == null){
            importance = 50
        }
        if (importance >= 70){
            this.element.classList.add("bordered");

        } else {
            this.element.style.border="";

        }
        this.element.style.background = "radial-gradient(rgb(193, 193, 193, "+importance+"%) 0%, rgb(193, 193, 193,0) "+importance+"%)"
        //this.element.style.filter = "blur(100)";
    }
    deSouligneNode(){
        this.element.style.background = "";
        this.element.classList.remove("bordered");
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