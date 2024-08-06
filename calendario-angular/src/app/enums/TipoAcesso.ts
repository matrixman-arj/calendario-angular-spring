export enum TipoAcesso {

  ADMINISTRADOR,
  USUARIO,
  AUDITORIO

}

export const TipoAcessoList = [
  { value: TipoAcesso.ADMINISTRADOR, viewValue: 'Administrador' },
  { value: TipoAcesso.USUARIO, viewValue: 'Usuário' },
  { value: TipoAcesso.AUDITORIO, viewValue: 'Auditório' },
];

