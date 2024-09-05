export interface Assessoria {

	_id: string;

  sigla: string;

	descricao: string;

  interna: boolean;

  assessoriaPai?: Assessoria | null;  // Pode ser null ou um objeto Assessoria

  ordem: number;

}
