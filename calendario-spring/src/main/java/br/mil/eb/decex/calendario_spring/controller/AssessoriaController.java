package br.mil.eb.decex.calendario_spring.controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/assessorias")
@AllArgsConstructor
public class AssessoriaController {

    private AssessoriaRepository assessoriaRepository;

    

    @GetMapping
    public List<Assessoria> list() {
        return assessoriaRepository.findAll();

    }

}
