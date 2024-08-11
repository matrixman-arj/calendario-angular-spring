
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
  { value: PostoGraduacao.GEN_EXERCITO, viewValue: 'Gen Ex' , imageUrl: 'assets/images/gen_ex.png' },
  { value: PostoGraduacao.GEN_DIVISAO, viewValue: 'Gen Div', imageUrl: 'assets/images/gen_div.png' },
  { value: PostoGraduacao.GEN_BRIGADA, viewValue: 'Gen Bda', imageUrl: 'assets/images/gen_bda.png' },
  { value: PostoGraduacao.CORONEL, viewValue: 'Cel', imageUrl: 'assets/images/cel.png' },
  { value: PostoGraduacao.TEN_CORONEL, viewValue: 'Ten Cel', imageUrl: 'assets/images/ten_cel.png' },
  { value: PostoGraduacao.MAJOR, viewValue: 'Maj', imageUrl: 'assets/images/maj.png'  },
  { value: PostoGraduacao.CAPITAO, viewValue: 'Cap', imageUrl: 'assets/images/cap.png' },
  { value: PostoGraduacao.PRI_TENENTE, viewValue: '1º Ten', imageUrl: 'assets/images/1_ten.png' },
  { value: PostoGraduacao.SEG_TENENTE, viewValue: '2º Ten', imageUrl: 'assets/images/2_ten.png' },
  { value: PostoGraduacao.ASP, viewValue: 'Asp', imageUrl: 'assets/images/asp.png' },
  { value: PostoGraduacao.SUBTENENTE, viewValue: 'ST', imageUrl: 'assets/images/st.png' },
  { value: PostoGraduacao.PRI_SARGENTO, viewValue: '1º SGT', imageUrl: 'assets/images/1_sgt.png' },
  { value: PostoGraduacao.SEG_SARGENTO, viewValue: '2º SGT', imageUrl: 'assets/images/2sgt.png'  },
  { value: PostoGraduacao.TER_SARGENTO, viewValue: '3º SGT', imageUrl: 'assets/images/3_sgt.png' },
  { value: PostoGraduacao.CABO, viewValue: 'Cabo', imageUrl: 'assets/images/cabo.png'},
  { value: PostoGraduacao.SOLDADO, viewValue: 'Soldado', imageUrl: 'assets/images/soldado.png' },
  { value: PostoGraduacao.FUNC_CIV, viewValue: 'Funcionário Civíl', imageUrl: 'assets/images/func_civ.png' },
];

const postos = Object.values(PostoGraduacao);
