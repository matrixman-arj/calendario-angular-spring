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
    "ORDER BY " +
    "CASE p.postoGraduacao " +
    "  WHEN 'Gen Ex' THEN 1 " +
    "  WHEN 'Gen Div' THEN 2 " +
    "  WHEN 'Gen Bda' THEN 3 " +
    "  WHEN 'Cel' THEN 4 " +
    "  WHEN 'Ten Cel' THEN 5 " +
    "  WHEN 'Maj' THEN 6 " +
    "  WHEN 'Cap' THEN 7 " +
    "  WHEN '1º Ten' THEN 8 " +
    "  WHEN '2º Ten' THEN 9 " +
    "  WHEN 'Asp' THEN 10 " +
    "  WHEN 'ST' THEN 11 " +
    "  WHEN '1º SGT' THEN 12 " +
    "  WHEN '2º SGT' THEN 13 " +
    "  WHEN '3º SGT' THEN 14 " +
    "  WHEN 'Cabo' THEN 15 " +
    "  WHEN 'Soldado' THEN 16 " +
    "  WHEN 'Funcionário Civil' THEN 17 " +
    "  ELSE 999 END ASC")
    Page<Pessoa> findByNomeGuerraOrAssessoria(String termo, Pageable pageable);

    // Ou método derivado
    Page<Pessoa> findByNomeGuerraContainingIgnoreCaseOrAssessoria_SiglaContainingIgnoreCase(String nomeGuerra, String sigla, Pageable pageable);
}

