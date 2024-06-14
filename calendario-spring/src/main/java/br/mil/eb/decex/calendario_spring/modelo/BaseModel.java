package br.mil.eb.decex.calendario_spring.modelo;

import java.io.Serializable;

/**
 * Classe base para todos os modelos do sistema
 * 
 * @author <b>Vanilton</b> Gomes dos Santos - 2º Sgt QE
 * @version 1.0
 *
 * @param <T> Tipo do identificador
 */
public abstract class BaseModel<T extends Serializable> {

	/**
	 * Identificador de tabela. Código sequencial
	 * @return chave primária da obrigação
	 */			
	public abstract T getId();
	
}
