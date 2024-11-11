import { Affiliation } from "./affiliation";
import { Diplome } from "./diplome";

export class Employe {
    constructor(
        public id:string,
        public matricule:string,
        public nom:string,
        public affiliation: Affiliation,
        public diplomes?: Diplome[]){
        }
}
