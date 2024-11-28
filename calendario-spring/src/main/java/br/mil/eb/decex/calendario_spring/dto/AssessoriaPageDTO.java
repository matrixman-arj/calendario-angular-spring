package br.mil.eb.decex.calendario_spring.dto;

import java.util.List;

public record AssessoriaPageDTO (
    List<AssessoriaDTO> assessorias, 
    long totalElements, 
    int totalPages
    
    ){
    
}

