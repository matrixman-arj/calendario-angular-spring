package br.mil.eb.decex.calendario_spring.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
public class Assessoria {

    @Id
	@SequenceGenerator(name="ASSESSORIA_ID_GENERATOR", sequenceName="ASSESSORIA_ID_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ASSESSORIA_ID_GENERATOR")	
	private Long id;
		
	@Column
	private String sigla;
	
	@Column
	private String descricao;
				
	public Assessoria() {
		
	}
/**
	 * Identificador de tabela. Código sequencial
	 * @return chave primária da Assessoria 
	 */	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Nome da assessoria
	 * @return nome da assessoria
	 */		
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	/**
	 * Sigla da assessoria
	 * @return sigla da assessoria
	 */			
	public String getSigla() {
		return sigla;
	}
	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Assessoria))
			return false;
		Assessoria other = (Assessoria) obj;
		if (getId() == null) {
			if (other.getId() != null)
				return false;
		} else if (!getId().equals(other.getId()))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Assessoria [sigla=" + sigla + "]";
	}	
}