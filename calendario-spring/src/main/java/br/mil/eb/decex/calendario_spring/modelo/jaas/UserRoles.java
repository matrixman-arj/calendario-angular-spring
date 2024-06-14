package br.mil.eb.decex.calendario_spring.modelo.jaas;

import java.io.Serializable;

import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import br.mil.eb.decex.calendario_spring.modelo.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

/**
 * Perfis do usuário JAAS. ADMINISTRADOR e/ou USUARIO
 * 
 * @author <b>Vanilton</b> Gomes dos Santos - 2º Sgt QE
 * @version 1.0
 */
@Entity
@NamedQueries({
	@NamedQuery(name="userRoles.poruserName",
		query="SELECT q FROM UserRoles q WHERE q.users.name = :users")
})
@Table(name="user_roles")
public class UserRoles extends BaseModel<Long> implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne
	@JoinColumn(name="user_name")	
	private Users users;
	
	@Id
	@Column(name="role_name")
	@Enumerated(EnumType.STRING)
	private TipoAcesso roleName;

	/**
	 * Usuário JAAS
	 * @return usuario JAAS
	 */
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
	}

	/**
	 * Tipo de perfil. USUARIO e/ou ADMINISTRADOR
	 * @return perfil do usuário
	 */
	public TipoAcesso getRoleName() {
		return roleName;
	}
	public void setRoleName(TipoAcesso roleName) {
		this.roleName = roleName;
	}
	
	/**
	 * Propriedade não utilizada
	 */
	@Override
	public Long getId() {
		return null;
	}
	
	public UserRoles() {
		
	}
	
	public UserRoles(Users users, TipoAcesso roleName) {
		this.users = users;
		this.roleName = roleName;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((roleName == null) ? 0 : roleName.hashCode());
		result = prime * result + ((users == null) ? 0 : users.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof UserRoles))
			return false;
		UserRoles other = (UserRoles) obj;
		if (getRoleName() != other.getRoleName())
			return false;
		if (getUsers() == null) {
			if (other.getUsers() != null)
				return false;
		} else if (!getUsers().equals(other.getUsers()))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "UserRoles [users=" + users + ", roleName=" + roleName + "]";
	}
}