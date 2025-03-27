export class Element {
    constructor(htmlElement) {
        /*if (document.contains(htmlElement)){
        } else {
            let html = document.createElement("div")
            html.id = suposedId;
            let img = document.createElement("img");
            img.src= "img/Placeholder_"+suposedName+".svg"
            html.appendChild(img)
            console.log(document.getElementById(suposedPlace))
            console.log(suposedPlace)
            document.getElementById(suposedPlace).appendChild(html)
            this.element = htmlElement

        }*/
        this.element = htmlElement;
        
    }
    detruireElement() {
        this.element.remove();
        console.log(this.element+" is to be destroyed")
    }
}