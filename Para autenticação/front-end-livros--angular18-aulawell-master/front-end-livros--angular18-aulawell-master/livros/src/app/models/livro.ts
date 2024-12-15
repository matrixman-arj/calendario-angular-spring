import { Autor } from "./autor";
import { Biblioteca } from "./biblioteca";

export class Livro {

    id!: number;
    titulo!: string;
    biblioteca!: Biblioteca;
    autores!: Autor[];

}
