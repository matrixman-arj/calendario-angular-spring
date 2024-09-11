package br.mil.eb.decex.calendario_spring.dto.mapper;

import org.springframework.stereotype.Component;

import br.mil.eb.decex.calendario_spring.dto.AgendamentoDTO;
import br.mil.eb.decex.calendario_spring.modelo.Agendamento;

@Component
public class AgendamentoMapper {

    public AgendamentoDTO toDTO(Agendamento agendamento){

    if (agendamento == null) {
        return null;
    }
    return new AgendamentoDTO(agendamento.getId(), agendamento.getAssessoria(),                                 
                                  agendamento.getPessoa(), agendamento.getData(),
                                  agendamento.getHoraInicio(), agendamento.getHoraFim(),
                                  agendamento.getAcessorios(), agendamento.getAudiencia(),
                                  agendamento.getEvento(), agendamento.getDiex(), 
                                  agendamento.getMilitarLigacao());
    }

    public Agendamento toEntity(AgendamentoDTO agendamentoDTO){

        if (agendamentoDTO == null) {
            return null;
        }

        Agendamento agendamento = new Agendamento();
        if (agendamentoDTO != null) {
            agendamento.setId(agendamentoDTO.id());            
        }
        agendamento.setAssessoria(agendamentoDTO.assessoria());
        agendamento.setPessoa(agendamentoDTO.pessoa());
        agendamento.setData(agendamentoDTO.data());
        agendamento.setHoraInicio(agendamentoDTO.horaInicio());
        agendamento.setHoraFim(agendamentoDTO.horaFim());
        agendamento.setAcessorios(agendamentoDTO.acessorios());
        agendamento.setAudiencia(agendamentoDTO.audiencia());
        agendamento.setEvento(agendamentoDTO.evento());
        agendamento.setDiex(agendamentoDTO.diex());
        agendamento.setMilitarLigacao(agendamentoDTO.militarLigacao());
        return agendamento;
    }

}
