package br.mil.eb.decex.calendario_spring.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.mil.eb.decex.calendario_spring.dto.AssessoriaDTO;
import br.mil.eb.decex.calendario_spring.dto.AssessoriaPageDTO;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.service.AssessoriaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@RestController
@RequestMapping("/api/assessorias")
public class AssessoriaController {
    
    @SuppressWarnings("unused")
    private final AssessoriaRepository assessoriaRepository;
    private final AssessoriaService assessoriaService;

    
    public AssessoriaController(AssessoriaRepository assessoriaRepository, AssessoriaService assessoriaService) {
        this.assessoriaRepository = assessoriaRepository;
        this.assessoriaService = assessoriaService;
    }

    @GetMapping
    public List<AssessoriaDTO> list() {
        return assessoriaService.list();

    }

    @GetMapping("/search")
    public AssessoriaPageDTO search(String termo, @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize
    ) {
        
        return assessoriaService.search(termo, page, pageSize);
    }

    @GetMapping("/filhas/{assessoriaPaiId}")
    public List<AssessoriaDTO> getFilhasByAssessoriaPaiId(@PathVariable @NotNull @Positive Long assessoriaPaiId) {
    return assessoriaService.findFilhasByPaiId(assessoriaPaiId);
}

    @GetMapping ("/{id}")
    public AssessoriaDTO findById(@PathVariable @NotNull @Positive Long id){
        return assessoriaService.findById(id);
       

    }
    
    // Endpoint para buscar assessorias sem assessoriaPai
    @GetMapping("/semAssessoriaPai")
    public ResponseEntity<List<Assessoria>> getAssessoriasWithoutAssessoriaPai() {
        List<Assessoria> assessorias = assessoriaService.getAssessoriasWithoutAssessoriaPai();
        return ResponseEntity.ok(assessorias);
    }
   
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public AssessoriaDTO create(@RequestBody Assessoria assessoria) {        
        return assessoriaService.create(assessoria);
    }

    @PutMapping("/{id}")
    public AssessoriaDTO update(@PathVariable @NotNull @Positive Long id, 
                @RequestBody @Valid Assessoria assessoria) {
        return assessoriaService.update(id, assessoria);
                                    
    }

   
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {        
       assessoriaService.delete(id);
    }   

}
