import { Element } from './Element.js';

export class Tile_gazon extends Element {
    constructor(x, y, htmlElement) {
        super(htmlElement);
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
    quandJetonRentre(){
        this.occupe = false;
    }
    quandJetonSort(){
        this.occupe = false;
    }
}