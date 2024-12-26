package br.mil.eb.decex.calendario_spring.dto.mapper;

import org.springframework.stereotype.Component;

import br.mil.eb.decex.calendario_spring.dto.UsuarioDTO;
import br.mil.eb.decex.calendario_spring.modelo.Usuario;

@Component
public class UsuarioMapper {

    public UsuarioDTO toDTO(Usuario usuario){

        if (usuario == null) {
            return null;
        }

        return new UsuarioDTO(usuario.getId(), usuario.getUsername(), usuario.getPassword(), 
                             usuario.getRole(), usuario.isLiberado());
    }


    public Usuario toEntity(UsuarioDTO usuarioDTO){

        if (usuarioDTO == null) {
            return null;
        }

        Usuario usuario = new Usuario();
        if (usuarioDTO.id() != null ) {
            usuario.setId(usuarioDTO.id());
        }
        usuario.setUsername(usuarioDTO.username());
        usuario.setPassword(usuarioDTO.password() != null ? usuarioDTO.password() : usuarioDTO.username());
        usuario.setRole(usuarioDTO.role());
        usuario.setLiberado(usuarioDTO.liberado());       
        return  usuario;
    }

}
