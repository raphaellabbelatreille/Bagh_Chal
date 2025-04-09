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
                let node = document.createElement("img");
                let pairity = "";
                node.id = x+y*this.LONGUEUR;
                if ( (node.id % 2) == 0) {
                    pairity = "Odd"
                } else {
                    pairity = "Even"
                }

                if (y == 0){
                    if (x == 0){
                        node.src = "img/Node/Corner.svg"
                    } else if (x == this.LONGUEUR-1){
                        node.src = "img/Node/Corner.svg"
                        node.style= "transform: rotate(90deg);"
                    } else {
                        node.src = "img/Node/Border_"+pairity+".svg"
                        //node.style= "transform: rotate(90deg);"
                    }
                } else if(y == (this.LONGUEUR-1)) {
                    
                    if (x == 0){
                        node.src = "img/Node/Corner.svg"
                        node.style= "transform: rotate(270deg);"
                    } else if (x == this.LONGUEUR-1){
                        node.src = "img/Node/Corner.svg"
                        node.style= "transform: rotate(180deg);"
                    } else {
                        node.src = "img/Node/Border_"+pairity+".svg"
                        node.style= "transform: rotate(180deg);"
                    }
                } else {
                    if (x == 0){
                        node.src = "img/Node/Border_"+pairity+".svg"
                        node.style= "transform: rotate(270deg);"

                    } else if (x == this.LONGUEUR-1){
                        node.src = "img/Node/Border_"+pairity+".svg"
                        node.style= "transform: rotate(90deg);"
                    } else {
                        node.src = "img/Node/"+pairity+".svg"
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
    detruire(){
        for(let index = 0; index< this.listeGazon.length ; index++){
            this.listeGazon[index].this.detruireGazon();
        }
    }
}