export class Element {
    constructor(htmlElement) {
        /*if (!document.contains(this.htmlElement)){
            let newDiv = document.createElement("div");
            newDiv.id = this.id;
            newDiv.className = this.type+" "+this.id ;
            let newImg = document.createElement("img");
            newImg.src = "img/Placeholder_chevre.svg"
            newDiv.appendChild(newImg)
            document.getElementById("board_gazon").appendChild(newDiv)

        }*/
        this.element = htmlElement;
        
    }
    detruireElement() {
        console.log(this.element+" is to be destroyed")
        this.element.remove();
    }
}