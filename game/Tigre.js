import Jeton from "./Jeton.js";


export default class Tigre extends Jeton {
    constructor(x, y, BoardTile, listeTigre ,htmlElement, gameWorld) {
        super(x,y,BoardTile, htmlElement, gameWorld);
        this.selectionerTigre_lier = this.selectionerTigre.bind(this)
        this.element.addEventListener("click", this.selectionerTigre_lier)
    }
    selectionerTigre() {
        this.selectionerJeton();
        console.log("rar")

    }
}