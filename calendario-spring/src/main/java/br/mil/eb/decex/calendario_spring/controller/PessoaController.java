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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.dto.PessoaDTO;
import br.mil.eb.decex.calendario_spring.dto.PessoaPageDTO;
import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import br.mil.eb.decex.calendario_spring.service.PessoaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

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

    @PutMapping("/reativar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void reativarPessoa(@PathVariable Long id) {
    Pessoa pessoa = pessoaRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
    pessoa.setLiberado(true);
    pessoaRepository.save(pessoa);
}


    

    @GetMapping
    public List <PessoaDTO> list() {
        return pessoaService.list();

    }

   
    
    @GetMapping("/search")
    public PessoaPageDTO search(String termo, @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize
    ) {
        
        return pessoaService.search(termo, page, pageSize);
    }

    @GetMapping("/inativas")
    public PessoaPageDTO listarPessoasInativas(
            @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize) {

        return pessoaService.listarInativas(page, pageSize);
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
