import { VideoConferencia } from "./VideoConferencia";


export interface VideoConferenciaPage {

  content: VideoConferencia[]; // O conteúdo da página está na propriedade "content"
  videoConferencias: VideoConferencia[]; // O array de pessoas está na propriedade "pessoas"
  totalElements: number; // Total de elementos na páginação
  totalPages: number;    // Total de páginas

}
