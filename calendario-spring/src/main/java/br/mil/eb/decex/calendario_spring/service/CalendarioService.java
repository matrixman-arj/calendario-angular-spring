package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.mil.eb.decex.calendario_spring.dto.AgendamentoDTO;
import br.mil.eb.decex.calendario_spring.dto.CalendarioDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.AgendamentoMapper;
import br.mil.eb.decex.calendario_spring.dto.mapper.CalendarioMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Agendamento;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Calendario;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.AgendamentoRepository;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.repository.CalendarioRepository;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CalendarioService {

    private final CalendarioRepository calendarioRepository;    
    private final CalendarioMapper calendarioMapper;
    private final PessoaRepository pessoaRepository;
    private final AssessoriaRepository assessoriaRepository;

    public CalendarioService(CalendarioRepository calendarioRepository,                              
                              CalendarioMapper calendarioMapper,
                              PessoaRepository pessoaRepository,
                              AssessoriaRepository assessoriaRepository

                              
                              ) {
        
        this.calendarioRepository = calendarioRepository;        
        this.calendarioMapper = calendarioMapper;
        this.pessoaRepository = pessoaRepository;
        this.assessoriaRepository = assessoriaRepository;
    }

    public List<CalendarioDTO> list() {
        return calendarioRepository.findAll()
                .stream()
                .map(calendarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CalendarioDTO findById(@NotNull @Positive Long id){
        return calendarioRepository.findById(id)
            .map(calendarioMapper::toDTO)
            .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public CalendarioDTO create(@Valid @NotNull CalendarioDTO calendarioDTO) {
        // Verifique se a pessoa existe
        Pessoa pessoa = pessoaRepository.findById(calendarioDTO.pessoa().getId())
                .orElseThrow(() -> new RecordNotFoundException(calendarioDTO.pessoa().getId()));
    
        // Verifique se a assessoria existe
        Assessoria assessoria = assessoriaRepository.findById(calendarioDTO.assessoria().getId())
                .orElseThrow(() -> new RecordNotFoundException(calendarioDTO.assessoria().getId()));
    
        // Mapeie o DTO para a entidade Agendamento
        Calendario calendario = calendarioMapper.toEntity(calendarioDTO);
        
        // Associe as entidades que já estão salvas
        calendario.setPessoa(pessoa);
        calendario.setAssessoria(assessoria);
    
        // Salve o agendamento
        return calendarioMapper.toDTO(calendarioRepository.save(calendario));
    }
    

    // public AgendamentoDTO create(@Valid @NotNull AgendamentoDTO agendamento) {        
    //     return agendamentoMapper.toDTO(agendamentoRepository.save(agendamentoMapper.toEntity(agendamento)));
    // }

    public CalendarioDTO update(@NotNull @Positive Long id, @Valid CalendarioDTO calendario) {
        return calendarioRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setData(calendario.data());
                    recordFound.setHoraInicio(calendario.horaInicio());
                    recordFound.setHoraFim(calendario.horaFim());
                    recordFound.setPessoa(calendario.pessoa());
                    recordFound.setAssessoria(calendario.assessoria());
                    recordFound.setAcessorios(calendario.acessorios());
                    recordFound.setAudiencia(calendario.audiencia());
                    recordFound.setEvento(calendario.evento());
                    recordFound.setDiex(calendario.diex());                   
                    recordFound.setMilitarLigacao(calendario.militarLigacao());

                    return calendarioMapper.toDTO(calendarioRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    } 

    public void delete(@NotNull @Positive Long id) {

        calendarioRepository.delete(calendarioRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }
}
