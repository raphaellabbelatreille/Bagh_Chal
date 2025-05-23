import Jeton from "./Jeton.js";


export default class Tigre extends Jeton {
    constructor(x, y, BoardTile, listeJeton , htmlElement, gameWorld, surname) {
        super(x,y,BoardTile, listeJeton, htmlElement, gameWorld);
        this.name = "tigre";
        this.surname = surname;
        //this.selectionerTigre_lier = this.selectionerTigre.bind(this)
        //this.element.addEventListener("click", this.selectionerTigre_lier)
    }
    selectionnerJetonSuperieur(tile){
        let jetonEnCours = tile.jetonOnTop;
        if (jetonEnCours.name == "chevre"){
            let chevreCibleX =jetonEnCours.currentNode.x
            let chevreCibleY =jetonEnCours.currentNode.y
            // gauche
            if (chevreCibleX == (this.currentNode.x-1) && chevreCibleY == (this.currentNode.y)){
                this.regardeSiCaseDeriereEstLibre(jetonEnCours ,-1, 0)
            }
            //droite
            if (jetonEnCours.jetonX == (this.currentNode.x+1) && jetonEnCours.jetonY == (this.currentNode.y)){
                this.regardeSiCaseDeriereEstLibre(jetonEnCours ,+1, 0)
            }
            //dessus
            if (jetonEnCours.jetonX == (this.currentNode.x) && jetonEnCours.jetonY == (this.currentNode.y-1)){
                this.regardeSiCaseDeriereEstLibre(jetonEnCours ,0, -1)
            }
            //dessous
            if (jetonEnCours.jetonX == (this.currentNode.x) && jetonEnCours.jetonY == (this.currentNode.y+1)){
                this.regardeSiCaseDeriereEstLibre(jetonEnCours ,0, +1)
            }
            if (this.currentNode.even){
                // haut gauche
                if (jetonEnCours.jetonX == (this.currentNode.x-1) && jetonEnCours.jetonY == (this.currentNode.y-1)){
                    this.regardeSiCaseDeriereEstLibre(jetonEnCours ,-1, -1)
                }
                // haut droite
                if (jetonEnCours.jetonX == (this.currentNode.x+1) && jetonEnCours.jetonY == (this.currentNode.y-1)){
                    this.regardeSiCaseDeriereEstLibre(jetonEnCours ,+1, -1)
                }
                // haut gauche
                if (jetonEnCours.jetonX == (this.currentNode.x-1) && jetonEnCours.jetonY == (this.currentNode.y+1)){
                    this.regardeSiCaseDeriereEstLibre(jetonEnCours ,-1, +1)
                }
                // haut droite
                if (jetonEnCours.jetonX == (this.currentNode.x+1) && jetonEnCours.jetonY == (this.currentNode.y+1)){
                    this.regardeSiCaseDeriereEstLibre(jetonEnCours ,+1, +1)
                }
            }
        }
    };
    regardeSiCaseDeriereEstLibre(chevre ,modiX, modiY){
        for (let index = 0 ; index< this.BoardTile.length ; index++){
            let tile = this.BoardTile[index]
            if (tile.x == (chevre.jetonX+modiX) && tile.y == (chevre.jetonY+modiY) && tile.occupe== false){
                this.possibleMove.push(tile)
                this.MoveBinder.push(this.capturerChevre.bind(this, chevre, tile))
            }
        }
           
    }
    capturerChevre(chevre,tileDerière){
        chevre.detruireJetonSupperieur();
        this.mouvementNormalVers(tileDerière)
        this.gameWorld.incrementerScoreTigre();
    }
    detruireJetonSupperieur(){
        this.detruireJeton()
    }
}