package br.mil.eb.decex.calendario_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.mil.eb.decex.calendario_spring.modelo.Calendario;

@Repository
public interface CalendarioRepository extends JpaRepository<Calendario, Long> {
}