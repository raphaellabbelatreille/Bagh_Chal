import Board_gazon from "./Board_gazon.js";
import Enclos_chevre from "./Enclos_chevre.js"
import Chevre from "./Chevre.js";
import Tigre from "./Tigre.js";


export class Game {
    constructor() {
        this.refBoard = document.getElementById("board_gazon");
        this.TAILLE = 900;
        this.LONGUEUR = 5;
        this.RESERVE_CHEVRE = 20//this.LONGUEUR*this.LONGUEUR-this.LONGUEUR
        this.GROSSEUR_DES_ELEMENTS = this.TAILLE / this.LONGUEUR;

        //this.refBoard.style.width = this.TAILLE+"px"
        //this.refBoard.style.height = this.TAILLE+"px"
        this.refBanniereChevre = document.getElementById("tourChevre")
        this.refBanniereTigre = document.getElementById("tourTigre")
        this.refBtnRecommencer =document.getElementById("btnRecommencer")
        this.reinitialiserPartie_lier = this.reinitialiserPartie.bind(this)
        this.refBtnRecommencer.addEventListener("click", this.reinitialiserPartie_lier)


        this.board = new Board_gazon(this.TAILLE, this.LONGUEUR )
        this.listeGazon = this.board.getListeGazon()
        this.listeJeton = new Array();
        this.enclosChevre = new Enclos_chevre(this.RESERVE_CHEVRE, this)

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
        this.finirTour("tigre") //Ceci s'assure de tout déactiver les fonctions avant de commencer.
    }

    creerTigre(){
        //console.log("Création des tigres: ")
        for (let indexTigre = 1 ; indexTigre <= 4 ;indexTigre++  ){
            let x=0;
            let y=0;
            let nameFile ="";
            switch (indexTigre) {
                case 1: 
                    x = 0; y = 0; 
                    nameFile = "Dollar"
                    break;
                case 2: 
                    x = 0; y = this.LONGUEUR-1;
                    nameFile = "Yen";
                    break;
                case 3: 
                    x = this.LONGUEUR-1; y = 0;
                    nameFile = "Euro";
                    break;
                case 4: 
                    x = this.LONGUEUR-1; y = this.LONGUEUR-1; 
                    nameFile = "Bitcoin";
                    break;
            
                default:
                    break;
            }
            let newDiv = document.createElement("div");
            newDiv.id = "tigre"+indexTigre;
            newDiv.className = "jeton tigre" ;
            let newImg = document.createElement("img");
            newImg.src = "img/Tigre/"+nameFile+".svg"
            newDiv.appendChild(newImg)
            document.getElementById("board_gazon").appendChild(newDiv)
            
            this.listeJeton.push(new Tigre(x,y,this.listeGazon, this.listeJeton ,newDiv, this))
            //console.log("Nom du nouveau tigre :"+ nameFile)
        }
    }
    finirTour(name){
        if (this.tourEnCours == name){
            if (!this.verifierConditionsVictoire() ){
                this.enclosChevre.deactiverSelectionChevre();
                this.enclosChevre.deactiverCreationChevre();
                for (let index= 0; index<this.listeJeton.length ; index++){
                    this.listeJeton[index].finirSelection();
                    this.listeJeton[index].deactiverSelection();
                }
                for (let indexGaz = 0; indexGaz< this.listeGazon.length ; indexGaz++){
                    this.listeGazon[indexGaz].deSouligneNode();
                }
                
                switch(this.tourEnCours){
                    case "chèvre": this.debutTour("tigre"); 
                    break;
                    case "tigre": this.debutTour("chèvre"); 
                    break;
                }
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
                        //console.log("un tigre")
                        this.listeJeton[indexTigre].activerSelection();
                    }   else {
                        this.listeJeton[indexTigre].deactiverSelection();
                    }
                }
                break;
            default: break;
        }
        //console.log("Au tour des "+this.tourEnCours)
        this.changerAffichageBanniere();
        //this.refBanniere.textContent="Tour des "+this.tourEnCours+"s"
    }
    changerAffichageBanniere(){
        
        //this.refBanniere.querySelectorAll(".CURRENT").classList.remove("CURRENT");
        this.refBanniereChevre.classList.remove("CURRENT");
        this.refBanniereTigre.classList.remove("CURRENT");
        switch (this.tourEnCours) {
            case "chèvre":
                this.refBanniereChevre.classList.add("CURRENT");
                

                break;
            case "tigre":
                this.refBanniereTigre.classList.add("CURRENT");


                

                break;
            default:
                break;
        }
    

    }
    verifierConditionsVictoire(){
        let blnJugeVictoire = true;
        if (this.tourEnCours == "chèvre"){
            if (this.verifierSiTigreSontCoincé() >= 4){
                console.log("les chevres ont gagné")
            }
        }
        if (this.tourEnCours == "tigre"){
            if (this.scoreChevreCapturer >= 5){
                console.log("les tigres ont gagné")
            }
        }
    }
    verifierSiTigreSontCoincé(){
        //console.log("verification si les tigres sont coincé :")
        let compteurDeTigreCoincé = 0;
        for (let indexTigre = 0; indexTigre < this.listeJeton.length; indexTigre++) {
            if ( this.listeJeton[indexTigre].name == "tigre"){
                compteurDeTigreCoincé += this.listeJeton[indexTigre].selectionerJeton();
                this.listeJeton[indexTigre].finirSelection();
                this.listeJeton[indexTigre].deactiverSelection();
            }   
        }
        document.getElementById("indiquateur_tigres_imobilise").innerText = compteurDeTigreCoincé;
        //console.log("verification des tigres Terminer")
        return compteurDeTigreCoincé
    }
    //Quand un jeton est selectioner (et selectionnable), déactive la selection des autres.
    selectionerJetonGlobal(name) {
        //console.log("selectionGlobal des "+name)
        for (let index= 0; index<this.listeJeton.length ; index++){
            if (this.listeJeton[index].name == name){
                //console.log("un "+name)
                this.listeJeton[index].finirSelection();
            } else {
                //console.log("pas un "+name)

                this.listeJeton[index].deactiverSelection();
            }
            
        }
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
    /*chancePiece(nombreDePieceLance){
        let resultat = 0;
        for (let index=0; index < nombreDePieceLance ; index++){
            resultat += Math.round(Math.random()*1)
        }
        return resultat
    }*/
}



let game = new Game();
//s'assure que le jeu commence avec tour de la chevre et tout de réinitialiser 

