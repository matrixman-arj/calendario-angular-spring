import { Pessoa } from "./pessoa";

export interface PessoaPage {

  pessoas: Pessoa[]; // O array de pessoas está na propriedade "pessoas"
  totalElements: number; // Total de elementos na páginação
  totalPages: number;    // Total de páginas

}
