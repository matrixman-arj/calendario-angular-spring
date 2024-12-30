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

import br.mil.eb.decex.calendario_spring.dto.AuditorioDTO;
import br.mil.eb.decex.calendario_spring.dto.AuditorioPageDTO;
import br.mil.eb.decex.calendario_spring.enumerado.Acessorios;
import br.mil.eb.decex.calendario_spring.repository.AuditorioRepository;
import br.mil.eb.decex.calendario_spring.service.AuditorioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@RestController
@RequestMapping("/api/auditorios")
public class AuditorioController {

    @SuppressAjWarnings
    private final AuditorioRepository auditorioRepository;
    private final AuditorioService auditorioService;

    public AuditorioController(AuditorioRepository auditorioRepository, AuditorioService auditorioService) {
        this.auditorioService = auditorioService;
        this.auditorioRepository = auditorioRepository;
    }

    @GetMapping
    public List<AuditorioDTO> list() {
        return auditorioService.list();
    }

    @GetMapping("/search")
    public AuditorioPageDTO search(String termo, @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize
    ) {
        
        return auditorioService.search(termo, page, pageSize);
    }

     @GetMapping("/search-agenda")
    public AuditorioPageDTO searchAgenda(
        
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio, LocalDate dataFim,
        
        
        @RequestParam(defaultValue = "0") @PositiveOrZero int page,
        @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize) {
            

    return auditorioService.search2(dataInicio, dataFim, page, pageSize);
}

    @GetMapping("/acessorios")
    public ResponseEntity<Acessorios[]> getAcessoriosValues() {       
        return ResponseEntity.ok(Acessorios.values());
    }

    @PutMapping("/{id}/confirmar")
    public AuditorioDTO confirmar(@PathVariable @NotNull @Positive Long id) {
        return auditorioService.confirmarAgendamento(id);
    }


    @GetMapping ("/{id}")
    public AuditorioDTO findById(@PathVariable @NotNull @Positive Long id){
        return auditorioService.findById(id);
        

    } 

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public AuditorioDTO create(@RequestBody @Valid AuditorioDTO auditorio) {
        return auditorioService.create(auditorio);
    }    

    @PutMapping("/{id}")
    public AuditorioDTO update(@PathVariable @NotNull @Positive Long id, 
                @RequestBody @Valid @NotNull AuditorioDTO auditorio) {
        return auditorioService.update(id, auditorio);
                                    
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {        
       auditorioService.delete(id);
    }
}