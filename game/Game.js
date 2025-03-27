import Board_gazon from "./Board_gazon.js";
import Enclos_chevre from "./Enclos_chevre.js"
import Chevre from "./Chevre.js";
import Tigre from "./Tigre.js";


export class Game {
    constructor() {
        this.TAILLE = 500 //en px
        this.LONGUEUR = 5;
        this.RESERVE_CHEVRE = 5
        this.DISTANCE_ENTRE_NODE = this.TAILLE / this.LONGUEUR;

        this.refBoard = document.getElementById("board_gazon");
        //this.refBoard.style.width = toString(this.TAILLE+"px");
        this.refBoard.style.width = this.TAILLE+"px"
        this.refBoard.style.height = this.TAILLE+"px"
        this.board = new Board_gazon(this.LONGUEUR)
        this.listeGazon = this.board.getListeGazon()
        this.refTiger = document.getElementById("tigre1");
        this.listeJeton = new Array();
        this.tigre = new Tigre(0,0,this.listeGazon, this.listeJeton ,document.getElementById("tigre1"), this)
        this.tigre2 = new Tigre(0,this.LONGUEUR-1,this.listeGazon, this.listeJeton, document.getElementById("tigre2"), this)
        this.tigre3 = new Tigre(this.LONGUEUR-1,0,this.listeGazon, this.listeJeton, document.getElementById("tigre3"), this)
        this.tigre4 = new Tigre(this.LONGUEUR-1,this.LONGUEUR-1,this.listeGazon, this.listeJeton, document.getElementById("tigre4"), this)
        this.listeJeton.push(this.tigre , this.tigre2, this.tigre3, this.tigre4)
        this.enclosChevre = new Enclos_chevre(this.listeGazon, this.listeJeton , this.RESERVE_CHEVRE, this)
        this.enclosChevre.creerChevre(2,2)
        //refTiger.addEventListener("mouseover", function(){tigre.debutHover()})
    }
    finirTour(){
        for (let index= 0; index<this.listeJeton.length ; index++){
            this.listeJeton[index].finirSelection();
        }
    }
}


let game = new Game();

