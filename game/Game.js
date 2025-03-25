import Board_gazon from "./Board_gazon.js";
import Tigre from "./Tigre.js";


export class Game {
    constructor() {
        this.TAILLE = 5
        this.refBoard = document.getElementById("board");
        this.board = new Board_gazon(this.TAILLE)
        this.listeGazon = this.board.getListeGazon()
        this.refTiger = document.getElementById("tigre1");
        this.listeTigre = new Array();
        this.tigre = new Tigre(0,0,this.listeGazon, this.listeTigre ,document.getElementById("tigre1"), this)
        this.tigre2 = new Tigre(0,4,this.listeGazon, this.listeTigre, document.getElementById("tigre2"), this)
        this.tigre3 = new Tigre(4,0,this.listeGazon, this.listeTigre, document.getElementById("tigre3"), this)
        this.tigre4 = new Tigre(4,4,this.listeGazon, this.listeTigre, document.getElementById("tigre4"), this)
        this.listeTigre.push(this.tigre , this.tigre2, this.tigre3, this.tigre4)
        //refTiger.addEventListener("mouseover", function(){tigre.debutHover()})
    }
    finirTour(){
        for (let index= 0; index<this.listeTigre.length ; index++){
            this.listeTigre[index].finirSelection();
        }
    }
}


let game = new Game();

