package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import br.mil.eb.decex.calendario_spring.dto.PessoaDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.PessoaMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    private final PessoaMapper pessoaMapper;

    public PessoaService(PessoaRepository pessoaRepository, PessoaMapper pessoaMapper ) {
        this.pessoaRepository = pessoaRepository;
        this.pessoaMapper = pessoaMapper;
    }
    
    public List<PessoaDTO> list() {
        return pessoaRepository.findAll()
            .stream()
            .map(pessoaMapper::toDTO)
                .collect(Collectors.toList());

    }
        public PessoaDTO findById(@PathVariable @NotNull @Positive Long id){
        return pessoaRepository.findById(id).map(pessoaMapper::toDTO)
                .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public PessoaDTO create(@Valid @NotNull PessoaDTO pessoa) {
       // pessoa.caminho("http://localhost:8080/media/" + pessoa.identidade() + ".jpg");        
        return pessoaMapper.toDTO(pessoaRepository.save(pessoaMapper.toEntity(pessoa)));
    }

    public PessoaDTO update(@NotNull @Positive Long id, @Valid PessoaDTO pessoa) {
        return pessoaRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setIdentidade(pessoa.identidade());
                    recordFound.setUsers(pessoa.users());
                    recordFound.setNome(pessoa.nome());
                    recordFound.setNomeGuerra(pessoa.nomeGuerra());
                    recordFound.setPostoGraduacao(pessoa.postoGraduacao());
                    recordFound.setAntiguidade(pessoa.antiguidade());
                    recordFound.setAssessoria(pessoa.assessoria());
                    recordFound.setCaminho(pessoa.caminho());
                    recordFound.setAcesso(pessoa.acesso());
                    recordFound.setRamal(pessoa.ramal());
                    recordFound.setTipoAcesso(pessoa.tipoAcesso());

                    return pessoaMapper.toDTO(pessoaRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    }  

    public void delete(@PathVariable @NotNull @Positive Long id) {

        pessoaRepository.delete(pessoaRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }

}
