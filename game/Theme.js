
export class Theme {
    constructor() {
        this.refRoot = document.querySelector(":root")
        this.listOfVariable = ["--couleurFondDEcran", "--couleurFondBoard","--couleurNode","--couleurFond","--couleurFondBulle", "--couleurTexte", "--couleurCursor", "--couleurProie", "--couleurPredateur"]
        this.listOfThemeAvailable = ["default", "grass", "midnight", "syrup"]
        this.prepareTheBtnToSwitchTheme();
        if (localStorage.getItem("ThemeSelectionner") != ""){
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
    //"rgb(105, 35, 80)"
    takeNewRequest(request){
        this.listOfDefaultColor = ["rgb(200, 200, 250)","rgb(105, 35, 80)","rgb(180, 180, 180)","rgb(180,180,180) ","rgb(180, 120, 170)", "rgb(0, 0, 0)","rgb(255,225,130)","rgb(100,150,255)",  "rgb(255,225,130)"]
        switch(request){
            default: case "default":
                request = "default"
                this.applyValue(this.listOfDefaultColor)
                break;
            case "midnight":
                this.applyValue(["rgb(0, 10, 46)","rgb(0, 30, 100)","rgb(180, 180, 180)","rgb(20, 10, 70)","#616161", "rgb(255, 255, 255)","rgb(255,225,130)", "__", "__"])
                break;
            case "grass":
                this.applyValue(["rgb(0, 77, 46)","rgb(55,45,40)","rgb(180, 180, 180)","rgb(0, 96, 57)","#616161", "rgb(255, 255, 255)","rgb(255,225,130)", "__", "__"]);
                break;
            case "syrup":
                this.applyValue(["rgb(0,0,0)","rgb(55,45,40)","rgb(226, 226, 226)","rgb(255, 0, 0)","#616161", "rgb(255, 255, 255)","rgb(255,225,130)", "__", "__"]);
                break;
            
        }  
        localStorage.setItem("ThemeSelectionner",request)
        
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