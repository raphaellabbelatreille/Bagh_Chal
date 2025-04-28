import Jeton from "./Jeton.js";


export default class Chevre extends Jeton {
    constructor(x, y, BoardTile, listeJeton ,htmlElement, gameWorld) {
        super(x,y,BoardTile, listeJeton, htmlElement, gameWorld);
        this.name = "chevre"
        this.isDead = false;
    }
    selectionnerJetonSuperieur(tile){
        //rien
    };

    detruireJetonSupperieur(){
        this.element.removeEventListener("click", this.selectionerChevre_lier)
        this.isDead = true;
        this.detruireJeton()
    }

}