
export class Theme {
    constructor() {
        this.refRoot = document.querySelector(":root")
        this.listOfVariable = ["--couleurFondDEcran", "--couleurFondBoard","--couleurNode","--couleurFond","--couleurFondBulle", "--couleurTexte", "--couleurCursor"]
        this.listOfDefaultColor = ["rgb(255, 255, 255)","rgb(0,155, 0)","rgb(180, 180, 180)","rgb(155, 155, 255)","rgb(155, 155, 255)", "rgb(0, 0, 0)","#FEE180"]
        this.listOfThemeAvailable = ["default", "grass", "midnight", "syrup"]
        this.prepareTheBtnToSwitchTheme();
        if (isset(localStorage.getItem("ThemeSelectionner"))){
            this.takeNewRequest(localStorage.getItem("ThemeSelectionner"))
        } else {
            this.takeNewRequest("default");
        }
    }
    prepareTheBtnToSwitchTheme(){
        for (let indexTheme = 0; indexTheme < this.listOfThemeAvailable.length; indexTheme++) {
            let themeName = this.listOfThemeAvailable[indexTheme];
            /*this["refBtn"+themeName]*/
            document.getElementById(themeName).addEventListener("click", this.takeNewRequest.bind(this, themeName))
        }
    }
    takeNewRequest(request){
        switch(request){
            case "midnight":
                this.applyValue(["rgb(0, 10, 46)","rgb(0, 30, 100)","rgb(180, 180, 180)","rgb(20, 10, 70)","#616161", "white","#FEE180"])
                break;
            case "grass":
                this.applyValue(["rgb(0, 77, 46)","#352E29","rgb(180, 180, 180)","rgb(0, 96, 57)","#616161", "white","__"]);
                break;
            case "syrup":
                this.applyValue(["__","#352E29","rgb(226, 226, 226)","rgb(255, 0, 0)","#616161", "__","__"]);
                break;
            default: case "default":
                this.applyValue(this.listOfDefaultColor)
                break;
        }  
        localStorage.setItem("ThemeSelectionner",request)
        console.log(request)
        
    }
    applyValue(listOfValue){
        for (let indexVar = 0; indexVar < this.listOfVariable.length; indexVar++) {
            let curentVariable = this.listOfVariable[indexVar];
            let newColor = listOfValue[indexVar]
            if (newColor == "__"){
                newColor = this.listOfDefaultColor[indexVar]
            }
            this.setVariable(curentVariable , newColor)
            
        }
    }
    setVariable(thing , newColor){
        this.refRoot.style.setProperty(thing, newColor );
    }
}

new Theme();