package br.mil.eb.decex.calendario_spring.dto;

import java.util.List;

public class AuditorioPageDTO {
    private List<AuditorioDTO> auditorios;
    private long totalElements;
    private int totalPages;

    public AuditorioPageDTO(List<AuditorioDTO> auditorios, long totalElements, int totalPages) {
        this.auditorios = auditorios;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<AuditorioDTO> getAuditorios() {
        return auditorios;
    }

    public void setAuditorios(List<AuditorioDTO> auditorios) {
        this.auditorios = auditorios;
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
