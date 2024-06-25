package br.mil.eb.decex.calendario_spring.modelo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.mil.eb.decex.calendario_spring.converter.AssessoriaConverter;
import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import br.mil.eb.decex.calendario_spring.modelo.jaas.Users;
import br.mil.eb.decex.calendario_spring.util.EncodingSHA256;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Transient;



@Entity
/*@NamedQuery(
    name = "todas.pessoas",
    query = "SELECT DISTINCT p FROM Pessoa p WHERE p.liberado = TRUE ORDER BY p.postoGraduacao, p.antiguidade"
) @NamedQuery(
    name = "todos.bloqueados",
    query = "SELECT DISTINCT p FROM Pessoa p WHERE p.liberado = FALSE ORDER BY p.postoGraduacao, p.antiguidade"
) @NamedQuery(
    name = "pessoas.ComAssessoria",
    query = "SELECT p FROM Pessoa p JOIN FETCH p.assessoria"
) @NamedQuery(
    name = "Pessoa.comSecao",
    query = "SELECT p FROM Pessoa p WHERE p.assessoria = :assessoria or p.assessoria.assessoriaPai = :assessoria"
)*/

public class Pessoa {

    @Id
	@SequenceGenerator(name="PESSOA_ID_GENERATOR", sequenceName="PESSOA_ID_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PESSOA_ID_GENERATOR")	
	@JsonProperty("_id")
	private Long id;
		
	@Column(unique=true)
	private String identidade;
	
	@Transient
	private Users users;
	
	@Transient
	private List<TipoAcesso> listaTipoAcesso;
	
	@Column
	private String nome;
	
	@Column
	private String nomeGuerra;
	
	@Enumerated(EnumType.STRING)
	private PostoGraduacao postoGraduacao;
		
	@ManyToOne
	@Convert(converter = AssessoriaConverter.class)
	@JoinColumn(name="assessoria_id")
	private Assessoria assessoria;
	
	@Column
	private Boolean liberado;
		
	public Pessoa(){
		liberado = Boolean.FALSE;
	}
	
	@Transient
	@Enumerated(EnumType.STRING)
	private TipoAcesso tipoAcesso;

	@Column
    private String ramal;
    
    @Column
    private String caminho;

	private String antiguidade;

/**
	 * Identificador de tabela. Código sequencial
	 * @return chave primária da ação orçamentária 
	 */	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Identidade do militar
	 * @return identidade do militar 
	 */	
	public String getIdentidade() {
		return identidade;
	}
	public void setIdentidade(String identidade) {
		this.identidade = identidade;
	}

	/**
	 * Nome do militar
	 * @return nome do militar 
	 */
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
	 * Nome de guerra do militar
	 * @return nome de guerra do militar
	 */
	public String getNomeGuerra() {
		return nomeGuerra;
	}
	public void setNomeGuerra(String nomeGuerra) {
		this.nomeGuerra = nomeGuerra;
	}

	/**
	 * Posto/Graduação do militar
	 * @return posto/graduação do militar
	 */
	public PostoGraduacao getPostoGraduacao() {
		return postoGraduacao;
	}
	public void setPostoGraduacao(PostoGraduacao postoGraduacao) {
		this.postoGraduacao = postoGraduacao;
	}
	
	/**
	 * Assessoria atual do usuário
	 * @return assessoria do usuário
	 */
	public Assessoria getAssessoria() {		
		return assessoria;		
	}	
	public void setAssessoria(Assessoria assessoria) {
		this.assessoria = assessoria;
	}
		
	/**
	 * Indica liberação para acesso ao sistema
	 * @return true-> Acesso liberado <br/>false-> Acesso negado
	 */
	public Boolean getLiberado() {
		return liberado;
	}
	public void setLiberado(Boolean liberado) {
		this.liberado = liberado;
	}	

	/**
	 * Lista com os perfis do usuário
	 */
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
	}

	public List<TipoAcesso> getListaTipoAcesso() {
		if (listaTipoAcesso == null){
			listaTipoAcesso = new ArrayList<TipoAcesso>();
		}
		
		return listaTipoAcesso;
	}
	public void setListaTipoAcesso(List<TipoAcesso> listaTipoAcesso) {
		this.listaTipoAcesso = listaTipoAcesso;
	}


	public TipoAcesso getTipoAcesso() {
		return tipoAcesso;
	}
	public void setTipoAcesso(TipoAcesso tipoAcesso) {
		this.tipoAcesso = tipoAcesso;
	}

	public String getRamal() {
		return ramal;
	}
	public void setRamal(String ramal) {
		this.ramal = ramal;
	}

	public String getCaminho() {
		return caminho;
	}
	public void setCaminho(String caminho) {
		this.caminho = caminho;
	}

	public String getAntiguidade() {
		return antiguidade;
	}
	public void setAntiguidade(String antiguidade) {
		this.antiguidade = ramal;
	}

	/**
	 * Realiza parse para usuário JAAS. Na liberação do usuário 
	 * para acesso ao sistema, por convenção a senha será a identidade 
	 * criptografada
	 * 
	 * @return parse para usuário JAAS
	 */
	public Users parseUsers() {
		
		Users users = new Users();
		
		users.setName(identidade);
		users.addRole(TipoAcesso.USUARIO);
		users.setPass(EncodingSHA256.encodingBase64(identidade));
			
		return users;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((identidade == null) ? 0 : identidade.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Pessoa))
			return false;
            Pessoa other = (Pessoa) obj;
		if (getIdentidade() == null) {
			if (other.getIdentidade() != null)
				return false;
		} else if (!getIdentidade().equals(other.getIdentidade()))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Pessoa [identidade=" + identidade + ", nomeGuerra=" + nomeGuerra + "]";
	}	
}