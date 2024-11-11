import { Category } from "./category";

export class Game {
    constructor(
        public id:number ,
        public name: string,
        public price:number,
        public madeIn:string,
        public category:Category ,
        public isNew:boolean,
        public shops?: string[]
    ){}
}
