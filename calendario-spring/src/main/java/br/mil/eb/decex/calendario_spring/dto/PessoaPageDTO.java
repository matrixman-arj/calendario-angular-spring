package br.mil.eb.decex.calendario_spring.dto;

import java.util.List;

public record PessoaPageDTO(List<PessoaDTO> pessoas, long totalElements, int totalPages) {

}
