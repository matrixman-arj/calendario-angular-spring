import { Assessoria } from "../../assessorias/model/assessoria";
import { Pessoa } from "../../pessoas/model/pessoa";


export interface Agendamento {

  id: number;
  dataInicio?: string;
  dataFim?: string;
  horaInicio?: string;
  horaFim?: string;
  pessoa: Pessoa;
  assessoria:Assessoria;
  acessorios?: string[];
  audiencia?: string;
  evento?: string;
  diex?: string;
  militarLigacao?: string

}
