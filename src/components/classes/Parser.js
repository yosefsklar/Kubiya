



export default class Parser {

    constructor(){

    }

    cleanText(textArr){
        return textArr.map(x => x.replace(/<[^>]*>/g,""));

    }

}