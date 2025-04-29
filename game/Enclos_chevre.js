import Chevre from "./Chevre.js";

export default class Enclos_chevre {
    constructor(reserve_chevre,  gameWorld){
        this.gameWorld = gameWorld;
        this.RESERVE_CHEVRE = reserve_chevre;
        //this.gameWorld.listeGazon = this.gameWorld.listeGazon //listeGazon
        //this.gameWorld.listeJeton = this.gameWorld.listeJeton
        this.nbrChevreEnJeu = 0;
        this.enleverTouteLesChevres_lier = this.enleverTouteLesChevres.bind(this);
        this.creationFunctionBind = new Array;
    }


    activerCreationChevre(){
        for (let index = 0; index < this.gameWorld.listeGazon.length; index++) {
            this.creationFunctionBind.push(this.invoquerChevre.bind(this,this.gameWorld.listeGazon[index]))
            this.gameWorld.listeGazon[index].element.addEventListener("click", this.creationFunctionBind[index] )
            if (this.gameWorld.listeGazon[index].occupe == false){
                this.gameWorld.listeGazon[index].souligneNode(30)
            }   else {
                this.gameWorld.listeGazon[index].deSouligneNode()
            }
        }
    }
    deactiverCreationChevre(){
        for (let index = 0; index < this.gameWorld.listeGazon.length; index++) {
            this.gameWorld.listeGazon[index].element.removeEventListener("click", this.creationFunctionBind[index] ) 
            this.gameWorld.listeGazon[index].deSouligneNode()
        }
        this.creationFunctionBind =  []
    }
    /*creerChevre(){
        for (let index = 0; index < this.RESERVE_CHEVRE; index++) {
            let newDiv = document.createElement("div");
            newDiv.id = "chevre"+(this.nbrChevreEnJeu+1);
            newDiv.className = "jeton chevre" ;
            let newImg = document.createElement("img");
            newImg.src = "img/Placeholder_chevre.svg"
            newDiv.appendChild(newImg)
            document.getElementById("board_gazon").appendChild(newDiv)
        }
    }*/
    invoquerChevre(targetNode){
        if(targetNode.occupe == false && this.nbrChevreEnJeu < this.RESERVE_CHEVRE){
            let newDiv = document.createElement("div");
            newDiv.id = "chevre"+(this.nbrChevreEnJeu+1);
            newDiv.className = "jeton chevre" ;
            let newImg = document.createElement("img");
            newImg.src = "img/Chevre/Chevre_1.svg"
            newDiv.appendChild(newImg)
            document.getElementById("board_gazon").appendChild(newDiv)
            this.gameWorld.listeJeton.push(new Chevre(targetNode.x,targetNode.y,this.gameWorld.listeGazon, this.gameWorld.listeJeton ,newDiv, this.gameWorld));
            this.nbrChevreEnJeu++;
            this.gameWorld.decrementerReserveChevre(this.nbrChevreEnJeu)
            this.gameWorld.finirTour("chevre");
        } 
    }

    activerSelectionChevre(){
        for (let index = 0; index < this.gameWorld.listeJeton.length; index++) {
            if (this.gameWorld.listeJeton[index].name == "chevre"){
                this.gameWorld.listeJeton[index].activerSelection()
            }
        }
    }
    deactiverSelectionChevre(){
        for (let index = 0; index < this.gameWorld.listeJeton.length; index++) {
            if (this.gameWorld.listeJeton[index].name == "chevre"){
                this.gameWorld.listeJeton[index].finirSelection()
                this.gameWorld.listeJeton[index].deactiverSelection()
            }
        }
    }


    enleverTouteLesChevres(){
        for(let index=0 ; index< this.gameWorld.listeJeton.length; index++){
            if (this.gameWorld.listeJeton[index].name == "chevre"){
                this.gameWorld.listeJeton[index].detruireJetonSupperieur();
            }   
        }
        this.nbrChevreEnJeu= 0;
    }
}