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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/pessoas")
@AllArgsConstructor
public class PessoaController {
    
    private final PessoaRepository pessoaRepository;        
    

    @GetMapping
    public List<Pessoa> list() {
        return pessoaRepository.findAll();

    }

    @GetMapping ("/{id}")
    public ResponseEntity<Pessoa> findById(@PathVariable Long id){
        return pessoaRepository.findById(id)
        .map(recordFound -> ResponseEntity.ok().body(recordFound))
        .orElse(ResponseEntity.notFound().build());

    } 
    
    @GetMapping("/posto-graduacao")
    public ResponseEntity<PostoGraduacao[]> getPostoGraduacaoValues() {
        return ResponseEntity.ok(PostoGraduacao.values());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Pessoa create(@RequestBody Pessoa pessoa) {
        pessoa.setCaminho("http://localhost:8080/media/" + pessoa.getIdentidade() + ".jpg");        
        return pessoaRepository.save(pessoa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> update(@PathVariable Long id, @RequestBody Pessoa pessoa) {
        return pessoaRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setIdentidade(pessoa.getIdentidade());
                    recordFound.setNome(pessoa.getNome());
                    recordFound.setNomeGuerra(pessoa.getNomeGuerra());
                    recordFound.setAntiguidade(pessoa.getAntiguidade());
                    recordFound.setAssessoria(pessoa.getAssessoria());
                    recordFound.setCaminho(pessoa.getCaminho());
                    recordFound.setLiberado(pessoa.getLiberado());
                    recordFound.setPostoGraduacao(pessoa.getPostoGraduacao());
                    recordFound.setRamal(pessoa.getRamal());
                    recordFound.setTipoAcesso(pessoa.getTipoAcesso());
                    recordFound.setUsers(pessoa.getUsers());
                    Pessoa updated = pessoaRepository.save(recordFound);
                    return ResponseEntity.ok().body(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return pessoaRepository.findById(id)
        .map(recordFound -> {
            pessoaRepository.deleteById(id);
            return ResponseEntity.noContent().<Void>build();
         })
         .orElse(ResponseEntity.notFound().build());

    }

}
