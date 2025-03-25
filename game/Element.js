export class Element {
    constructor(htmlElement ) {
        this.element = htmlElement;
    }
    detruireElement() {
        console.log(this.element+" is to be destroyed")
    }
}