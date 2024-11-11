import { Departement, Poste } from "./types";


export class Affiliation {
    constructor(
        public poste:Poste,
        public departement:Departement
    ){}
}
