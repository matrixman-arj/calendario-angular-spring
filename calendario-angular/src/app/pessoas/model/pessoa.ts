import { Assessoria } from "../../assessorias/model/assessoria";

export interface Pessoa {

	_id: string;

  identidade: string;

	users: string;

	tipoAcesso: string;

  nome: string;

  nomeGuerra: string;

	postoGraduacao: string;

	assessoria: Assessoria;

	liberado: string;

  ramal: string;

  caminho: string

}
