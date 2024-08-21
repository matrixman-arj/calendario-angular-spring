package br.mil.eb.decex.calendario_spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;

public record AssessoriaDTO(
    
    @JsonProperty("_id")
    Long id, 
    String sigla, 
    String descricao, 
    Assessoria assessoriaPai, 
    int ordem, 
    Boolean interna 
    ) {

}
