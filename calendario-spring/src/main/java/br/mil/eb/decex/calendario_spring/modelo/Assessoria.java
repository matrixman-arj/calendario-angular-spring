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

}
