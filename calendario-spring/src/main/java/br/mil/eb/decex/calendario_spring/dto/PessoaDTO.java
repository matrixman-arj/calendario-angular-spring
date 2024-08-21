package br.mil.eb.decex.calendario_spring.dto;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import br.mil.eb.decex.calendario_spring.modelo.jaas.Users;

public record PessoaDTO(Long id, 
                        String identidade, 
                        Users users, 
                        String nome, 
                        String nomeGuerra, 
                        PostoGraduacao postoGraduacao, 
                        Boolean acesso, 
                        TipoAcesso tipoAcesso, 
                        String ramal, 
                        String caminho, 
                        String antiguidade  
                        ) {

}
