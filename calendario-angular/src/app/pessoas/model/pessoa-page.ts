import { Pessoa } from "./pessoa";

export interface PessoaPage {

  pessoas: Pessoa[]; // O array de pessoas está na propriedade "pessoas"
  content: Pessoa[]; // O array de pessoas está na propriedade "content"
  totalElements: number; // Total de elementos na páginação
  totalPages: number;    // Total de páginas
  size: number;          // Tamanho da página
  number: number;


}
