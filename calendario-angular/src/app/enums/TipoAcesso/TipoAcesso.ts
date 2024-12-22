export enum TipoAcesso {

  ADMINISTRADOR,
  USUARIO,
  AGENDAMENTO,
  DIV_PESS

}

export const TipoAcessoList = [
  { value: TipoAcesso.ADMINISTRADOR, viewValue: 'Administrador' },
  { value: TipoAcesso.USUARIO, viewValue: 'Usuário' },
  { value: TipoAcesso.AGENDAMENTO, viewValue: 'Agendamento' },
  { value: TipoAcesso.DIV_PESS, viewValue: 'Divisão de Pessoal' },
];
