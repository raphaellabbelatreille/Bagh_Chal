import { Tile_gazon } from "./Tile_gazon.js";


export default class Board_gazon {
    constructor(taille) {
        this.board = document.getElementById("board_gazon")
        this.taille = taille;
        this.listeGazon = new Array;
        this.creerGazon();
        
    }
    creerGazon(){
        
        for (let y = 0; y < this.taille;y++) {
            let newRow = document.createElement("div");
            newRow.classList =" row";
            newRow.id = "row"+y;
            for (let x = 0; x < this.taille ;x++) {
                console.log("hello?")
                let newTile = document.createElement("div");
                let node = document.createElement("img");
                let pairity = "";
                node.id = x+y*5;
                if ( (node.id % 2) == 0) {
                    pairity = "Odd"
                } else {
                    pairity = "Even"
                }

                if (y == 0){
                    if (x == 0){
                        node.src = "img/Node/Corner.svg"
                    } else if (x == 4){
                        node.src = "img/Node/Corner.svg"
                        node.style= "transform: rotate(90deg);"
                    } else {
                        node.src = "img/Node/Border_"+pairity+".svg"
                        node.style= "transform: rotate(90deg);"
                    }
                } else if(y == 4) {
                    
                    if (x == 0){
                        node.src = "img/Node/Corner.svg"
                        node.style= "transform: rotate(270deg);"
                    } else if (x == 4){
                        node.src = "img/Node/Corner.svg"
                        node.style= "transform: rotate(180deg);"
                    } else {
                        node.src = "img/Node/Border_"+pairity+".svg"
                        node.style= "transform: rotate(270deg);"
                    }
                } else {
                    if (x == 0){
                        node.src = "img/Node/Border_"+pairity+".svg"
                    } else if (x == 4){
                        node.src = "img/Node/Border_"+pairity+".svg"
                        node.style= "transform: rotate(180deg);"
                    } else {
                        node.src = "img/Node/"+pairity+".svg"
                    }
                    
                }
                node.height = 68
                node.width = 68
                newTile.appendChild(node)
                newTile.classList = pairity
                newTile.id = "row"+y+"col"+x; 
                newRow.appendChild(newTile)
                
                this.listeGazon.push( new Tile_gazon(x , y, newTile));
            }
        this.board.appendChild(newRow)
        }
        console.log(this.listeGazon)
    }

    getListeGazon(){
        return this.listeGazon;
    }
}