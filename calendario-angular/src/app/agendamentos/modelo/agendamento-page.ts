import { Agendamento } from "./Agendamento";


export interface AgendamentoPage {

  content: Agendamento[]; // O conteúdo da página está na propriedade "content"
  agendamentos: Agendamento[]; // O array de pessoas está na propriedade "pessoas"
  totalElements: number; // Total de elementos na páginação
  totalPages: number;    // Total de páginas

}
