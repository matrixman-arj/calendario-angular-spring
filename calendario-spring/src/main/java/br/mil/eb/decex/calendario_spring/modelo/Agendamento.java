package br.mil.eb.decex.calendario_spring.modelo;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import br.mil.eb.decex.calendario_spring.enumerado.Acessorios;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotNull;

@Entity
public class Agendamento {

    @Id
    @SequenceGenerator(name = "AGENDAMENTO_ID_GENERATOR", sequenceName = "AGENDAMENTO_ID_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "AGENDAMENTO_ID_GENERATOR")
    @JsonProperty("_id")
    private Long id;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate data;

    @NotNull
    private LocalTime horaInicio;

    @NotNull
    private LocalTime horaFim;

    @ManyToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;

    @ManyToOne
    @JoinColumn(name = "assessoria_id")
    private Assessoria assessoria;

    @ElementCollection(targetClass = Acessorios.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "agendamento_acessorios", joinColumns = @JoinColumn(name = "agendamento_id"))
    @Column
    private Set<Acessorios> acessorios;

    private String audiencia;

    private String evento;

    private String diex;

    private String militarLigacao;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFim() {
        return horaFim;
    }

    public void setHoraFim(LocalTime horaFim) {
        this.horaFim = horaFim;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Assessoria getAssessoria() {
        return assessoria;
    }

    public void setAssessoria(Assessoria assessoria) {
        this.assessoria = assessoria;
    }

    public Set<Acessorios> getAcessorios() {
        return acessorios;
    }

    public void setAcessorios(Set<Acessorios> acessorios) {
        this.acessorios = acessorios;
    }
       

    public String getAudiencia() {
        return audiencia;
    }

    public void setAudiencia(String audiencia) {
        this.audiencia = audiencia;
    }

    public String getEvento() {
        return evento;
    }

    public void setEvento(String evento) {
        this.evento = evento;
    }

    public String getDiex() {
        return diex;
    }

    public void setDiex(String diex) {
        this.diex = diex;
    }

    public String getMilitarLigacao() {
        return militarLigacao;
    }

    public void setMilitarLigacao(String militarLigacao) {
        this.militarLigacao = militarLigacao;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((data == null) ? 0 : data.hashCode());
        result = prime * result + ((horaInicio == null) ? 0 : horaInicio.hashCode());
        result = prime * result + ((horaFim == null) ? 0 : horaFim.hashCode());
        result = prime * result + ((pessoa == null) ? 0 : pessoa.hashCode());
        result = prime * result + ((assessoria == null) ? 0 : assessoria.hashCode());
        result = prime * result + ((acessorios == null) ? 0 : acessorios.hashCode());
        result = prime * result + ((audiencia == null) ? 0 : audiencia.hashCode());
        result = prime * result + ((evento == null) ? 0 : evento.hashCode());
        result = prime * result + ((diex == null) ? 0 : diex.hashCode());
        result = prime * result + ((militarLigacao == null) ? 0 : militarLigacao.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Agendamento other = (Agendamento) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (data == null) {
            if (other.data != null)
                return false;
        } else if (!data.equals(other.data))
            return false;
        if (horaInicio == null) {
            if (other.horaInicio != null)
                return false;
        } else if (!horaInicio.equals(other.horaInicio))
            return false;
        if (horaFim == null) {
            if (other.horaFim != null)
                return false;
        } else if (!horaFim.equals(other.horaFim))
            return false;
        if (pessoa == null) {
            if (other.pessoa != null)
                return false;
        } else if (!pessoa.equals(other.pessoa))
            return false;
        if (assessoria == null) {
            if (other.assessoria != null)
                return false;
        } else if (!assessoria.equals(other.assessoria))
            return false;
        if (acessorios == null) {
            if (other.acessorios != null)
                return false;
        } else if (!acessorios.equals(other.acessorios))
            return false;
        if (audiencia == null) {
            if (other.audiencia != null)
                return false;
        } else if (!audiencia.equals(other.audiencia))
            return false;
        if (evento == null) {
            if (other.evento != null)
                return false;
        } else if (!evento.equals(other.evento))
            return false;
        if (diex == null) {
            if (other.diex != null)
                return false;
        } else if (!diex.equals(other.diex))
            return false;
        if (militarLigacao == null) {
            if (other.militarLigacao != null)
                return false;
        } else if (!militarLigacao.equals(other.militarLigacao))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Agendamento [id=" + id + ", data=" + data + ", horaInicio=" + horaInicio + ", horaFim=" + horaFim
                + ", pessoa=" + pessoa + ", assessoria=" + assessoria + ", acessorios=" + acessorios + ", audiencia="
                + audiencia + ", evento=" + evento + ", diex=" + diex + ", militarLigacao=" + militarLigacao + "]";
    }

    
    

    
}
