package br.mil.eb.decex.calendario_spring.modelo;

import java.io.Serializable;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.SequenceGenerator;

@Entity
/*
@NamedQuery(
    name = "Assessoria.semSecao",
    query = "SELECT a FROM Assessoria a WHERE a.assessoriaPai is null"
) @NamedQuery(
    name = "Assessoria.comSecao",
    query = "SELECT a FROM Assessoria a WHERE a.assessoriaPai = :secao"
)@NamedQuery(
	    name = "Assessoria.interna",
	    query = "SELECT a FROM Assessoria a WHERE a.interna = TRUE ORDER BY a.sigla ASC"
) */

public class Assessoria extends BaseModel<Long> implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @SequenceGenerator(name = "ASSESSORIA_ID_GENERATOR", sequenceName = "ASSESSORIA_ID_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "ASSESSORIA_ID_GENERATOR")
    private Long id;
    
    @Column
    private String sigla;
    
    @Column
    private String descricao;
	
    @ManyToOne
    @JoinColumn(name = "assessoria_pai_id")    
    private Assessoria assessoriaPai;
    
    /*@OneToMany(mappedBy = "assessoriaPai", cascade = {CascadeType.ALL})
    private List<Assessoria> secao = new ArrayList<>();
    */    
    
    @Column
    private int ordem;
    
    @Column
    private Boolean interna;
    
    public Assessoria() {
        this.interna = Boolean.FALSE;
    }    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

		/*
    public Assessoria getAssessoriaPai() {
        if (this.assessoriaPai == null) {
            this.assessoriaPai = new Assessoria();
        }

        return this.assessoriaPai;
    }

    public void setAssessoriaPai(Assessoria assessoriaPai) {
        this.assessoriaPai = assessoriaPai;
    }  
		 */ 

    public String getSigla() {
        return this.sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

	/* 
    public List<Assessoria> getSecao() {
        return this.secao;
    }

    public void setSecao(List<Assessoria> secao) {
        this.secao = secao;
    }
		*/

    public int getOrdem() {
        return this.ordem;
    }

    public void setOrdem(int ordem) {
        this.ordem = ordem;
    }    

    public Boolean isInterna() {
		return interna;
	}

	public void setInterna(Boolean interna) {
		this.interna = interna;
	}

	@SuppressWarnings("unused")
	public int hashCode() {
        boolean prime = true;
        int result = 1;
        return 31 * result + (this.id == null ? 0 : this.id.hashCode());
    }

    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else if (obj == null) {
            return false;
        } else if (this.getClass() != obj.getClass()) {
            return false;
        } else {
            Assessoria other = (Assessoria)obj;
            if (this.id == null) {
                if (other.id != null) {
                    return false;
                }
            } else if (!this.id.equals(other.id)) {
                return false;
            }

            return true;
        }
    }

    public String toString() {
        return "Assessoria [sigla=" + this.sigla + ", descricao=" + this.descricao + ", assessoriaPai=" + this.assessoriaPai +"]";
    }
}
