package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.mil.eb.decex.calendario_spring.dto.AssessoriaDTO;
import br.mil.eb.decex.calendario_spring.dto.PessoaDTO;
import br.mil.eb.decex.calendario_spring.dto.PessoaPageDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.PessoaMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Validated
@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    private final PessoaMapper pessoaMapper;

    public PessoaService(PessoaRepository pessoaRepository, PessoaMapper pessoaMapper ) {
        this.pessoaRepository = pessoaRepository;
        this.pessoaMapper = pessoaMapper;
    }

    public Page<Pessoa> searchByNomeGuerraOrAssessoria(String termo, Pageable pageable) {
        return pessoaRepository.findByNomeGuerraOrAssessoria(termo, pageable);
    }


    private String verificarCaminhoImagem(String caminho) {
        // Substitua "D:\\Programação\\2024\\calendario-angular-spring\\calendario-spring\\images\\"
        // pelo caminho absoluto da pasta onde as imagens estão armazenadas
        String basePath = "images/";
        
        // Extrai o nome do arquivo da URL (assumindo que o caminho é algo como http://localhost:8080/media/0195623038.jpg)
        String nomeArquivo = caminho.substring(caminho.lastIndexOf("/") + 1);
        
        // Constrói o caminho absoluto do arquivo de imagem
        Path caminhoImagem = Paths.get(basePath + nomeArquivo);
        
        // Verifica se o arquivo existe no caminho especificado
        if (Files.exists(caminhoImagem)) {
            return caminho; // Retorna o caminho original se o arquivo existir
        } else {
            return "http://localhost:8080/media/branco.jpg"; // Retorna o caminho da imagem padrão se o arquivo não existir
        }
    }

    public List<PessoaDTO> list() {
        return pessoaRepository.findAll().stream().map(pessoaMapper::toDTO)
                .collect(Collectors.toList());

    }

    // public PessoaPageDTO list(@PositiveOrZero int page, @Positive @Max(100) int pageSize) {
    //     Page<Pessoa> pagePessoa = pessoaRepository.findAll(PageRequest.of(page, pageSize));
    //     List<PessoaDTO> pessoas = pagePessoa.get().map(pessoa -> {
    //         PessoaDTO pessoaDTO = pessoaMapper.toDTO(pessoa);
    //         String caminhoAtualizado = verificarCaminhoImagem(pessoaDTO.caminho());
    //         return new PessoaDTO(
    //             pessoaDTO.id(),
    //             pessoaDTO.identidade(),
    //             pessoaDTO.users(),
    //             pessoaDTO.nome(),
    //             pessoaDTO.nomeGuerra(),
    //             pessoaDTO.postoGraduacao(),
    //             pessoaDTO.assessoria(),
    //             pessoaDTO.acesso(),
    //             pessoaDTO.tipoAcesso(),
    //             pessoaDTO.ramal(),
    //             caminhoAtualizado,
    //             pessoaDTO.antiguidade()
    //         );
    //     }).collect(Collectors.toList());
    //     return new PessoaPageDTO(pessoas, pagePessoa.getTotalElements(), pagePessoa.getTotalPages());
    // }


    public PessoaPageDTO search(String termo, @PositiveOrZero int page, @Positive @Max(100) int pageSize) {
        Page<Pessoa> pagePessoa = pessoaRepository.findByNomeGuerraOrAssessoria(termo, PageRequest.of(page, pageSize));
        List<PessoaDTO> pessoas = pagePessoa.get().map(pessoa -> {
            PessoaDTO pessoaDTO = pessoaMapper.toDTO(pessoa);
            String caminhoAtualizado = verificarCaminhoImagem(pessoaDTO.caminho());
            return new PessoaDTO(
                pessoaDTO.id(),
                pessoaDTO.identidade(),
                pessoaDTO.users(),
                pessoaDTO.nome(),
                pessoaDTO.nomeGuerra(),
                pessoaDTO.postoGraduacao(),
                pessoaDTO.assessoria(),
                pessoaDTO.acesso(),
                pessoaDTO.tipoAcesso(),
                pessoaDTO.ramal(),
                caminhoAtualizado,
                pessoaDTO.antiguidade()
            );
        }).collect(Collectors.toList());
        return new PessoaPageDTO(pessoas, pagePessoa.getTotalElements(), pagePessoa.getTotalPages());
    }

  
        public PessoaDTO findById(@NotNull @Positive Long id){
        return pessoaRepository.findById(id).map(pessoaMapper::toDTO)
                .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public PessoaDTO create(@Valid @NotNull PessoaDTO pessoa) {
        return pessoaMapper.toDTO(pessoaRepository.save(pessoaMapper.toEntity(pessoa)));
    }

    public PessoaDTO update(@NotNull @Positive Long id, @Valid PessoaDTO pessoa) {
        return pessoaRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setIdentidade(pessoa.identidade());
                    recordFound.setUsers(pessoa.users());
                    recordFound.setNome(pessoa.nome());
                    recordFound.setNomeGuerra(pessoa.nomeGuerra());
                    recordFound.setPostoGraduacao(pessoa.postoGraduacao());
                    recordFound.setAntiguidade(pessoa.antiguidade());
                    recordFound.setAssessoria(pessoa.assessoria());
                    recordFound.setCaminho(pessoa.caminho());
                    recordFound.setAcesso(pessoa.acesso());
                    recordFound.setRamal(pessoa.ramal());
                    recordFound.setTipoAcesso(pessoa.tipoAcesso());

                    return pessoaMapper.toDTO(pessoaRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    }  

    public void delete(@NotNull @Positive Long id) {

        pessoaRepository.delete(pessoaRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }

}
