package br.mil.eb.decex.calendario_spring.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/assessorias")
@AllArgsConstructor
public class AssessoriaController {

    private final AssessoriaRepository assessoriaRepository;    

    @GetMapping
    public List<Assessoria> list() {
        return assessoriaRepository.findAll();

    }

    @GetMapping ("/{id}")
    public ResponseEntity<Assessoria> findById(@PathVariable Long id){
        return assessoriaRepository.findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());

    }     

     @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Assessoria create(@RequestBody Assessoria assessoria) {        
        return assessoriaRepository.save(assessoria);
    }

}
