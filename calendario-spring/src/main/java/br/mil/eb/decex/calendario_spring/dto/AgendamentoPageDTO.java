package br.mil.eb.decex.calendario_spring.dto;

import org.springframework.data.domain.Page;

import br.mil.eb.decex.calendario_spring.modelo.Agendamento;

import java.util.List;

public class AgendamentoPageDTO {

    private List<Agendamento> content;
    private int currentPage;
    private int totalPages;
    private long totalElements;

    // Construtor a partir de um Page<Agendamento>
    public AgendamentoPageDTO(Page<Agendamento> page) {
        this.content = page.getContent();
        this.currentPage = page.getNumber();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
    }

    // Getters e setters
    public List<Agendamento> getContent() {
        return content;
    }

    public void setContent(List<Agendamento> content) {
        this.content = content;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }
}
