import Board_gazon from "./Board_gazon.js";
import Enclos_chevre from "./Enclos_chevre.js"
import Chevre from "./Chevre.js";
import Tigre from "./Tigre.js";


export class Game {
    constructor() {
        this.TAILLE = 500 //en px
        this.LONGUEUR = 5;
        this.RESERVE_CHEVRE = 20//this.LONGUEUR*this.LONGUEUR-this.LONGUEUR
        this.DISTANCE_ENTRE_NODE = this.TAILLE / this.LONGUEUR;

        this.refBoard = document.getElementById("board_gazon");
        //this.refBoard.style.width = toString(this.TAILLE+"px");
        this.refBoard.style.width = this.TAILLE+"px"
        this.refBoard.style.height = this.TAILLE+"px"
        this.refBanniere =document.getElementById("banniere_tour")
        this.refBtnRecommencer =document.getElementById("btnRecommencer")
        this.reinitialiserPartie_lier = this.reinitialiserPartie.bind(this)
        this.refBtnRecommencer.addEventListener("click", this.reinitialiserPartie_lier)


        this.board = new Board_gazon(this.LONGUEUR)
        this.listeGazon = this.board.getListeGazon()
        this.listeJeton = new Array();
        this.enclosChevre = new Enclos_chevre(this.listeGazon, this.listeJeton , this.RESERVE_CHEVRE, this)

        this.commencerPartie()
        
    }
    reinitialiserPartie(){
        this.enclosChevre.enleverTouteLesChevres()
        for(let index =0 ; index<this.listeJeton.length;index++){
            this.listeJeton[index].detruireJeton()
        }
        this.commencerPartie()
    }
    commencerPartie(){
        this.listeGazon = this.board.getListeGazon()
        this.listeJeton = new Array();
        this.creerTigre();
        this.tourEnCours = "tigre";
        this.initialiserScore()
        this.finirTour() //Ceci s'assure de tout déactiver les fonctions avant de commencer.
    }

    creerTigre(){
        for (let indexTigre = 1 ; indexTigre <= 4 ;indexTigre++  ){
            let newDiv = document.createElement("div");
            newDiv.id = "tigre"+indexTigre;
            newDiv.className = "jeton tigre" ;
            let newImg = document.createElement("img");
            newImg.src = "img/Placeholder_tigre.svg"
            newDiv.appendChild(newImg)
            document.getElementById("board_gazon").appendChild(newDiv)
            let x=0;
            let y=0;
            switch (indexTigre) {
                case 1: x = 0; y = 0; break;
                case 2: x = 0; y = this.LONGUEUR-1; break;
                case 3: x = this.LONGUEUR-1; y = 0; break;
                case 4: x = this.LONGUEUR-1; y = this.LONGUEUR-1; break;
            
                default:
                    break;
            }
            this.listeJeton.push(new Tigre(x,y,this.listeGazon, this.listeJeton ,newDiv, this))
        }
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
                case "chèvre": this.debutTour("tigre"); 
                break;
                case "tigre": this.debutTour("chèvre"); 
                break;
            }
        }
    }
    debutTour(animal){
        this.tourEnCours = animal
        switch (this.tourEnCours) {
            case "chèvre":
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
        this.refBanniere.textContent="Tour des "+this.tourEnCours+"s"
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

