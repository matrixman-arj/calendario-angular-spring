package br.mil.eb.decex.calendario_spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.dto.AgendamentoDTO;

import br.mil.eb.decex.calendario_spring.service.AgendamentoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping
    public List<AgendamentoDTO> list() {
        return agendamentoService.list();
    }

    @GetMapping ("/{id}")
    public AgendamentoDTO findById(@PathVariable @NotNull @Positive Long id){
        return agendamentoService.findById(id);
        

    } 

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public AgendamentoDTO create(@RequestBody @Valid AgendamentoDTO agendamentoDTO) {
        return agendamentoService.create(agendamentoDTO);
    }

    // Métodos para update e delete, se necessário
}