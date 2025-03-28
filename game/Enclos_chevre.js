import Chevre from "./Chevre.js";

export default class Enclos_chevre {
    constructor(listeGazon , listeJeton, reserve_chevre,  gameWorld){
        
        this.listeGazon = listeGazon
        this.listeJeton = listeJeton
        this.RESERVE_CHEVRE = reserve_chevre
        this.gameWorld = gameWorld;
        this.nbrChevreEnJeu = 0;
        this.enleverTouteLesChevres_lier = this.enleverTouteLesChevres();
        this.creationFunctionBind = new Array;
    }


    activerCreationChevre(){
        for (let index = 0; index < this.listeGazon.length; index++) {
                this.creationFunctionBind.push(this.creerChevre.bind(this,this.listeGazon[index]))
                this.listeGazon[index].element.addEventListener("click", this.creationFunctionBind[index] ) 
            
        }
    }
    deactiverCreationChevre(){
        for (let index = 0; index < this.listeGazon.length; index++) {
            this.listeGazon[index].element.removeEventListener("click", this.creationFunctionBind[index] ) 
        }
        this.creationFunctionBind =  []
    }
    creerChevre(targetNode){
        console.log(targetNode)
        if(targetNode.occupe == false && this.nbrChevreEnJeu < this.RESERVE_CHEVRE){
            let newDiv = document.createElement("div");
            newDiv.id = "chevre"+(this.nbrChevreEnJeu+1);
            newDiv.className = "jeton chevre" ;
            let newImg = document.createElement("img");
            newImg.src = "img/Placeholder_chevre.svg"
            newDiv.appendChild(newImg)
            document.getElementById("board_gazon").appendChild(newDiv)
            this.listeJeton.push(new Chevre(targetNode.x,targetNode.y,this.listeGazon, this.listeJeton , document.getElementById("chevre"+(this.nbrChevreEnJeu+1)), this.gameWorld));
            this.nbrChevreEnJeu++;
            this.gameWorld.decrementerReserveChevre(this.nbrChevreEnJeu)
        } 
        //this.gameWorld.finirTour()
    }

    activerSelectionChevre(){
        for (let index = 0; index < this.listeJeton.length; index++) {
            if (this.listeJeton[index].name == "chevre"){
                this.listeJeton[index].activerSelection()
            }
        }
    }
    deactiverSelectionChevre(){
        for (let index = 0; index < this.listeJeton.length; index++) {
            if (this.listeJeton[index].name == "chevre"){
                this.listeJeton[index].deactiverSelection()
            }
        }
    }


    enleverTouteLesChevres(){
        for(let index=0 ; index< this.listeJeton.length; index++){
            if (this.listeJeton[index].name == "chevre"){
                this.listeJeton[index].detruireJetonSupperieur();
            }   
        }
        this.listeGazon
    }
}