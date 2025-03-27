import Jeton from "./Jeton.js";


export default class Chevre extends Jeton {
    constructor(x, y, BoardTile, listeJeton ,htmlElement, gameWorld) {
        super(x,y,BoardTile, listeJeton, htmlElement, gameWorld);
        this.name = "chevre"
       /* this.selectionerChevre_lier = this.selectionerChevre.bind(this)
        this.element.addEventListener("click", this.selectionerChevre_lier)*/
    }
    selectionerChevre() {
        this.selectionerJeton();
        console.log("bee")
        this.creerListeDeMove()

    }
    selectionnerJetonSuperieur(tile){

    };

    detruireJetonSupperieur(){
        this.element.removeEventListener("click", this.selectionerChevre_lier)
        this.detruireJeton()
    }

}