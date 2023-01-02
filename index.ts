import jsPDF, {Matrix} from "jspdf"
import * as cards from "./Cards.json"

class CardSettings {
    readonly width: number = 210 / 3
    height: number = 297 / 3;
}

class SvgToPdfInternals {
    private static readonly dummyDoc: jsPDF = new jsPDF()
    private readonly doc: jsPDF

    private currentMatrix: Matrix
    private currentMatrixInverted: Matrix
    private readonly _cardSettings: CardSettings;
    
    private x_offset : number = 0
    private y_offset : number = 0

    constructor(
        advancedApi: jsPDF,
        cardSettings?: CardSettings
    ) {
        this.doc = advancedApi
        this._cardSettings = cardSettings ?? new CardSettings();
        this.currentMatrix = this.doc.unitMatrix
        this.currentMatrixInverted = this.doc.unitMatrix

    }

    public static parseCss(styleContent: string, separator: string = ";"): Record<string, string> {
        if (styleContent === undefined || styleContent === null) {
            return {}
        }
        const r: Record<string, string> = {}

        for (const rule of styleContent.split(separator)) {
            const [k, v] = rule.split(":").map((x) => x.trim())
            r[k] = v
        }

        return r
    }
    public setLocation(x: number, y: number) {
        this.x_offset = x * this._cardSettings.width
        this.y_offset = y * this._cardSettings.height
    }

    public text(text: string, x: number, y: number, options: {
        fontSize: number
    }): void {
        this.doc.setFontSize(options?.fontSize)
        this.doc.text(text, x + this.x_offset, y + this.y_offset, {maxWidth: this._cardSettings.width - 2 * x},
            this.currentMatrix)
    }

}


export interface CharacterCard {
    publ?: string
    priv?: string
}


interface CardDrawer {

    DrawPublicSide(advancedAPI: jsPDF)

    DrawPrivateSide(advancedAPI: jsPDF)

}


class CharacterCardDrawer extends SvgToPdfInternals implements CardDrawer {
    private readonly _card: CharacterCard;
    private readonly _persona: string;

    constructor(persona: string, card: CharacterCard, doc: jsPDF) {
        super(doc)
        if (!card) {
            throw "No card given for " + persona
        }
        this._card = card;
        this._persona = persona
    }

    private Draw(title: string, contents?: string){
        this.text(
            title,
            3,
            10,
            {fontSize: 18}
        )
        if (contents) {
            this.text(
                contents,
                3,
                17 + (title.length  > 18 ? 7 : 0) ,
                {fontSize: 13}
            )
        }
    }
    
    DrawPrivateSide() {
        this.Draw(this._persona, this._card.priv)
    }

    DrawPublicSide() {
        this.Draw(this._persona, this._card.publ)
    }

}

interface Card {
    card: CharacterCard,
    persona: string,
    scenario: string,
    folded?: boolean
}

class Main {
    private readonly height = 297
    private readonly width = 210
    /**
     * Max amount of characters on a card
     * @private
     */
    private readonly cutoff = 350


