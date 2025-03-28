import Board_gazon from "./Board_gazon.js";
import Enclos_chevre from "./Enclos_chevre.js"
import Chevre from "./Chevre.js";
import Tigre from "./Tigre.js";


export class Game {
    constructor() {
        this.TAILLE = 500 //en px
        this.LONGUEUR = 5;
        this.RESERVE_CHEVRE = 20
        this.DISTANCE_ENTRE_NODE = this.TAILLE / this.LONGUEUR;

        this.refBoard = document.getElementById("board_gazon");
        //this.refBoard.style.width = toString(this.TAILLE+"px");
        this.refBoard.style.width = this.TAILLE+"px"
        this.refBoard.style.height = this.TAILLE+"px"
        this.board = new Board_gazon(this.LONGUEUR)
        this.listeGazon = this.board.getListeGazon()
        this.listeJeton = new Array();
        this.enclosChevre = new Enclos_chevre(this.listeGazon, this.listeJeton , this.RESERVE_CHEVRE, this)
        this.listeJeton.push(new Tigre(0,0,this.listeGazon, this.listeJeton ,document.getElementById("tigre1"), this))
        this.listeJeton.push(new Tigre(0,this.LONGUEUR-1,this.listeGazon, this.listeJeton ,document.getElementById("tigre2"), this))
        this.listeJeton.push(new Tigre(this.LONGUEUR-1,0,this.listeGazon, this.listeJeton ,document.getElementById("tigre3"), this))
        this.listeJeton.push(new Tigre(this.LONGUEUR-1,this.LONGUEUR-1,this.listeGazon, this.listeJeton ,document.getElementById("tigre4"), this))
        this.enclosChevre.creerChevre(2,2);
        this.tourEnCours = "tigre";
        this.initialiserScore()
    }
    finirTour(){
        for (let index= 0; index<this.listeJeton.length ; index++){
            this.listeJeton[index].deactiverSelection();
            this.listeJeton[index].finirSelection();
        }
        this.enclosChevre.deactiverSelectionChevre();
        this.enclosChevre.deactiverCreationChevre();
        if (!this.verifierConditionsVictoire() ){
            switch(this.tourEnCours){
                case "chevre": this.debutTour("tigre"); 
                break;
                case "tigre": this.debutTour("chevre"); 
                break;
            }
        }
    }
    debutTour(animal){
        console.log("au tour de "+animal)
        this.tourEnCours = animal
        switch (this.tourEnCours) {
            case "chevre":
                if (this.enclosChevre.nbrChevreEnJeu < this.RESERVE_CHEVRE){
                    this.enclosChevre.activerCreationChevre();
                } else {
                    this.enclosChevre.activerSelectionChevre();
                }
                
                break;
        
            case "tigre":
                for (let indexTigre = 0; indexTigre < this.listeJeton.length; indexTigre++) {
                    if ( this.listeJeton[indexTigre].name == "tigre"){
                        this.listeJeton[indexTigre].activerSelection();
                    }   
                }
                break;
            default: break;
        }
    }
    verifierConditionsVictoire(){
        if (this.verifierSiTigreSontCoincé() == 4){
            console.log("les chevres ont gagné")
        }
        if (this.scoreChevreCapturer >= 5){
            console.log("les tigres ont gagné")
        }
    }
    verifierSiTigreSontCoincé(){
        let jugeUltime = 0;
        for (let indexTigre = 0; indexTigre < this.listeJeton.length; indexTigre++) {
            if ( this.listeJeton[indexTigre].name == "tigre"){
                jugeUltime += this.listeJeton[indexTigre].selectionerJeton()
                this.listeJeton[indexTigre].finirSelection();
            }   
        }
        return jugeUltime
    }

    initialiserScore(){
        this.scoreChevreCapturer = 0
        this.refScoreChevreCapturer = document.getElementById("indiquateur_tigres_scores") 
        this.refScoreChevreCapturer.textContent= this.scoreChevreCapturer;
        this.scoreTigreImobile = 0
        this.refScoreTigreImobil = document.getElementById("indiquateur_tigres_imobilise")
        this.refScoreTigreImobil.textContent= this.scoreTigreImobile;
        
        this.refReservesChevre = document.getElementById("indiquateur_chevres_reserves")
        this.refReservesChevre.textContent= this.RESERVE_CHEVRE;
    }
    incrementerScoreTigre(){
        this.scoreChevreCapturer++
        this.refScoreChevreCapturer.textContent = this.scoreChevreCapturer
    }
    
    decrementerReserveChevre(nbrChevreEnJeu){
        this.refReservesChevre.textContent = this.RESERVE_CHEVRE - nbrChevreEnJeu
    }

}


let game = new Game();
//s'assure que le jeu commence avec tour de la chevre et tout de réinitialiser 
game.tourEnCours = "tigre"
game.finirTour()

