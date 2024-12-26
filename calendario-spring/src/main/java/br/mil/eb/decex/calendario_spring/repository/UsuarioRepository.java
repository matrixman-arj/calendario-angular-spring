package br.mil.eb.decex.calendario_spring.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.mil.eb.decex.calendario_spring.modelo.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Usando @Query para pesquisa por Usuário ativo e UserName ou Role
    @Query("SELECT u FROM Usuario u " +
    "WHERE u.liberado = true " +
    "AND (" +
    "LOWER(u.username) LIKE LOWER(CONCAT('%', :termo, '%')) " +
    "OR LOWER(u.role) LIKE LOWER(CONCAT('%', :termo, '%')) " +
    ") " +
    "ORDER BY u.username")
    Page<Usuario> findByUsernameOrRoleAndLiberadoTrue(@Param("termo") String termo, Pageable pageable);

    @Query("SELECT u FROM Usuario u " +
    "WHERE u.liberado = false " +
    "AND (" +
    "LOWER(u.username) LIKE LOWER(CONCAT('%', :termo, '%')) " +
    "OR LOWER(u.role) LIKE LOWER(CONCAT('%', :termo, '%')) " +
    ") " +
    "ORDER BY u.username")
    Page<Usuario> findByUsernameOrRoleAndLiberadoFalse(@Param("termo") String termo, Pageable pageable);

    // @Query("SELECT u FROM Usuario u WHERE u.liberado = false")
    // Page<Usuario> findInativos(Pageable pageable);

    // Método personalizado para buscar o usuário pelo username
    Optional<Usuario> findByUsername(String username);
}

