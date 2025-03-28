import Jeton from "./Jeton.js";


export default class Chevre extends Jeton {
    constructor(x, y, BoardTile, listeJeton ,htmlElement, gameWorld) {
        super(x,y,BoardTile, listeJeton, htmlElement, gameWorld);
        this.name = "chevre"
    }
    selectionnerJetonSuperieur(tile){
        //rien
    };

    detruireJetonSupperieur(){
        this.element.removeEventListener("click", this.selectionerChevre_lier)
        this.detruireJeton()
    }

}