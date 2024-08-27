package br.mil.eb.decex.calendario_spring.dto.mapper;

import org.springframework.stereotype.Component;

import br.mil.eb.decex.calendario_spring.dto.AssessoriaDTO;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;


@Component
public class AssessoriaMapper {

     public AssessoriaDTO toDTO(Assessoria assessoria){
        return new AssessoriaDTO(assessoria.getId(), assessoria.getSigla(), 
                                 assessoria.getDescricao(), assessoria, assessoria.getOrdem(), null);
    }

    public Assessoria toEntity(AssessoriaDTO assessoriaDTO){

        if (assessoriaDTO == null) {
            return null;
        }

        Assessoria assessoria = new Assessoria();
        if (assessoriaDTO != null) {
            assessoria.setId(assessoriaDTO.id());            
        }
        assessoria.setDescricao(assessoriaDTO.descricao());
        assessoria.setSigla(assessoriaDTO.sigla());
        assessoria.setInterna(assessoriaDTO.interna());
        assessoria.setOrdem(assessoriaDTO.ordem());
        return assessoria;
    }

}
