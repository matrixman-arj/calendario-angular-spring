package br.mil.eb.decex.calendario_spring.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.mil.eb.decex.calendario_spring.dto.UsuarioDTO;
import br.mil.eb.decex.calendario_spring.dto.UsuarioPageDTO;
import br.mil.eb.decex.calendario_spring.dto.mapper.UsuarioMapper;
import br.mil.eb.decex.calendario_spring.exception.RecordNotFoundException;
import br.mil.eb.decex.calendario_spring.modelo.Usuario;
import br.mil.eb.decex.calendario_spring.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper ) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public Page<Usuario> searchByNomeGuerraOrAssessoria( Pageable pageable) {
        return usuarioRepository.findAll(pageable);
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

    public List<UsuarioDTO> list() {
        return usuarioRepository.findAll().stream().map(usuarioMapper::toDTO)
                .collect(Collectors.toList());

    }

    public UsuarioPageDTO search(@PositiveOrZero int page, @Positive @Max(100) int pageSize) {
        Page<Usuario> pageUsuario = usuarioRepository.findAll( PageRequest.of(page, pageSize));
        List<UsuarioDTO> usuarios = pageUsuario.get().map(usuario -> {
            UsuarioDTO usuarioDTO = usuarioMapper.toDTO(usuario);
           
            return new UsuarioDTO(
                usuarioDTO.id(),
                usuarioDTO.username(),
                usuarioDTO.password(),
                usuarioDTO.role()
               
            );
        }).collect(Collectors.toList());
        return new UsuarioPageDTO(usuarios, pageUsuario.getTotalElements(), pageUsuario.getTotalPages());
    }

  
        public UsuarioDTO findById(@NotNull @Positive Long id){
        return usuarioRepository.findById(id).map(usuarioMapper::toDTO)
                .orElseThrow(() ->  new RecordNotFoundException(id));   

    }

    public UsuarioDTO create(@Valid @NotNull UsuarioDTO usuario) {
        return usuarioMapper.toDTO(usuarioRepository.save(usuarioMapper.toEntity(usuario)));
    }

    public UsuarioDTO update(@NotNull @Positive Long id, @Valid UsuarioDTO usuario) {
        return usuarioRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setUsername(usuario.username());
                    recordFound.setPassword(usuario.password());
                    recordFound.setRole(usuario.role());
                    

                    return usuarioMapper.toDTO(usuarioRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    }  

    public void delete(@NotNull @Positive Long id) {

        usuarioRepository.delete(usuarioRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }

}