    public draw9Cards(cards: Card[], advancedApi: jsPDF) {

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const c = cards[x + y * 3];
                if (c === undefined) {
                    continue
                }
                const drawer = new CharacterCardDrawer(c.persona + " (" + c.scenario + ")", c.card, advancedApi)
                drawer.setLocation(x, y)
                drawer.DrawPublicSide()
                this.drawEdges(x, y, advancedApi, c.folded)

            }
        }

        this.createPage(advancedApi)

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const c = cards[(2 - x) + y * 3];
                if (c === undefined) {
                    continue
                }
                const drawer = new CharacterCardDrawer(c.persona, c.card, advancedApi)
                drawer.setLocation( x, y)
                drawer.DrawPrivateSide()
                this.drawEdges(x , y, advancedApi, true)
            }
        }

    }

    public async main(args: string[]): Promise<void> {


        const doc = new jsPDF("portrait", undefined, [this.width, this.height])
        let cards = this.orderCharacterCardsPer3( this.getCharacterCards())
        doc.advancedAPI((advancedApi) => {
            while (cards.length > 0) {
                this.draw9Cards(cards.slice(0, 9), advancedApi)
                cards = cards.slice(9)
                if (cards.length > 0) {
                    this.createPage(advancedApi)
                }
            }

        })
        await doc.save("cards.pdf")
    }

    private drawEdges(x: number, y: number, advancedApi: jsPDF, folded: boolean) {
        const h = this.height / 3
        const w = this.width / 3
        advancedApi.line(x * w, (y + 1) * h, (x + 1) * w, (y + 1) * h)
        if (!folded) {
            advancedApi.line((x + 1) * w, y * h, (x + 1) * w, (y + 1) * h)
        }
    }
    
    private ExtractScenario(scenarioName: string, subscenario: Record<string, { publ?: string | string[], priv?: string | string[], skills?: string[] }>): Card[]{
        if(subscenario === undefined){
            return []
        }
        const result : Card[]= []
        const characters = Object.keys(subscenario)
        const cutoff = this.cutoff
        for (const character of characters) {
            let publ = subscenario[character].publ
            if(typeof publ !== "string"){
                publ =  publ?.join("\n\n")
            }
            let priv = subscenario[character].priv
            if(typeof priv !== "string"){
                priv =  priv?.join("\n\n")
            }
            const skills = <string[]> subscenario[character].skills

            if(skills){
                const skls = "Available skills and programs:\n"+skills.join(", ")
                if(publ){
                    publ = skls+"\n\n"+publ
                }else{
                    publ = skls
                }
               
            }

           
            if (publ?.length > cutoff) {
                throw "Public text for " + character + " " + scenarioName + " is too long"
            }
            if (priv?.length > cutoff) {
                const privSpl = priv.split("\n\n")
                let priv0 = ""
                do {
                    priv0 += privSpl.shift()
                    priv0 += "\n\n"
                } while (priv0.length + privSpl[0].length < cutoff)
                result.push({
                    card: { priv: privSpl.join("\n\n")},
                    folded: true,
                    persona: character,
                    scenario: scenarioName
                })
                result.push({
                    card: {publ, priv: priv0},

                    persona: character,
                    scenario: scenarioName
                })

            } else {

                result.push({
                    card: {publ, priv},
                    persona: character,
                    scenario: scenarioName
                })
            }
        }
        return result
    }

    private getCharacterCards(): Card[] {
         const result: Card[] = []
        
        let i = 1;
        while (cards["" + i]) {
            const scenario = cards["" + i]
            let j = 1;
            result.push(...this.ExtractScenario(""+i, scenario["*"]))
            while (scenario["" + j]) {
                const subscenario = scenario["" + j]
                const scenarioName = i + "." + j
                result.push(...this.ExtractScenario(scenarioName, subscenario))
                j++
            }
            i++
        }
        
        result.push(...this.ExtractScenario("Program", cards["programs"]))
        
        return result;
    }

    /**
     * Makes sure no 'foldable' cards are over the edge
     * @param cards
     * @private
     */
    private orderCharacterCardsPer3(cards: Card[]): Card[] {
        const foldablePairs: [Card, Card] [] = []
        const dummy = {
            persona: "",
            scenario: "",
            card: {}
        }
        const singles: Card[] = []
        let skipOne = false
        for (let i = 0; i < cards.length; i++) {
            if(skipOne){
                skipOne = false
                continue
            }
            if(cards[i].folded){
                foldablePairs.push([cards[i], cards[i+1]])
                skipOne = true;
                continue
            }
            singles.push(cards[i])
        }
        const result : Card[] = []

        for (let i = 0; i < foldablePairs.length; i++){
            const foldablePair = foldablePairs[i];
            result.push(...foldablePair)
            if(i + 1 < foldablePairs.length){
                result.push(singles.shift() ?? dummy)
            }
        }
        result.push(...singles)

        return result
    }

    private createPage(advancedApi: jsPDF) {
        advancedApi.addPage([this.width, this.height])
        const mediabox: {
            bottomLeftX: number
            bottomLeftY: number
            topRightX: number
            topRightY: number
        } = advancedApi.getCurrentPageInfo().pageContext.mediaBox
        const sx = mediabox.topRightX / this.width
        const sy = mediabox.topRightY / this.height
        advancedApi.setCurrentTransformationMatrix(
            advancedApi.Matrix(sx, 0, 0, -sy, 0, mediabox.topRightY)
        )
    }


}

new Main().main([]).then(_ => console.log("All done!"))