package br.mil.eb.decex.calendario_spring.dto.mapper;

import org.springframework.stereotype.Component;

import br.mil.eb.decex.calendario_spring.dto.AuditorioDTO;
import br.mil.eb.decex.calendario_spring.modelo.Auditorio;

@Component
public class AuditorioMapper {

    public AuditorioDTO toDTO(Auditorio auditorio){

    if (auditorio == null) {
        return null;
    }
    return new AuditorioDTO(auditorio.getId(), auditorio.getAssessoria(),                                 
                                  auditorio.getPessoa(), auditorio.getDataInicio(),
                                  auditorio.getDataFim(), auditorio.getHoraInicio(), 
                                  auditorio.getHoraFim(), auditorio.getAcessorios(), 
                                  auditorio.getAudiencia(), auditorio.getEvento(), 
                                  auditorio.getDiex(), auditorio.getMilitarLigacao());
    }

    public Auditorio toEntity(AuditorioDTO auditorioDTO){

        if (auditorioDTO == null) {
            return null;
        }

        Auditorio auditorio = new Auditorio();
        if (auditorioDTO.id() != null) {
            auditorio.setId(auditorioDTO.id());            
        }
        auditorio.setAssessoria(auditorioDTO.assessoria());
        auditorio.setPessoa(auditorioDTO.pessoa());
        auditorio.setDataInicio(auditorioDTO.dataInicio());
        auditorio.setDataFim(auditorioDTO.dataFim());
        auditorio.setHoraInicio(auditorioDTO.horaInicio());
        auditorio.setHoraFim(auditorioDTO.horaFim());
        auditorio.setAcessorios(auditorioDTO.acessorios());
        auditorio.setAudiencia(auditorioDTO.audiencia());
        auditorio.setEvento(auditorioDTO.evento());
        auditorio.setDiex(auditorioDTO.diex());
        auditorio.setMilitarLigacao(auditorioDTO.militarLigacao());

        // Adicione logs para verificar o estado da entidade
        //System.out.println("Auditorio a ser salvo: " + auditorio);


        return auditorio;
    }

}
