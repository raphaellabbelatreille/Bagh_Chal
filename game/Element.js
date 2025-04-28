export class Element {
    constructor(htmlElement) {
        this.element = htmlElement;
        /*if (htmlElement != null){
            let newDiv = document.createElement("div");
            newDiv.id = this.id;
            newDiv.className = this.type+" "+this.id ;
            let newImg = document.createElement("img");
            newImg.src = "img/Placeholder_chevre.svg"
            newDiv.appendChild(newImg)
            document.getElementById("board_gazon").appendChild(newDiv)
            this.element = newDiv
        } else {
            this.element = htmlElement;
        }*/
        
        
    }
    detruireElement() {
        this.element.remove();
        //this = null;
    }
}