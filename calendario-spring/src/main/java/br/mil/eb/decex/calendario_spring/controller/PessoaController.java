package br.mil.eb.decex.calendario_spring.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/pessoas")
@AllArgsConstructor
public class PessoaController {

    private final PessoaRepository pessoaRepository;

    

    @GetMapping
    public @ResponseBody List<Pessoa> list() {
        return pessoaRepository.findAll();

    }

    @PostMapping
    public ResponseEntity<Pessoa> create(@RequestBody Pessoa pessoa) {
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(pessoaRepository.save(pessoa));
    }

}
