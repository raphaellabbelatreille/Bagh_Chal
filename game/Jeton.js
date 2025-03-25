import { Element } from "./Element.js";
import { Tile_gazon } from "./Tile_gazon.js";

export default class Jeton extends Element{
    /*public id:number = 0;
    protected x:number = 0;
    protected y:number = 0;*/
    constructor(x, y, BoardTile, htmlElement, gameWorld) {
        super(htmlElement);
        this.BoardTile = BoardTile 
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
        /*this.element.addEventListener("click", this.selectionerJeton_lier)*/

    }
    creerjeton(x, y){
        this.jetonX = x
            this.jetonY = y
        for(let index=0 ; index< this.BoardTile.length ; index++){
            if (this.BoardTile[index].x == this.jetonX && this.BoardTile[index].y == this.jetonY){
                this.currentNode = this.BoardTile[index]
            }
        }
        this.element.style.top = this.jetonY *100+"px"
        this.element.style.left = this.jetonX*100+"px"
        console.log(this.currentNode)
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

    selectionerJeton(){
        if (this.actif == true){
            this.finirSelection()
        } else {
            this.currentNode.element.addEventListener("click", this.finirSelection_lier)
            this.actif = true;
            for(let index=0 ; index< this.BoardTile.length ; index++){
                let tile = this.BoardTile[index]
                if (! tile.occupe){
                    if (tile.x == this.currentNode.x && tile.y == this.currentNode.y){ } else 
                        if (this.currentNode.even){
                            if (tile.x >= (this.currentNode.x-1) && tile.x <= (this.currentNode.x+1) && tile.y >= (this.currentNode.y-1) && tile.y <= (this.currentNode.y+1) ){
                                    this.possibleMove.push(tile)
                                    this.MoveBinder.push(this.mouvementNormalVers.bind(this, tile))
                            }
                        } else {
                            if ((tile.x >= (this.jetonX-1) && tile.x <= (this.jetonX+1) && tile.y == this.currentNode.y ) || (tile.x == this.jetonX && tile.y >= (this.jetonY-1) && tile.y <= (this.jetonY+1)) ){
                                    this.possibleMove.push(tile)
                                    this.MoveBinder.push(this.mouvementNormalVers.bind(this, tile))
                            }
                    }
                }
                
                
            }
        }
        for (let index = 0 ; index< this.possibleMove.length ; index++){
            this.possibleMove[index].element.addEventListener("click", this.MoveBinder[index])
        }
    }

    mouvementNormalVers(e){
        this.currentNode.quandJetonSort();
        this.currentNode.element.removeEventListener("click", this.finirSelection_lier)
        this.currentNode = e
        this.jetonX = e.x 
        this.jetonY = e.y 
        this.element.style.top = this.jetonY*100+"px"
        this.element.style.left = this.jetonX*100+"px"
        this.gameWorld.finirTour();

    }

    finirSelection(){
        console.log("finirselection")
        console.log(this.possibleMove)
        this.currentNode.element.removeEventListener("click", this.finirSelection_lier)
        for(let index=0 ; index < this.possibleMove.length ; index++){
            this.possibleMove[index].element.removeEventListener("click", this.MoveBinder[index])
        }
        this.actif = false
        this.possibleMove = []
        this.MoveBinder = []
        console.log(this.possibleMove)
    }


    detruireJeton(){
        this.detruireElement()
    }
}