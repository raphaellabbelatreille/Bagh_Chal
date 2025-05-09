import Node_gazon from "./Node_gazon.js";



export default class Board_gazon {
    constructor(taille, longueur) {
        this.board = document.getElementById("board_gazon")
        this.TAILLE = taille;
        this.LONGUEUR = longueur;
        this.listeGazon = new Array;
        this.creerGazon();
        
    }
    creerGazon(){ 
        for (let y = 0; y < this.LONGUEUR;y++) {
            let newRow = document.createElement("div");
            newRow.classList =" row";
            newRow.id = "row"+y; 
            for (let x = 0; x < this.LONGUEUR ;x++) {
                let newTile = document.createElement("div");
                let node = document.getElementById("Odd").cloneNode(true);//document.createElement("img");
                let pairity = "";
                node.id = x+y*this.LONGUEUR;
                if ( (node.id % 2) == 0) {
                    pairity = "Odd"
                } else {
                    pairity = "Even"
                }

                if (y == 0){
                    if (x == 0){
                        node = document.getElementById("Corner").cloneNode(true)
                    } else if (x == this.LONGUEUR-1){
                        node = document.getElementById("Corner").cloneNode(true)
                        node.style= "transform: rotate(90deg);"
                    } else {
                        node = document.getElementById("Border_"+pairity).cloneNode(true)
                        //node.style= "transform: rotate(90deg);"
                    }
                } else if(y == (this.LONGUEUR-1)) {
                    
                    if (x == 0){
                        node = document.getElementById("Corner").cloneNode(true)
                        node.style= "transform: rotate(270deg);"
                    } else if (x == this.LONGUEUR-1){
                        node = document.getElementById("Corner").cloneNode(true)
                        node.style= "transform: rotate(180deg);"
                    } else {
                        node = document.getElementById("Border_"+pairity).cloneNode(true)
                        node.style= "transform: rotate(180deg);"
                    }
                } else {
                    if (x == 0){
                        node = document.getElementById("Border_"+pairity).cloneNode(true)
                        node.style= "transform: rotate(270deg);"

                    } else if (x == this.LONGUEUR-1){
                        node = document.getElementById("Border_"+pairity).cloneNode(true)
                        node.style= "transform: rotate(90deg);"
                    } else {
                        node = document.getElementById(pairity).cloneNode(true)

                    }
                    
                }
                newTile.appendChild(node)
                newTile.classList = "node "+pairity
                newTile.id = "row"+y+"col"+x; 
                newTile.height = this.TAILLE / this.LONGUEUR
                newTile.width = this.TAILLE / this.LONGUEUR
                newRow.appendChild(newTile)
                this.listeGazon.push( new Node_gazon(x , y, newTile));
            }
        this.board.appendChild(newRow)
        }
    }

    getListeGazon(){
        return this.listeGazon;
    }
    changeColorOfBoard(animal){
        this.board.classList.remove("chevre");
        this.board.classList.remove("tigre");
        switch(animal){
            case "chevre": this.board.classList.add("chevre"); break;
            case "tigre": this.board.classList.add("tigre"); break;
            default: /* Nothing */ ; break;
        }
    }
    detruire(){
        for(let index = 0; index< this.listeGazon.length ; index++){
            this.listeGazon[index].this.detruireGazon();
        }
    }
}