import { FileHandle } from "./file-handle.model";


export interface Pessoa {

	_id: string;

  identidade: string;

	users: string;

	tipoAcesso: string;

  nome: string;

  nomeGuerra: string;

	postoGraduacao: string;

	assessoria: number;

	liberado: string;

  ramal: string;

  foto: FileHandle[];

}
