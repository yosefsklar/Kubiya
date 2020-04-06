



export default class Parser {

    constructor(){

    }

    cleanText(textArr){
        return textArr.map(x => x.replace(/<\s*a[^>]*>(.*?)<\s*\/\s*a>/g,"").replace(/<[^>]*>/g,""));

    }

}