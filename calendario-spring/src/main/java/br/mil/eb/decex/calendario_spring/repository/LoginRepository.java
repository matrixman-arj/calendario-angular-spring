package br.mil.eb.decex.calendario_spring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.mil.eb.decex.calendario_spring.modelo.Usuario;


public interface LoginRepository extends JpaRepository<Usuario, Long>{

	public Optional<Usuario> findByUsername(String login);
	
}
