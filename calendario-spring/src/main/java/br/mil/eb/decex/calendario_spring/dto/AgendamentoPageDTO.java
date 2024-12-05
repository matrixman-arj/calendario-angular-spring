package br.mil.eb.decex.calendario_spring.dto;

import java.util.List;

public class AgendamentoPageDTO {
    private List<AgendamentoDTO> agendamentos;
    private long totalElements;
    private int totalPages;

    public AgendamentoPageDTO(List<AgendamentoDTO> agendamentos, long totalElements, int totalPages) {
        this.agendamentos = agendamentos;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<AgendamentoDTO> getAgendamentos() {
        return agendamentos;
    }

    public void setAgendamentos(List<AgendamentoDTO> agendamentos) {
        this.agendamentos = agendamentos;
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
