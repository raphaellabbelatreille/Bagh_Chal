import { Element } from "./Element.js";
import { Tile_gazon } from "./Tile_gazon.js";

export default class Jeton extends Element{
    /*public id:number = 0;
    protected x:number = 0;
    protected y:number = 0;*/
    constructor(x, y, BoardTile, listJeton, htmlElement,  gameWorld) {
        super(htmlElement);
        this.BoardTile = BoardTile 
        this.listeJeton = listJeton
        this.gameWorld = gameWorld
        this.possibleMove = new Array;
        this.MoveBinder = new Array;
        this.creerjeton(x,y)
        
        
        this.debutHover_lier = this.debutHover.bind(this)
        this.hover_lier = this.hover.bind(this)
        this.element.addEventListener("mouseover", this.debutHover_lier)
        this.selectionerJeton_lier = this.selectionerJeton.bind(this)
        this.mouvementNormalVers_lier = this.mouvementNormalVers.bind(this)
        this.finirSelection_lier = this.finirSelection.bind(this)
        this.element.addEventListener("click", this.selectionerJeton_lier)

    }
    creerjeton(x, y){
        this.jetonX = x
        this.jetonY = y
        for(let index=0 ; index< this.BoardTile.length ; index++){
            if (this.BoardTile[index].x == this.jetonX && this.BoardTile[index].y == this.jetonY){
                this.currentNode = this.BoardTile[index]
            }
        }
        this.mouvementNormalVers(this.currentNode)
    }

    debutHover(){
        window.clearInterval(this.refMinuterieHover);
        this.timer = 10
        this.refMinuterieHover = window.setInterval(this.hover_lier,10);
    }
    hover(){
        this.timer = this.timer - 1

        if(this.timer <= 0){
            window.clearInterval(this.refMinuterieHover);
        }
    }


    activerSelection(){
        this.element.addEventListener("click", this.selectionerJeton_lier)
    }
    deactiverSelection(){
        this.element.removeEventListener("click", this.selectionerJeton_lier)
    }
    selectionerJeton(){
        let juge = 0
        if (this.actif == true){
            this.finirSelection()
        } else {
            this.currentNode.element.addEventListener("click", this.finirSelection_lier)
            this.actif = true;
            for(let index=0 ; index< this.BoardTile.length ; index++){
                let tile = this.BoardTile[index]
                if (this.currentNode.even){
                        if (tile.x >= (this.currentNode.x-1) && tile.x <= (this.currentNode.x+1) && tile.y >= (this.currentNode.y-1) && tile.y <= (this.currentNode.y+1) ){
                            if (tile.occupe){ 
                                this.selectionnerJetonSuperieur(tile);
                            } else {
                                this.possibleMove.push(tile)
                                this.MoveBinder.push(this.mouvementNormalVers.bind(this, tile))
                            }
                                
                        }
                    } else {
                        if ((tile.x >= (this.jetonX-1) && tile.x <= (this.jetonX+1) && tile.y == this.currentNode.y ) || (tile.x == this.jetonX && tile.y >= (this.jetonY-1) && tile.y <= (this.jetonY+1)) ){
                            if (tile.occupe){ 
                                this.selectionnerJetonSuperieur(tile);
                            } else {
                                this.possibleMove.push(tile)
                                this.MoveBinder.push(this.mouvementNormalVers.bind(this, tile))
                            }
                        }
                    }
                }    
            }
            if (this.possibleMove.length == 0){
                console.log("ce jeton")
                console.log(this.element);
                console.log("est coincé")
                juge =1
            } else {
                for (let index = 0 ; index< this.possibleMove.length ; index++){
                    this.possibleMove[index].element.addEventListener("click", this.MoveBinder[index])
                    this.possibleMove[index].souligneNode()
                }
            
            }
            return juge
        }
    creerListeDeMove(){
        for (let index = 0 ; index< this.possibleMove.length ; index++){
            this.possibleMove[index].element.addEventListener("click", this.MoveBinder[index])
        }
    }

    mouvementNormalVers(e){
        this.currentNode.quandJetonSort();
        this.currentNode.element.removeEventListener("click", this.finirSelection_lier)
        this.currentNode = e
        this.currentNode.jetonOnTop = this;

        this.currentNode.occupe = true;
        this.jetonX = e.x 
        this.jetonY = e.y 
        this.element.style.top = this.jetonY*(this.gameWorld.DISTANCE_ENTRE_NODE)+"px"
        this.element.style.left = this.jetonX*(this.gameWorld.DISTANCE_ENTRE_NODE)+"px"
        this.gameWorld.finirTour();

    }

    finirSelection(){
        this.currentNode.element.removeEventListener("click", this.finirSelection_lier)
        for(let index=0 ; index < this.possibleMove.length ; index++){
            this.possibleMove[index].element.removeEventListener("click", this.MoveBinder[index])
            this.possibleMove[index].deSouligneNode();
        }
        this.actif = false
        this.possibleMove = []
        this.MoveBinder = []
    }


    detruireJeton(){
        this.currentNode.occupe = false
        this.element.removeEventListener("click", this.selectionerJeton_lier)

        this.detruireElement()
    }
}