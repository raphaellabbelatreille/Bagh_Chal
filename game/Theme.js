
export class Theme {
    constructor() {
        this.refRoot = document.querySelector(":root")
        this.listOfVariable = ["--couleurFondDEcran", "--couleurFondBoard","--couleurNode","--couleurFond","--couleurFondBulle", "--couleurTexte","--couleurBorder", "--couleurCursor", "--couleurProie", "--couleurPredateur"]
        this.listOfThemeAvailable = ["Default", "Grass", "Midnight", "Syrup", "Neon"]

        this.listOfDefaultColor = ["rgb(200, 205, 200)","rgb(65, 10, 65)","rgb(255, 255, 255)","rgb(155, 155, 155) ","rgb(180,180,180)", "rgb(0, 0, 0)","rgba(255, 255, 255, .8)","rgb(255,225,130)","rgb(100,150,255)",  "rgb(255,225,130)"]
        this.listOfGrassColor = ["rgb(0, 77, 46)","rgb(55,45,40)","rgb(180, 180, 180)","rgb(0, 96, 57)","#616161", "rgb(255, 255, 255)","rgba(255,255,255,.8)","rgb(255,225,130)", "__", "__"]
        this.listOfMidnightColor = ["rgb(0, 10, 46)","rgb(0, 30, 100)","rgb(180, 180, 180)","rgb(20, 10, 70)","#616161", "rgb(255, 255, 255)","rgba(255,255,255,.8)","rgb(255,225,130)", "__", "__"]
        this.listOfSyrupColor = ["rgb(255,250,230)","rgb(78, 10, 0)","rgb(226, 226, 226)","rgb(203, 160, 150)","rgb(233, 150, 80)", "rgb(0, 0, 0)","rgba(255,230,190, .9)","rgb(150,230,255)", "__", "__"]
        this.listOfNeonColor = ["rgb(2,0,33)","rgb(30, 30, 50)","rgb(255, 50, 100)","rgb(30, 30, 50)","rgb(141, 215, 252)", "rgb(255, 255, 255)","rgba(141, 215, 252, .8)","rgb(255,225,130)", "rgb(100,250,155)", "__"]
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
            let themeBtn = document.getElementById(themeName)
            for (let indexVar = 0; indexVar < (this.listOfVariable.length-3); indexVar++) {
                //let curentVariable = this.listOfVariable[indexVar];
                let newColor = this["listOf"+themeName+"Color"][indexVar]
                if (newColor == "__"){
                    newColor = this.listOfDefaultColor[indexVar]
                }
                let newSquare = document.createElement("div")
                newSquare.className = "square"
                newSquare.style = "width:20px ;height:20px ; background-color: "+newColor;
                themeBtn.appendChild(newSquare)  
            }

            themeBtn.addEventListener("click", this.takeNewRequest.bind(this, themeName))
        }
    }
    //"rgb(105, 35, 80)"
    takeNewRequest(request){
        switch(request){
            default: case "Default":
            request = "Default"
                this.applyValue(this.listOfDefaultColor)
                break;
            case "Midnight":
                this.applyValue(this.listOfMidnightColor)
                break;
            case "Grass":
                this.applyValue(this.listOfGrassColor);
                break;
            case "Syrup":
                this.applyValue(this.listOfSyrupColor);
                break;
            case "Neon":
                this.applyValue(this.listOfNeonColor);
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