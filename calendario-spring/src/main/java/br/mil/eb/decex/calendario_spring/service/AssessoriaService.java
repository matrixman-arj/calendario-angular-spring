package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class AssessoriaService {

    private final AssessoriaRepository assessoriaRepository;

    public AssessoriaService(AssessoriaRepository assessoriaRepository) {
        this.assessoriaRepository = assessoriaRepository;
    } 
    
    public List<Assessoria> list() {
        return assessoriaRepository.findAll();

    }

     public Optional<Assessoria> findById(@PathVariable @NotNull @Positive Long id){
        return assessoriaRepository.findById(id);   

    }

    public Assessoria create(@Valid Assessoria assessoria) {        
        return assessoriaRepository.save(assessoria);
    }

    public Optional<Assessoria> update(@Positive Long id, @Valid Assessoria assessoria) {
        return assessoriaRepository.findById(id)
                .map(recordFound -> {
                   recordFound.setDescricao(assessoria.getDescricao());
                   recordFound.setSigla(assessoria.getSigla());
                   recordFound.setOrdem(assessoria.getOrdem());
                   return assessoriaRepository.save(recordFound);
                   
                });               
    }

    public boolean delete(@PathVariable @NotNull @Positive Long id) {
        return assessoriaRepository.findById(id)
        .map(recordFound -> {
            assessoriaRepository.deleteById(id);
            return true;
         })
         .orElse(false);

    }
}

