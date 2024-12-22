package br.mil.eb.decex.calendario_spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record UsuarioDTO(
     @JsonProperty("_id")
    Long id,


    @NotBlank
    @NotNull
	String username,

    @NotBlank
    @NotNull
	String password,

    @NotBlank
    @NotNull
	String role,

    @NotNull
    boolean liberado

    
    ) {

}
