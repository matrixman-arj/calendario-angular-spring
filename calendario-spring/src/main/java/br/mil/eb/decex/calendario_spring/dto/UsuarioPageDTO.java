package br.mil.eb.decex.calendario_spring.dto;

import java.util.List;

public record UsuarioPageDTO(List<UsuarioDTO> pessoas, long totalElements, int totalPages) {

}
