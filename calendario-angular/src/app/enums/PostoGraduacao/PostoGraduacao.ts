
export enum PostoGraduacao {
  GEN_EXERCITO,
	GEN_DIVISAO,
	GEN_BRIGADA,
	CORONEL,
	TEN_CORONEL,
	MAJOR,
	CAPITAO,
	PRI_TENENTE,
	SEG_TENENTE,
	ASP,
	SUBTENENTE,
	PRI_SARGENTO,
	SEG_SARGENTO,
	TER_SARGENTO,
	CABO,
	SOLDADO,
	FUNC_CIV
}
export const PostoGraduacaoList = [
  { value: PostoGraduacao.GEN_EXERCITO, viewValue: 'Gen Ex' },
  { value: PostoGraduacao.GEN_DIVISAO, viewValue: 'Gen Div' },
  { value: PostoGraduacao.GEN_BRIGADA, viewValue: 'Gen Bda' },
  { value: PostoGraduacao.CORONEL, viewValue: 'Cel' },
  { value: PostoGraduacao.TEN_CORONEL, viewValue: 'Ten Cel' },
  { value: PostoGraduacao.MAJOR, viewValue: 'Maj' },
  { value: PostoGraduacao.CAPITAO, viewValue: 'Cap' },
  { value: PostoGraduacao.PRI_TENENTE, viewValue: '1º Ten' },
  { value: PostoGraduacao.SEG_TENENTE, viewValue: '2º Ten' },
  { value: PostoGraduacao.ASP, viewValue: 'Asp' },
  { value: PostoGraduacao.SUBTENENTE, viewValue: 'ST' },
  { value: PostoGraduacao.PRI_SARGENTO, viewValue: '1º SGT' },
  { value: PostoGraduacao.SEG_SARGENTO, viewValue: '2º SGT' },
  { value: PostoGraduacao.TER_SARGENTO, viewValue: '3º SGT' },
  { value: PostoGraduacao.CABO, viewValue: 'Cabo' },
  { value: PostoGraduacao.SOLDADO, viewValue: 'Soldado' },
  { value: PostoGraduacao.FUNC_CIV, viewValue: 'Funcionário Civíl' },
];

const postos = Object.values(PostoGraduacao);
