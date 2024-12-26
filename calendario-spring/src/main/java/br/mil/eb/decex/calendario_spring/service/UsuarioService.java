package br.mil.eb.decex.calendario_spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder; // Injete o bean

    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper, PasswordEncoder passwordEncoder ) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
        this.passwordEncoder = passwordEncoder; // Injete o bean aqui
    }

    // public Page<Usuario> findByUsernameOrRoleAndLiberadoTrue(String termo, Pageable pageable) {
    //     return usuarioRepository.findByUsernameOrRoleAndLiberadoTrue(termo, pageable);
    // }

    public UsuarioPageDTO findByUsernameOrRoleAndLiberadoTrue(String termo, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Usuario> pageUsuario = usuarioRepository.findByUsernameOrRoleAndLiberadoTrue(termo, pageable);
    
        List<UsuarioDTO> usuariosDTO = pageUsuario.stream()
            .map(usuarioMapper::toDTO)
            .collect(Collectors.toList());
    
        return new UsuarioPageDTO(usuariosDTO, pageUsuario.getTotalElements(), pageUsuario.getTotalPages());
    }

    public UsuarioPageDTO findByUsernameOrRoleAndLiberadoFalse(String termo, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Usuario> pageUsuario = usuarioRepository.findByUsernameOrRoleAndLiberadoFalse(termo, pageable);
    
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

    // public UsuarioDTO create(@Valid @NotNull UsuarioDTO usuario) {
    //     return usuarioMapper.toDTO(usuarioRepository.save(usuarioMapper.toEntity(usuario)));
    // }

    public UsuarioDTO create(@Valid @NotNull UsuarioDTO usuarioDTO) {
    // Preencher o campo password com o username, se o password não for fornecido
    if (usuarioDTO.password() == null || usuarioDTO.password().isEmpty()) {
        usuarioDTO = new UsuarioDTO(
            usuarioDTO.id(),
            usuarioDTO.username(),
            usuarioDTO.password(), // Define o password igual ao username
            usuarioDTO.role(),
            usuarioDTO.liberado()
        );
    }

    // Codificar o password com BCrypt
    String encodedPassword = passwordEncoder.encode(usuarioDTO.password()); // Use o bean injetado para codificar
    // Criar entidade Usuario a partir do DTO
    Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
    usuario.setPassword(encodedPassword);

    // Salvar no banco de dados
    return usuarioMapper.toDTO(usuarioRepository.save(usuario));
}


    // public UsuarioDTO update(@NotNull @Positive Long id, @Valid UsuarioDTO usuario) {
    //     return usuarioRepository.findById(id)
    //             .map(recordFound -> {
    //                 recordFound.setUsername(usuario.username());
    //                 recordFound.setPassword(usuario.password());
    //                 recordFound.setRole(usuario.role());
    //                 recordFound.setLiberado(usuario.liberado());
                    

    //                 return usuarioMapper.toDTO(usuarioRepository.save(recordFound));
                    
    //             }).orElseThrow(() ->  new RecordNotFoundException(id));
                
    // }
    
    // public UsuarioDTO update(@NotNull @Positive Long id, @Valid UsuarioDTO usuarioDTO) {
    //     return usuarioRepository.findById(id)
    //             .map(existingUser -> {
    //                 // Atualiza os campos editáveis
    //                 existingUser.setUsername(usuarioDTO.username());
    //                 existingUser.setRole(usuarioDTO.role());
    //                 existingUser.setLiberado(usuarioDTO.liberado());
    
    //                 // Verifica se o campo password foi alterado
    //                 if (usuarioDTO.password() != null && !usuarioDTO.password().isEmpty()) {
    //                     // Criptografa o novo password
    //                     String encodedPassword = passwordEncoder.encode(usuarioDTO.password());
    //                     existingUser.setPassword(encodedPassword);
    //                 } else {
    //                     // Mantém o password existente
    //                     existingUser.setPassword(existingUser.getPassword());
    //                 }
    
    //                 return usuarioMapper.toDTO(usuarioRepository.save(existingUser));
    //             })
    //             .orElseThrow(() -> new RecordNotFoundException(id));
    // }

    public UsuarioDTO update(@NotNull @Positive Long id, @Valid UsuarioDTO usuarioDTO) {
        return usuarioRepository.findById(id)
                .map(existingUser -> {
                    // Atualiza os campos editáveis
                    existingUser.setUsername(usuarioDTO.username());
                    existingUser.setRole(usuarioDTO.role());
                    existingUser.setLiberado(usuarioDTO.liberado());
    
                    // Verifica se o campo password foi alterado
                    if (!existingUser.getPassword().equals(usuarioDTO.password())) {
                        // Se o campo password foi alterado, criptografa o novo valor
                        String encodedPassword = passwordEncoder.encode(usuarioDTO.password());
                        existingUser.setPassword(encodedPassword);
                    }
    
                    // Salva as alterações e retorna o DTO atualizado
                    return usuarioMapper.toDTO(usuarioRepository.save(existingUser));
                })
                .orElseThrow(() -> new RecordNotFoundException(id));
    }
    
    

    public void delete(@NotNull @Positive Long id) {

        usuarioRepository.delete(usuarioRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
        
    }

}
