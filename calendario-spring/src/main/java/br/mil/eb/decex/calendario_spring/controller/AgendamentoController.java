package br.mil.eb.decex.calendario_spring.controller;

import java.time.LocalDate;
import java.util.List;

import org.aspectj.lang.annotation.SuppressAjWarnings;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.dto.AgendamentoDTO;
import br.mil.eb.decex.calendario_spring.dto.AgendamentoPageDTO;
import br.mil.eb.decex.calendario_spring.dto.PessoaPageDTO;
import br.mil.eb.decex.calendario_spring.enumerado.Acessorios;
import br.mil.eb.decex.calendario_spring.repository.AgendamentoRepository;
import br.mil.eb.decex.calendario_spring.service.AgendamentoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @SuppressAjWarnings
    private final AgendamentoRepository agendamentoRepository;
    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoRepository agendamentoRepository, AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
        this.agendamentoRepository = agendamentoRepository;
    }

    @GetMapping
    public List<AgendamentoDTO> list() {
        return agendamentoService.list();
    }

    @GetMapping("/search")
    public AgendamentoPageDTO search(String termo, @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize
    ) {
        
        return agendamentoService.search(termo, page, pageSize);
    }

    @GetMapping("/search-agenda")
    public AgendamentoPageDTO searchAgenda(
        
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim,
        @RequestParam(defaultValue = "0") @PositiveOrZero int page,
        @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize) {

    return agendamentoService.search2(dataInicio, dataFim, page, pageSize);
}

    @GetMapping("/acessorios")
    public ResponseEntity<Acessorios[]> getAcessoriosValues() {       
        return ResponseEntity.ok(Acessorios.values());
    }

    @GetMapping ("/{id}")
    public AgendamentoDTO findById(@PathVariable @NotNull @Positive Long id){
        return agendamentoService.findById(id);
        

    } 

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public AgendamentoDTO create(@RequestBody @Valid AgendamentoDTO agendamento) {
        return agendamentoService.create(agendamento);
    }    

    @PutMapping("/{id}")
    public AgendamentoDTO update(@PathVariable @NotNull @Positive Long id, 
                @RequestBody @Valid @NotNull AgendamentoDTO agendamento) {
        return agendamentoService.update(id, agendamento);
                                    
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {        
       agendamentoService.delete(id);
    }
}