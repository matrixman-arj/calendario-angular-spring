package br.mil.eb.decex.calendario_spring.dto;

import org.springframework.data.domain.Page;

import br.mil.eb.decex.calendario_spring.modelo.VideoConferencia;

import java.util.List;

public class VideoConferenciaPageDTO {
    private List<VideoConferenciaDTO> videoConferencias;
    private long totalElements;
    private int totalPages;

    public VideoConferenciaPageDTO(List<VideoConferenciaDTO> videoConferencias, long totalElements, int totalPages) {
        this.videoConferencias = videoConferencias;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<VideoConferenciaDTO> getVideoConferencias() {
        return videoConferencias;
    }

    public void setVideoConferencias(List<VideoConferenciaDTO> videoConferencias) {
        this.videoConferencias = videoConferencias;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

     
}
