package br.mil.eb.decex.calendario_spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;

@Repository
public interface AssessoriaRepository extends JpaRepository<Assessoria, Long> {

    List<Assessoria> findByAssessoriaPaiId(Long assessoriaPaiId);

    // Método para buscar assessorias sem assessoriaPai
    @Query("SELECT a FROM Assessoria a WHERE a.assessoriaPai IS NULL")
    List<Assessoria> findAssessoriasWithoutAssessoriaPai();
}
