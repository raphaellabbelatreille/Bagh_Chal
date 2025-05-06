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
            
            this.listeJeton.push(new Tigre(x,y,this.listeGazon, this.listeJeton ,newDiv, this, nameFile))
        }
    }
    finirTour(name){
        this.enclosChevre.deactiverSelectionChevre();
            this.enclosChevre.deactiverCreationChevre();
            for (let index= 0; index<this.listeJeton.length ; index++){
                this.listeJeton[index].finirSelection();
                this.listeJeton[index].deactiverSelection();
            }
            for (let indexGaz = 0; indexGaz< this.listeGazon.length ; indexGaz++){
                this.listeGazon[indexGaz].deSouligneNode();
            }
        if (this.tourEnCours == name){
            if (!this.verifierConditionsVictoire() ){
                switch(this.tourEnCours){
                    case "chevre": this.debutTour("tigre"); 
                    break;
                    case "tigre": this.debutTour("chevre"); 
                    break;
                }
            }
        }
        
    }
    debutTour(animal){
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
                    }   else {
                        this.listeJeton[indexTigre].deactiverSelection();
                    }
                }
                break;
            default: break;
        }
        this.changerAffichageBanniere();
    }
    changerAffichageBanniere(){
        this.refBanniereChevre.classList.remove("CURRENT");
        this.refBanniereTigre.classList.remove("CURRENT");
        switch (this.tourEnCours) {
            case "chevre":
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
        let blnJugeVictoire = false;
        let strVictorieux = "";
        let strRaison = "";

        if (this.verifierSiTigreSontCoincé() >= 5){
            blnJugeVictoire = true;
            strVictorieux = "chèvres"
            strRaison = "Les tigres sont incapables de bouger!"
        }
        if (this.verifierSiChevreSontCoincé() >= 20){
            blnJugeVictoire = true;
            strVictorieux = "tigres"
            strRaison = "Les chèvres sont imobilisé de peur! Il ne peuvent plus bouger"
        }

        if (this.tourEnCours == "tigre"){
            if (this.scoreChevreCapturer >= 4){
                blnJugeVictoire = true;
                strVictorieux = "tigres"
                strRaison = "5 chèvres ont été mangé. Elles étaient savoureuses"
            } 
        }
        if (blnJugeVictoire == true){
            this.affichageVictoire(strVictorieux, strRaison)
        }
        return blnJugeVictoire
    }
    verifierSiTigreSontCoincé(){
        let compteurDeTigreCoincé = 0;
        for (let indexTigre = 0; indexTigre < this.listeJeton.length; indexTigre++) {
            if ( this.listeJeton[indexTigre].name == "tigre"){
                
                
                if ( this.listeJeton[indexTigre].selectionerJeton() == 1){
                    compteurDeTigreCoincé ++
                    document.getElementById("tigres_imobile_"+compteurDeTigreCoincé).src = "img/Tigre/"+this.listeJeton[indexTigre].surname+".svg"
                } else {
                    
                }
                this.listeJeton[indexTigre].finirSelection();
                this.listeJeton[indexTigre].deactiverSelection();
            }   
        }
        for (let index = 0; index < 4; index++) {
            if (index> compteurDeTigreCoincé){
                document.getElementById("tigres_imobile_"+index).src = "img/Circle.svg"
            }
        }
        document.getElementById("indiquateur_tigres_imobilise").innerText = compteurDeTigreCoincé;
        return compteurDeTigreCoincé
    }
    verifierSiChevreSontCoincé(){
        let compteurDeChevreCoincé = 0;
        for (let indexChevre = 0; indexChevre < this.listeJeton.length; indexChevre++) {
            if ( this.listeJeton[indexChevre].name == "chevre"){
                let blnDead = this.listeJeton[indexChevre].isDead
                let ChevreCoincé = this.listeJeton[indexChevre].selectionerJeton(); //0 ou 1 (coincé)
                this.listeJeton[indexChevre].finirSelection();
                this.listeJeton[indexChevre].deactiverSelection();
                if (blnDead == true || ChevreCoincé == 1){
                    compteurDeChevreCoincé++
                    
                }
            }   
        }
        return compteurDeChevreCoincé
    }
    affichageVictoire(victorieux , raison){
        document.getElementById("banderole_victoire").classList.remove("cache")
        document.getElementById("banderole_titre").innerHTML = "les "+victorieux + " ont gagné!"
        document.getElementById("banderole_texte").innerHTML = raison
    }


    //Quand un jeton est selectioner (et selectionnable), déactive la selection des autres.
    selectionerJetonGlobal(name) {
        for (let index= 0; index<this.listeJeton.length ; index++){
            if (this.listeJeton[index].name == name){
                this.listeJeton[index].finirSelection();
            } else {
                this.listeJeton[index].deactiverSelection();
            }
            
        }
    }

    initialiserScore(){
        this.refReservesChevre = document.getElementById("indiquateur_chevres_reserves")
        this.refReservesChevre.textContent= this.RESERVE_CHEVRE;
        for (let index = 1; index < 20; index++) {
            document.getElementById("chevre_reserve_"+index).src = "img/Chevre/Male.svg"
        }

        this.scoreChevreCapturer = 0
        this.refScoreChevreCapturer = document.getElementById("indiquateur_tigres_scores") 
        this.refScoreChevreCapturer.textContent= this.scoreChevreCapturer;
        for (let index = 1; index <= 5; index++) {
            document.getElementById("tigres_scores_"+index).src = "img/Circle.svg"
        }

        this.scoreTigreImobile = 0
        this.refScoreTigreImobil = document.getElementById("indiquateur_tigres_imobilise")
        this.refScoreTigreImobil.textContent= this.scoreTigreImobile;
        for (let index = 1; index < 5; index++) {
                document.getElementById("tigres_imobile_"+index).src = "img/Circle.svg"
        }
        
        document.getElementById("banderole_victoire").classList.add("cache")
        document.getElementById("banderole_titre").innerHTML = ""
        document.getElementById("banderole_texte").innerHTML = ""
    }
    incrementerScoreTigre(){
        this.scoreChevreCapturer++
        this.refScoreChevreCapturer.textContent = this.scoreChevreCapturer
        document.getElementById("tigres_scores_"+this.scoreChevreCapturer).src = "img/Chevre/Male.svg"
    }
    
    decrementerReserveChevre(nbrChevreEnJeu){
        this.refReservesChevre.textContent = this.RESERVE_CHEVRE - nbrChevreEnJeu;
        document.getElementById("chevre_reserve_"+nbrChevreEnJeu).src = ""
        //document.getElementById("chevre_reserve_"+nbrChevreEnJeu).width = "7px"
        
    }
}



let game = new Game();
//s'assure que le jeu commence avec tour de la chevre et tout de réinitialiser 

