package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.mil.eb.decex.calendario_spring.dto.AgendamentoDTO;
import br.mil.eb.decex.calendario_spring.dto.PessoaDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.AgendamentoMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Agendamento;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.AgendamentoRepository;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PessoaRepository pessoaRepository;
    private final AssessoriaRepository assessoriaRepository;
    private final AgendamentoMapper agendamentoMapper;

    public AgendamentoService(AgendamentoRepository agendamentoRepository,
                              PessoaRepository pessoaRepository,
                              AssessoriaRepository assessoriaRepository,
                              AgendamentoMapper agendamentoMapper) {
        this.agendamentoRepository = agendamentoRepository;
        this.pessoaRepository = pessoaRepository;
        this.assessoriaRepository = assessoriaRepository;
        this.agendamentoMapper = agendamentoMapper;
    }

    public List<AgendamentoDTO> list() {
        return agendamentoRepository.findAll()
                .stream()
                .map(agendamentoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AgendamentoDTO findById(@NotNull @Positive Long id){
        return agendamentoRepository.findById(id)
            .map(agendamentoMapper::toDTO)
            .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public AgendamentoDTO create(@Valid @NotNull AgendamentoDTO agendamentoDTO) {
        Pessoa pessoa = pessoaRepository.findById(agendamentoDTO.pessoa().getId())
                .orElseThrow(() -> new RecordNotFoundException(agendamentoDTO.pessoa().getId()));

        Assessoria assessoria = assessoriaRepository.findById(agendamentoDTO.assessoria().getId())
                .orElseThrow(() -> new RecordNotFoundException(agendamentoDTO.assessoria().getId()));

        Agendamento agendamento = agendamentoMapper.toEntity(agendamentoDTO);
        agendamento.setPessoa(pessoa);
        agendamento.setAssessoria(assessoria);

        return agendamentoMapper.toDTO(agendamentoRepository.save(agendamento));
    }

    public AgendamentoDTO update(@NotNull @Positive Long id, @Valid AgendamentoDTO agendamento) {
        return agendamentoRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setData(agendamento.data());
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

    // Métodos para update e delete, se necessário
}
