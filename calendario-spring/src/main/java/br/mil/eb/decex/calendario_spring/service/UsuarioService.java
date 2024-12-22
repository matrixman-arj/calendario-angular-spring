package br.mil.eb.decex.calendario_spring.service;

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

    public UsuarioPageDTO listarInativos(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Usuario> pageUsuario = usuarioRepository.findInativos(pageable);
    
        List<UsuarioDTO> usuariosDTO = pageUsuario.stream()
            .map(usuarioMapper::toDTO)
            .collect(Collectors.toList());
    
        return new UsuarioPageDTO(usuariosDTO, pageUsuario.getTotalElements(), pageUsuario.getTotalPages());
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
                usuarioDTO.role(),
                usuarioDTO.liberado()
               
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
                    recordFound.setLiberado(usuario.liberado());
                    

                    return usuarioMapper.toDTO(usuarioRepository.save(recordFound));
                    
                }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    }  

    public void delete(@NotNull @Positive Long id) {

        usuarioRepository.delete(usuarioRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }

}
