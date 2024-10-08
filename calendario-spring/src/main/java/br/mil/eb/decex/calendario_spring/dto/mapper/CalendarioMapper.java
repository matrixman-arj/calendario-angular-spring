package br.mil.eb.decex.calendario_spring.dto.mapper;

import org.springframework.stereotype.Component;

import br.mil.eb.decex.calendario_spring.dto.AgendamentoDTO;
import br.mil.eb.decex.calendario_spring.dto.CalendarioDTO;
import br.mil.eb.decex.calendario_spring.modelo.Agendamento;
import br.mil.eb.decex.calendario_spring.modelo.Calendario;

@Component
public class CalendarioMapper {

    public CalendarioDTO toDTO(Calendario calendario){

    if (calendario == null) {
        return null;
    }
    return new CalendarioDTO(calendario.getId(), calendario.getAssessoria(),                                 
    calendario.getPessoa(), calendario.getData(),
    calendario.getHoraInicio(), calendario.getHoraFim(),
    calendario.getAcessorios(), calendario.getAudiencia(),
    calendario.getEvento(), calendario.getDiex(), 
    calendario.getMilitarLigacao());
    }

    public Calendario toEntity(CalendarioDTO calendarioDTO){

        if (calendarioDTO == null) {
            return null;
        }

        Calendario calendario = new Calendario();
        if (calendarioDTO.id() != null) {
            calendario.setId(calendarioDTO.id());            
        }
        calendario.setAssessoria(calendarioDTO.assessoria());
        calendario.setPessoa(calendarioDTO.pessoa());
        calendario.setData(calendarioDTO.data());
        calendario.setHoraInicio(calendarioDTO.horaInicio());
        calendario.setHoraFim(calendarioDTO.horaFim());
        calendario.setAcessorios(calendarioDTO.acessorios());
        calendario.setAudiencia(calendarioDTO.audiencia());
        calendario.setEvento(calendarioDTO.evento());
        calendario.setDiex(calendarioDTO.diex());
        calendario.setMilitarLigacao(calendarioDTO.militarLigacao());

        // Adicione logs para verificar o estado da entidade
        //System.out.println("Agendamento a ser salvo: " + agendamento);


        return calendario;
    }

}
