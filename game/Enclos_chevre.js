import Chevre from "./Chevre.js";

export default class Enclos_chevre {
    constructor(listeGazon , listeJeton, reserve_chevre,  gameWorld){
        
        this.listeGazon = listeGazon
        this.listeJeton = listeJeton
        this.RESERVE_CHEVRE = reserve_chevre
        this.gameWorld = gameWorld;
        this.nbrChevreEnJeu = 0;
        this.enleverTouteLesChevres_lier = this.enleverTouteLesChevres();
    }
    
    creerChevre(coordX, coordY){
        let newDiv = document.createElement("div");
        newDiv.id = "chevre"+(this.nbrChevreEnJeu+1);
        newDiv.className = "jeton chevre" ;
            let newImg = document.createElement("img");
            newImg.src = "img/Placeholder_chevre.svg"
        newDiv.appendChild(newImg)
        document.getElementById("board_gazon").appendChild(newDiv)
        let newChevre = new Chevre(coordX,coordY,this.listeGazon, this.listeJeton , document.getElementById("chevre"+(this.nbrChevreEnJeu+1)), this.gameWorld)
        this.listeJeton.push(newChevre);
        /*this["chevre"+(this.nbrChevreEnJeu+1)]*/
        this.nbrChevreEnJeu++;
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