package br.mil.eb.decex.calendario_spring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import br.mil.eb.decex.calendario_spring.enumerado.Acessorios;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import jakarta.validation.constraints.NotNull;

public record AgendamentoDTO(

        Long id,

        @NotNull Assessoria assessoria,

        @NotNull Pessoa pessoa,

        @NotNull LocalDate data,

        @NotNull LocalTime horaInicio,

        @NotNull LocalTime horaFim,

        Set<Acessorios> acessorios,
        
        String audiencia,

        String evento,

        String diex,

        String militarLigacao
        
        ) {       }
