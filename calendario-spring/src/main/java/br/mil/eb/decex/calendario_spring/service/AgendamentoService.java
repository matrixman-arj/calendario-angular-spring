package br.mil.eb.decex.calendario_spring.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.mil.eb.decex.calendario_spring.dto.AgendamentoDTO;
import br.mil.eb.decex.calendario_spring.dto.AgendamentoPageDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.AgendamentoMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Agendamento;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.AgendamentoRepository;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;    
    private final AgendamentoMapper agendamentoMapper;
    private final PessoaRepository pessoaRepository;
    private final AssessoriaRepository assessoriaRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository,                              
                              AgendamentoMapper agendamentoMapper,
                              PessoaRepository pessoaRepository,
                              AssessoriaRepository assessoriaRepository

                              
                              ) {
        
        this.agendamentoRepository = agendamentoRepository;        
        this.agendamentoMapper = agendamentoMapper;
        this.pessoaRepository = pessoaRepository;
        this.assessoriaRepository = assessoriaRepository;
    }

    public List<AgendamentoDTO> list() {
        return agendamentoRepository.findAll()
                .stream()
                .map(agendamentoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AgendamentoPageDTO search(String termo, @PositiveOrZero int page, @Positive @Max(100) int pageSize) {
        Page<Agendamento> pageAgendamento = agendamentoRepository.findByAssessoria(termo, PageRequest.of(page, pageSize));
        
        List<AgendamentoDTO> agendamentos = pageAgendamento.get()
            .map(agendamento -> agendamentoMapper.toDTO(agendamento))
            .collect(Collectors.toList());
        
        return new AgendamentoPageDTO(agendamentos, pageAgendamento.getTotalElements(), pageAgendamento.getTotalPages());
    }


    public AgendamentoPageDTO search2( LocalDate dataInicio, LocalDate dataFim, int page, int pageSize) {
        
    
        Page<Agendamento> pageAgendamento = agendamentoRepository.findByDates(
             dataInicio, dataFim, PageRequest.of(page, pageSize)
        );
    
        List<AgendamentoDTO> agendamentos = pageAgendamento.get()
            .map(agendamentoMapper::toDTO)
            .collect(Collectors.toList());
    
        return new AgendamentoPageDTO(agendamentos, pageAgendamento.getTotalElements(), pageAgendamento.getTotalPages());
    }
    
    

    public AgendamentoDTO findById(@NotNull @Positive Long id){
        return agendamentoRepository.findById(id)
            .map(agendamentoMapper::toDTO)
            .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public AgendamentoDTO create(@Valid @NotNull AgendamentoDTO agendamentoDTO) {
        // Verifique se a pessoa existe
        Pessoa pessoa = pessoaRepository.findById(agendamentoDTO.pessoa().getId())
                .orElseThrow(() -> new RecordNotFoundException(agendamentoDTO.pessoa().getId()));
    
        // Verifique se a assessoria existe
        Assessoria assessoria = assessoriaRepository.findById(agendamentoDTO.assessoria().getId())
                .orElseThrow(() -> new RecordNotFoundException(agendamentoDTO.assessoria().getId()));
    
        // Mapeie o DTO para a entidade Agendamento
        Agendamento agendamento = agendamentoMapper.toEntity(agendamentoDTO);
        
        // Associe as entidades que já estão salvas
        agendamento.setPessoa(pessoa);
        agendamento.setAssessoria(assessoria);
    
        // Salve o agendamento
        return agendamentoMapper.toDTO(agendamentoRepository.save(agendamento));
    }
    

    

    public AgendamentoDTO update(@NotNull @Positive Long id, @Valid AgendamentoDTO agendamento) {
        return agendamentoRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setDataInicio(agendamento.dataInicio());
                    recordFound.setDataFim(agendamento.dataFim());
                    recordFound.setHoraInicio(agendamento.horaInicio());
                    recordFound.setHoraFim(agendamento.horaFim());
                    recordFound.setPessoa(agendamento.pessoa());
                    recordFound.setAssessoria(agendamento.assessoria());
                    recordFound.setAcessorios(agendamento.acessorios());
                    recordFound.setAudiencia(agendamento.audiencia());
                    recordFound.setEvento(agendamento.evento());
                    recordFound.setDiex(agendamento.diex());                   
                    recordFound.setMilitarLigacao(agendamento.militarLigacao());

                    return agendamentoMapper.toDTO(agendamentoRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    } 

    public void delete(@NotNull @Positive Long id) {

        agendamentoRepository.delete(agendamentoRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }
}
