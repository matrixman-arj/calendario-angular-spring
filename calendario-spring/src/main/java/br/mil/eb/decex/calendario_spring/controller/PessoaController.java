package br.mil.eb.decex.calendario_spring.controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/pessoas")
@AllArgsConstructor
public class PessoaController {

    private PessoaRepository pessoaRepository;

    

    @GetMapping
    public List<Pessoa> list() {
        return pessoaRepository.findAll();

    }

}
