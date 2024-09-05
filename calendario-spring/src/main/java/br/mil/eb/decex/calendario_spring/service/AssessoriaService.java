package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import br.mil.eb.decex.calendario_spring.dto.AssessoriaDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.AssessoriaMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;

import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class AssessoriaService {

    private final AssessoriaRepository assessoriaRepository;
    private final AssessoriaMapper assessoriaMapper;

    public AssessoriaService(AssessoriaRepository assessoriaRepository, AssessoriaMapper assessoriaMapper) {
        this.assessoriaRepository = assessoriaRepository;
        this.assessoriaMapper = assessoriaMapper;
    } 
    
    public List<AssessoriaDTO> list() {
        return assessoriaRepository.findAll().stream().map(assessoriaMapper::toDTO)
                .collect(Collectors.toList());

    }

    public List<AssessoriaDTO> findFilhasByPaiId(Long assessoriaPaiId) {
        List<Assessoria> filhas = assessoriaRepository.findByAssessoriaPaiId(assessoriaPaiId);
        return filhas.stream()
                .map(assessoriaMapper::toDTO)
                .collect(Collectors.toList());
    }

     public AssessoriaDTO findById(@PathVariable @NotNull @Positive Long id){
        return assessoriaRepository.findById(id).map(assessoriaMapper::toDTO)
                .orElseThrow(() ->  new RecordNotFoundException(id)); 
     }
     
    public AssessoriaDTO create(@Valid Assessoria assessoria) {        
        return assessoriaMapper.toDTO(assessoriaRepository.save(assessoria));
    }

    public AssessoriaDTO update(@Positive Long id, @Valid Assessoria assessoria) {
        return assessoriaRepository.findById(id)
                .map(recordFound -> {
                   recordFound.setDescricao(assessoria.getDescricao());
                   recordFound.setSigla(assessoria.getSigla());
                   recordFound.setOrdem(assessoria.getOrdem());
                   return assessoriaMapper.toDTO(assessoriaRepository.save(assessoria));
                   
                }).orElseThrow(() ->  new RecordNotFoundException(id));               
    }

   
    public void delete(@PathVariable @NotNull @Positive Long id) {

        assessoriaRepository.delete(assessoriaRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }

}

