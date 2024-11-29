import { Assessoria } from "./assessoria";

export interface AssessoriaPage {

  assessorias: Assessoria[]; // Aqui, temos um array de assessorias
  content: Assessoria[]; // Aqui, temos um array de assessorias
  totalElements: number; // Total de elementos na páginação
  totalPages: number;    // Total de páginas

}
