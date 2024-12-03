import { Auditorio } from "./Auditorio";


export interface AuditorioPage {

  content: Auditorio[]; // O conteúdo da página está na propriedade "content"
  auditorios: Auditorio[]; // O array de pessoas está na propriedade "pessoas"
  totalElements: number; // Total de elementos na páginação
  totalPages: number;    // Total de páginas

}
