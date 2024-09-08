package br.mil.eb.decex.calendario_spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AssessoriaDTO(
    
    @JsonProperty("_id")
    Long id, 
    
    @NotBlank
	@NotNull
    String sigla,
    
    @NotBlank
	@NotNull
    String descricao,

    Assessoria assessoriaPai, 
    int ordem,
     
    Boolean interna 
    ) {

}
