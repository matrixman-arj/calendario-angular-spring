package br.mil.eb.decex.calendario_spring.repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.mil.eb.decex.calendario_spring.modelo.Agendamento;


@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

   @Query("SELECT a FROM Agendamento a WHERE a.assessoria.sigla LIKE %:termo%")
   Page<Agendamento> findByAssessoria(@Param("termo") String termo, Pageable pageable);

   @Query("SELECT a FROM Agendamento a WHERE  a.dataInicio =  :dataInicio OR a.dataFim =  :dataFim" )
   Page<Agendamento> findByDates(@Param("dataInicio") LocalDate dataInicio, @Param("dataFim") LocalDate dataFim, Pageable pageable
);


}