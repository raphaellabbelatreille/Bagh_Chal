export class Element {
    constructor(htmlElement) {
        /*if (document.contains(htmlElement)){
        } else {
            let html = document.createElement("div")
            html.id = suposedId;
            let img = document.createElement("img");
            img.src= "img/Placeholder_"+suposedName+".svg"
            html.appendChild(img)
            document.getElementById(suposedPlace).appendChild(html)
            this.element = htmlElement

        }*/
        this.element = htmlElement;
        
    }
    detruireElement() {
        console.log(this.element+" is to be destroyed")
        this.element.remove();
        
    }
}