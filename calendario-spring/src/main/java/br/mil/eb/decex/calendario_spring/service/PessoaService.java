package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }
    
    public List<Pessoa> list() {
        return pessoaRepository.findAll();

    }
        public Pessoa findById(@PathVariable @NotNull @Positive Long id){
        return pessoaRepository.findById(id).orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public Pessoa create(@Valid Pessoa pessoa) {
        pessoa.setCaminho("http://localhost:8080/media/" + pessoa.getIdentidade() + ".jpg");        
        return pessoaRepository.save(pessoa);
    }

    public Pessoa update(@NotNull @Positive Long id, @RequestBody @Valid Pessoa pessoa) {
        return pessoaRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setIdentidade(pessoa.getIdentidade());
                    recordFound.setUsers(pessoa.getUsers());
                    recordFound.setNome(pessoa.getNome());
                    recordFound.setNomeGuerra(pessoa.getNomeGuerra());
                    recordFound.setPostoGraduacao(pessoa.getPostoGraduacao());
                    recordFound.setAntiguidade(pessoa.getAntiguidade());
                    recordFound.setAssessoria(pessoa.getAssessoria());
                    recordFound.setCaminho(pessoa.getCaminho());
                    recordFound.setAcesso(pessoa.getAcesso());
                    recordFound.setRamal(pessoa.getRamal());
                    recordFound.setTipoAcesso(pessoa.getTipoAcesso());
                    return pessoaRepository.save(recordFound);
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    }  

    public void delete(@PathVariable @NotNull @Positive Long id) {

        pessoaRepository.delete(pessoaRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }

}
