package br.mil.eb.decex.calendario_spring.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.mil.eb.decex.calendario_spring.dto.VideoConferenciaDTO;
import br.mil.eb.decex.calendario_spring.dto.VideoConferenciaPageDTO;
import br.mil.eb.decex.calendario_spring.dto.PessoaDTO;
import br.mil.eb.decex.calendario_spring.dto.PessoaPageDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.VideoConferenciaMapper;
import br.mil.eb.decex.calendario_spring.enumerado.Acessorios;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.VideoConferencia;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.VideoConferenciaRepository;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@Service
public class VideoConferenciaService {

    private final VideoConferenciaRepository videoConferenciaRepository;    
    private final VideoConferenciaMapper videoConferenciaMapper;
    private final PessoaRepository pessoaRepository;
    private final AssessoriaRepository assessoriaRepository;

    public VideoConferenciaService(VideoConferenciaRepository videoConferenciaRepository,                              
                              VideoConferenciaMapper videoConferenciaMapper,
                              PessoaRepository pessoaRepository,
                              AssessoriaRepository assessoriaRepository

                              
                              ) {
        
        this.videoConferenciaRepository = videoConferenciaRepository;        
        this.videoConferenciaMapper = videoConferenciaMapper;
        this.pessoaRepository = pessoaRepository;
        this.assessoriaRepository = assessoriaRepository;
    }

    public List<VideoConferenciaDTO> list() {
        return videoConferenciaRepository.findAll()
                .stream()
                .map(videoConferenciaMapper::toDTO)
                .collect(Collectors.toList());
    }

    public VideoConferenciaPageDTO search(String termo, @PositiveOrZero int page, @Positive @Max(100) int pageSize) {
        Page<VideoConferencia> pageVideoConferencia = videoConferenciaRepository.findByAssessoria(termo, PageRequest.of(page, pageSize));
        
        List<VideoConferenciaDTO> videoConferencias = pageVideoConferencia.get()
            .map(videoConferencia -> videoConferenciaMapper.toDTO(videoConferencia))
            .collect(Collectors.toList());
        
        return new VideoConferenciaPageDTO(videoConferencias, pageVideoConferencia.getTotalElements(), pageVideoConferencia.getTotalPages());
    }
    

    public VideoConferenciaDTO findById(@NotNull @Positive Long id){
        return videoConferenciaRepository.findById(id)
            .map(videoConferenciaMapper::toDTO)
            .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public VideoConferenciaDTO create(@Valid @NotNull VideoConferenciaDTO videoConferenciaDTO) {
        // Verifique se a pessoa existe
        Pessoa pessoa = pessoaRepository.findById(videoConferenciaDTO.pessoa().getId())
                .orElseThrow(() -> new RecordNotFoundException(videoConferenciaDTO.pessoa().getId()));
    
        // Verifique se a assessoria existe
        Assessoria assessoria = assessoriaRepository.findById(videoConferenciaDTO.assessoria().getId())
                .orElseThrow(() -> new RecordNotFoundException(videoConferenciaDTO.assessoria().getId()));
    
        // Mapeie o DTO para a entidade VideoConferencia
        VideoConferencia videoConferencia = videoConferenciaMapper.toEntity(videoConferenciaDTO);
        
        // Associe as entidades que já estão salvas
        videoConferencia.setPessoa(pessoa);
        videoConferencia.setAssessoria(assessoria);
    
        // Salve o videoConferencia
        return videoConferenciaMapper.toDTO(videoConferenciaRepository.save(videoConferencia));
    }
    

    // public VideoConferenciaDTO create(@Valid @NotNull VideoConferenciaDTO videoConferencia) {        
    //     return videoConferenciaMapper.toDTO(videoConferenciaRepository.save(videoConferenciaMapper.toEntity(videoConferencia)));
    // }

    public VideoConferenciaDTO update(@NotNull @Positive Long id, @Valid VideoConferenciaDTO videoConferencia) {
        return videoConferenciaRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setDataInicio(videoConferencia.dataInicio());
                    recordFound.setDataFim(videoConferencia.dataFim());
                    recordFound.setHoraInicio(videoConferencia.horaInicio());
                    recordFound.setHoraFim(videoConferencia.horaFim());
                    recordFound.setPessoa(videoConferencia.pessoa());
                    recordFound.setAssessoria(videoConferencia.assessoria());
                    recordFound.setAcessorios(videoConferencia.acessorios());
                    recordFound.setAudiencia(videoConferencia.audiencia());
                    recordFound.setEvento(videoConferencia.evento());
                    recordFound.setDiex(videoConferencia.diex());                   
                    recordFound.setMilitarLigacao(videoConferencia.militarLigacao());

                    return videoConferenciaMapper.toDTO(videoConferenciaRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    } 

    public void delete(@NotNull @Positive Long id) {

        videoConferenciaRepository.delete(videoConferenciaRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }
}
