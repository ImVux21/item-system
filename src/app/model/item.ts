export class Item {
    majorClassification: string;
    mediumClassification: string;
    code: string;
    printName: string;
    displayName: string;
    name: string;
    kitchenPrintName: string;

    constructor(majorClassification: string, mediumClassification: string, code: string, printName: string, displayName: string, name: string, kitchenPrintName: string) {
        this.majorClassification = majorClassification;
        this.mediumClassification = mediumClassification;
        this.code = code;
        this.printName = printName;
        this.displayName = displayName;
        this.name = name;
        this.kitchenPrintName = kitchenPrintName;
    }

    
}
