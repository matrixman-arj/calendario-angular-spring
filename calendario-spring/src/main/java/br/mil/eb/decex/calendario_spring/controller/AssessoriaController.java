package br.mil.eb.decex.calendario_spring.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;

import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.service.AssessoriaService;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


@RestController
@RequestMapping("/api/assessorias")

public class AssessoriaController {
  
    private final AssessoriaService assessoriaService;

    
    public AssessoriaController(AssessoriaService assessoriaService) {
        
        this.assessoriaService = assessoriaService;
    }

    @GetMapping
    public @ResponseBody List<Assessoria> list() {
        return assessoriaService.list();

    }

    @GetMapping ("/{id}")
    public ResponseEntity<Assessoria> findById(@PathVariable Long id){
        return assessoriaService.findById(id)
        .map(recordFound -> ResponseEntity.ok().body(recordFound))
        .orElse(ResponseEntity.notFound().build());

    }
    
   
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Assessoria create(@RequestBody Assessoria assessoria) {        
        return assessoriaService.create(assessoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assessoria> update(@PathVariable Long id, @RequestBody Assessoria assessoria) {
        return assessoriaService.update(id, assessoria)
                .map(recordFound -> ResponseEntity.ok().body(recordFound))
                .orElse(ResponseEntity.notFound().build()); 
                                
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NotNull @Positive Long id) {
        if (assessoriaService.delete(id)){
        return ResponseEntity.noContent().<Void>build();
        }
       return ResponseEntity.notFound().build();
        

    }

}
