package br.mil.eb.decex.calendario_spring.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.dto.PessoaDTO;
import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import br.mil.eb.decex.calendario_spring.service.PessoaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("api/pessoas")
public class PessoaController {
    
    @SuppressWarnings("unused")
    private final PessoaRepository pessoaRepository;
    private final PessoaService pessoaService;    
    
    

    public PessoaController(PessoaRepository pessoaRepository, PessoaService pessoaService) {
        this.pessoaRepository = pessoaRepository;
        this.pessoaService = pessoaService;
    }

    @GetMapping
    public List<PessoaDTO> list() {
        return pessoaService.list();

    }

    @GetMapping ("/{id}")
    public PessoaDTO findById(@PathVariable @NotNull @Positive Long id){
        return pessoaService.findById(id);
        

    } 
    
    @GetMapping("/posto-graduacao")
    public ResponseEntity<PostoGraduacao[]> getPostoGraduacaoValues() {       
        return ResponseEntity.ok(PostoGraduacao.values());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public PessoaDTO create(@RequestBody @Valid PessoaDTO pessoa) {
        //pessoa.caminho("http://localhost:8080/media/" + pessoa.identidade() + ".jpg");        
        return pessoaService.create(pessoa);
    }

    @PutMapping("/{id}")
    public PessoaDTO update(@PathVariable @NotNull @Positive Long id, 
                @RequestBody @Valid @NotNull PessoaDTO pessoa) {
        return pessoaService.update(id, pessoa);
                                    
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {        
       pessoaService.delete(id);
    }

}
