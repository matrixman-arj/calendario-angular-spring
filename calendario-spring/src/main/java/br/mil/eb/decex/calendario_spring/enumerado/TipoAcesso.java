package br.mil.eb.decex.calendario_spring.enumerado;

/**
 * Enumerado para definição dos perfis do usuário<p/>
 * 
 * <b>USUARIO</b> - Usuário de sistema, possui permissão para inserir obrigações 
 * apenas em sua assessoria <p/>
 * <b>ADMINISTRADOR</b> - Administrador, possui permissão para liberar acesso para 
 * usuários do sistema <p/>
 * <b>AUDITORIO</b> - Possui permissão para registrar agendamentos para o Auditório do DECEx
 * 
 * @author <b>Vanilton</b> Gomes dos Santos - 2º Sgt QE
 * @version 1.1 (Incluído perfil AUDITORIO)
 */
public enum TipoAcesso {
	USUARIO("Usuário"),
	ADMINISTRADOR("Administrador"),
	AUDITORIO("Auditório");
	
private String value;
	
	private TipoAcesso(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}
