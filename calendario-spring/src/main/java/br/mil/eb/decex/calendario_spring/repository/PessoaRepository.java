package br.mil.eb.decex.calendario_spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.mil.eb.decex.calendario_spring.modelo.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    // Usando @Query para pesquisa por nome de guerra ou assessoria
    @Query("SELECT p FROM Pessoa p " +
    "WHERE LOWER(p.nomeGuerra) LIKE LOWER(CONCAT('%', :termo, '%')) " +
    "OR LOWER(p.assessoria.sigla) LIKE LOWER(CONCAT('%', :termo, '%')) " +
    "ORDER BY  p.postoGraduacaoOrdinal"
    )
    Page<Pessoa> findByNomeGuerraOrAssessoria(String termo, Pageable pageable);

    // Ou método derivado
    Page<Pessoa> findByNomeGuerraContainingIgnoreCaseOrAssessoria_SiglaContainingIgnoreCase(String nomeGuerra, String sigla, Pageable pageable);
}

