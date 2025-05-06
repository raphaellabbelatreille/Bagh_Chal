import { Element } from "./Element.js";

export default class Jeton extends Element{
    /*public id:number = 0;
    protected x:number = 0;
    protected y:number = 0;*/
    constructor(x, y, BoardTile, listJeton, htmlElement,  gameWorld) {
        super(htmlElement);
        this.type = "jeton"
        this.BoardTile = BoardTile 
        this.listeJeton = listJeton
        this.gameWorld = gameWorld
        this.possibleMove = new Array;
        this.MoveBinder = new Array;
        
        
        /*this.debutHover_lier = this.debutHover.bind(this)
        this.hover_lier = this.hover.bind(this)
        this.element.addEventListener("mouseover", this.debutHover_lier)*/
        this.selectionerJeton_lier = this.selectionerJeton.bind(this)
        this.mouvementNormalVers_lier = this.mouvementNormalVers.bind(this)
        this.finirSelection_lier = this.finirSelection.bind(this)
        this.element.addEventListener("click", this.selectionerJeton_lier)
        this.slideADestination_lier = this.slideADestination.bind(this)
        this.timerSlide = null

        this.creerjeton(x,y)

    }
    creerjeton(x, y){
        this.jetonX = x
        this.jetonY = y
        for(let index=0 ; index< this.BoardTile.length ; index++){
            if (this.BoardTile[index].x == this.jetonX && this.BoardTile[index].y == this.jetonY){
                this.currentNode = this.BoardTile[index]
                this.currentNode.jetonOnTop = this;
                this.currentNode.occupe = true;
                this.jetonX = this.currentNode.x 
                this.jetonY = this.currentNode.y 
                this.element.style.top = this.jetonY*(this.gameWorld.TAILLE/this.gameWorld.LONGUEUR /this.gameWorld.TAILLE*100)+"%"//this.variationAleatoire()+this.jetonY*(this.gameWorld.GROSSEUR_DES_ELEMENTS)+"px"
                this.element.style.left = this.jetonX*(this.gameWorld.TAILLE/this.gameWorld.LONGUEUR /this.gameWorld.TAILLE*100)+"%"
            }
        }
        this.element.style.width=(100/this.gameWorld.LONGUEUR)+"%";
        this.element.style.height=(100/this.gameWorld.LONGUEUR)+"%";
    }

    /*debutHover(){
        window.clearInterval(this.refMinuterieHover);
        this.timerSlide= 10
        this.refMinuterieHover = window.setInterval(this.hover_lier,10);
    }
    hover(){
        this.timerSlide= this.timerSlide- 1
        if(this.timerSlide<= 0){
            window.clearInterval(this.refMinuterieHover);
        }
    }*/


    activerSelection(){
        this.element.addEventListener("click", this.selectionerJeton_lier)
        this.currentNode.souligneNode(50);
        /*clearInterval(this.timer)
        this.timerSlide= null*/

    }
    deactiverSelection(){
        this.finirSelection()
        this.element.removeEventListener("click", this.selectionerJeton_lier);
        this.currentNode.deSouligneNode();
    }
    selectionerJeton(){
        let estCeQueJetonCoince = 0;
        //Appeler finir Selction des autres tigres ou chevres;
        this.gameWorld.selectionerJetonGlobal(this.name);
        if (this.actif == true){
            this.finirSelection()
        } else {
            this.currentNode.element.addEventListener("click", this.finirSelection_lier)
            this.currentNode.souligneNode(70);
            this.element.classList.add("bordered")
            this.actif = true;
            for(let index=0 ; index< this.BoardTile.length ; index++){
                let tile = this.BoardTile[index]
                if (this.currentNode.even == true){
                        if (tile.x >= (this.currentNode.x-1) && tile.x <= (this.currentNode.x+1) && tile.y >= (this.currentNode.y-1) && tile.y <= (this.currentNode.y+1)){
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
                estCeQueJetonCoince = 1
            } else {
                for (let index = 0 ; index< this.possibleMove.length ; index++){
                    this.possibleMove[index].element.addEventListener("click", this.MoveBinder[index])
                    this.possibleMove[index].souligneNode(50)
                }
                
            }
            return estCeQueJetonCoince
        }
    creerListeDeMove(){
        for (let index = 0 ; index< this.possibleMove.length ; index++){
            this.possibleMove[index].element.addEventListener("click", this.MoveBinder[index])
        }
    }

    mouvementNormalVers(e){
        this.jetonX = this.currentNode.x
        this.jetonY = this.currentNode.y
        this.currentNode.quandJetonSort();
        this.currentNode.element.removeEventListener("click", this.finirSelection_lier)
        this.currentNode = e

        this.currentNode.jetonOnTop = this;

        this.currentNode.occupe = true;
        //clearInterval(this.timer)

        this.timerSlide= window.setInterval(() => this.slideADestination(), 30)
        this.gameWorld.finirTour("");
        

    }
    slideADestination(){
        let destinationX = this.currentNode.x
        let destinationY = this.currentNode.y
        let valeurBuffer = 0.05;
        if ( (destinationX-valeurBuffer) < this.jetonX && (destinationX+valeurBuffer) > this.jetonX 
                && (destinationY-valeurBuffer) < this.jetonY&& (destinationY+valeurBuffer) > this.jetonY){
            //stop
            window.clearInterval(this.timerSlide)
            
            this.timerSlide = null
            this.gameWorld.finirTour(this.name);
        } else {
            let valeurX = (destinationX -this.jetonX)/10;
            let valeurY = (destinationY -this.jetonY)/10;
            if ( destinationX !=this.jetonX  ){
                this.jetonX= this.jetonX+ valeurX
            } 
            if ( destinationY != this.jetonY  ){
                this.jetonY= this.jetonY+ valeurY
            } 

        }
        this.element.style.top = this.jetonY*(this.gameWorld.TAILLE/this.gameWorld.LONGUEUR /this.gameWorld.TAILLE*100)+"%"//this.variationAleatoire()+this.jetonY*(this.gameWorld.GROSSEUR_DES_ELEMENTS)+"px"
        this.element.style.left = this.jetonX*(this.gameWorld.TAILLE/this.gameWorld.LONGUEUR /this.gameWorld.TAILLE*100)+"%"
    }

    finirSelection(){
        this.currentNode.element.removeEventListener("click", this.finirSelection_lier)
        for(let index=0 ; index < this.possibleMove.length ; index++){
            this.possibleMove[index].element.removeEventListener("click", this.MoveBinder[index])
            this.possibleMove[index].deSouligneNode();
        }
        this.actif = false;
        this.possibleMove = []
        this.MoveBinder = []
        this.currentNode.souligneNode(50);
        //clearInterval(this.timer)
        this.element.classList.remove("bordered")
    }
    variationAleatoire(){
        //let randomDirection = Math.round(Math.random()*3-1) 
        let randomNumber = this.gameWorld.chancePiece(10)
        return (randomNumber - 5)
    }

    detruireJeton(){
        this.currentNode.occupe = false
        this.element.removeEventListener("click", this.selectionerJeton_lier)
        clearInterval(this.timer)

        this.detruireElement()
    }
}