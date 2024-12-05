package br.mil.eb.decex.calendario_spring.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.mil.eb.decex.calendario_spring.dto.AuditorioDTO;
import br.mil.eb.decex.calendario_spring.dto.AuditorioPageDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.AuditorioMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Auditorio;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.repository.AuditorioRepository;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@Service
public class AuditorioService {

    private final AuditorioRepository auditorioRepository;    
    private final AuditorioMapper auditorioMapper;
    private final PessoaRepository pessoaRepository;
    private final AssessoriaRepository assessoriaRepository;

    public AuditorioService(AuditorioRepository auditorioRepository,                              
                              AuditorioMapper auditorioMapper,
                              PessoaRepository pessoaRepository,
                              AssessoriaRepository assessoriaRepository

                              
                              ) {
        
        this.auditorioRepository = auditorioRepository;        
        this.auditorioMapper = auditorioMapper;
        this.pessoaRepository = pessoaRepository;
        this.assessoriaRepository = assessoriaRepository;
    }

    public List<AuditorioDTO> list() {
        return auditorioRepository.findAll()
                .stream()
                .map(auditorioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AuditorioPageDTO search(String termo, @PositiveOrZero int page, @Positive @Max(100) int pageSize) {
        Page<Auditorio> pageAuditorio = auditorioRepository.findByAssessoria(termo, PageRequest.of(page, pageSize));
        
        List<AuditorioDTO> auditorios = pageAuditorio.get()
            .map(auditorio -> auditorioMapper.toDTO(auditorio))
            .collect(Collectors.toList());
        
        return new AuditorioPageDTO(auditorios, pageAuditorio.getTotalElements(), pageAuditorio.getTotalPages());
    }

    public AuditorioPageDTO search2( LocalDate dataInicio, LocalDate dataFim, int page, int pageSize) {
        
    
        Page<Auditorio> pageAuditorio = auditorioRepository.findByDates(
             dataInicio, dataFim, PageRequest.of(page, pageSize)
        );
    
        List<AuditorioDTO> auditorios = pageAuditorio.get()
            .map(auditorioMapper::toDTO)
            .collect(Collectors.toList());
    
        return new AuditorioPageDTO(auditorios, pageAuditorio.getTotalElements(), pageAuditorio.getTotalPages());
    }
    

    public AuditorioDTO findById(@NotNull @Positive Long id){
        return auditorioRepository.findById(id)
            .map(auditorioMapper::toDTO)
            .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public AuditorioDTO create(@Valid @NotNull AuditorioDTO auditorioDTO) {
        // Verifique se a pessoa existe
        Pessoa pessoa = pessoaRepository.findById(auditorioDTO.pessoa().getId())
                .orElseThrow(() -> new RecordNotFoundException(auditorioDTO.pessoa().getId()));
    
        // Verifique se a assessoria existe
        Assessoria assessoria = assessoriaRepository.findById(auditorioDTO.assessoria().getId())
                .orElseThrow(() -> new RecordNotFoundException(auditorioDTO.assessoria().getId()));
    
        // Mapeie o DTO para a entidade Auditorio
        Auditorio auditorio = auditorioMapper.toEntity(auditorioDTO);
        
        // Associe as entidades que já estão salvas
        auditorio.setPessoa(pessoa);
        auditorio.setAssessoria(assessoria);
    
        // Salve o auditorio
        return auditorioMapper.toDTO(auditorioRepository.save(auditorio));
    }    

    public AuditorioDTO update(@NotNull @Positive Long id, @Valid AuditorioDTO auditorio) {
        return auditorioRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setDataInicio(auditorio.dataInicio());
                    recordFound.setDataFim(auditorio.dataFim());
                    recordFound.setHoraInicio(auditorio.horaInicio());
                    recordFound.setHoraFim(auditorio.horaFim());
                    recordFound.setPessoa(auditorio.pessoa());
                    recordFound.setAssessoria(auditorio.assessoria());
                    recordFound.setAcessorios(auditorio.acessorios());
                    recordFound.setAudiencia(auditorio.audiencia());
                    recordFound.setEvento(auditorio.evento());
                    recordFound.setDiex(auditorio.diex());                   
                    recordFound.setMilitarLigacao(auditorio.militarLigacao());

                    return auditorioMapper.toDTO(auditorioRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    } 

    public void delete(@NotNull @Positive Long id) {

        auditorioRepository.delete(auditorioRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }
}
