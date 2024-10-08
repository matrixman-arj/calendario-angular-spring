package br.mil.eb.decex.calendario_spring.controller;

import java.util.List;

import org.aspectj.lang.annotation.SuppressAjWarnings;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.dto.CalendarioDTO;
import br.mil.eb.decex.calendario_spring.enumerado.Acessorios;
import br.mil.eb.decex.calendario_spring.repository.CalendarioRepository;
import br.mil.eb.decex.calendario_spring.service.CalendarioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/api/calendarios")
public class CalendarioController {

    @SuppressAjWarnings
    private final CalendarioRepository calendarioRepository;
    private final CalendarioService calendarioService;

    public CalendarioController(CalendarioRepository calendarioRepository, CalendarioService calendarioService) {
        this.calendarioService = calendarioService;
        this.calendarioRepository = calendarioRepository;
    }

    @GetMapping
    public List<CalendarioDTO> list() {
        return calendarioService.list();
    }

    @GetMapping("/acessorios")
    public ResponseEntity<Acessorios[]> getAcessoriosValues() {       
        return ResponseEntity.ok(Acessorios.values());
    }

    @GetMapping ("/{id}")
    public CalendarioDTO findById(@PathVariable @NotNull @Positive Long id){
        return calendarioService.findById(id);
        

    } 

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CalendarioDTO create(@RequestBody @Valid CalendarioDTO calendario) {
        return calendarioService.create(calendario);
    }    

    @PutMapping("/{id}")
    public CalendarioDTO update(@PathVariable @NotNull @Positive Long id, 
                @RequestBody @Valid @NotNull CalendarioDTO calendario) {
        return calendarioService.update(id, calendario);
                                    
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {        
       calendarioService.delete(id);
    }
}