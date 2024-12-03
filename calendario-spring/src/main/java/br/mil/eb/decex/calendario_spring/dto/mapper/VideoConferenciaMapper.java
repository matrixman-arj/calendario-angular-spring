package br.mil.eb.decex.calendario_spring.dto.mapper;

import org.springframework.stereotype.Component;

import br.mil.eb.decex.calendario_spring.dto.VideoConferenciaDTO;
import br.mil.eb.decex.calendario_spring.modelo.VideoConferencia;

@Component
public class VideoConferenciaMapper {

    public VideoConferenciaDTO toDTO(VideoConferencia videoConferencia){

    if (videoConferencia == null) {
        return null;
    }
    return new VideoConferenciaDTO(videoConferencia.getId(), videoConferencia.getAssessoria(),                                 
                                  videoConferencia.getPessoa(), videoConferencia.getDataInicio(),
                                  videoConferencia.getDataFim(), videoConferencia.getHoraInicio(), 
                                  videoConferencia.getHoraFim(), videoConferencia.getAcessorios(), 
                                  videoConferencia.getAudiencia(), videoConferencia.getEvento(), 
                                  videoConferencia.getDiex(), videoConferencia.getMilitarLigacao());
    }

    public VideoConferencia toEntity(VideoConferenciaDTO videoConferenciaDTO){

        if (videoConferenciaDTO == null) {
            return null;
        }

        VideoConferencia videoConferencia = new VideoConferencia();
        if (videoConferenciaDTO.id() != null) {
            videoConferencia.setId(videoConferenciaDTO.id());            
        }
        videoConferencia.setAssessoria(videoConferenciaDTO.assessoria());
        videoConferencia.setPessoa(videoConferenciaDTO.pessoa());
        videoConferencia.setDataInicio(videoConferenciaDTO.dataInicio());
        videoConferencia.setDataFim(videoConferenciaDTO.dataFim());
        videoConferencia.setHoraInicio(videoConferenciaDTO.horaInicio());
        videoConferencia.setHoraFim(videoConferenciaDTO.horaFim());
        videoConferencia.setAcessorios(videoConferenciaDTO.acessorios());
        videoConferencia.setAudiencia(videoConferenciaDTO.audiencia());
        videoConferencia.setEvento(videoConferenciaDTO.evento());
        videoConferencia.setDiex(videoConferenciaDTO.diex());
        videoConferencia.setMilitarLigacao(videoConferenciaDTO.militarLigacao());

        // Adicione logs para verificar o estado da entidade
        //System.out.println("VideoConferencia a ser salvo: " + videoConferencia);


        return videoConferencia;
    }

}
