package br.mil.eb.decex.calendario_spring.dto;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.jaas.Users;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record PessoaDTO(Long id,
                        @NotBlank
	                    @NotNull
                        @Pattern(regexp = "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d$", message = "Formato de identidade inválido. Deve estar no formato 000.000.000-0.")                        
                        String identidade,

                        Users users,
                        
                        @NotBlank
	                    @NotNull
                        String nome,
                        
                        @NotBlank
	                    @NotNull
                        String nomeGuerra,

                       
                        PostoGraduacao postoGraduacao,
                        
                        Assessoria assessoria,
                        
                        Boolean acesso, 
                        
                        TipoAcesso tipoAcesso, 
                        @Pattern(regexp = "^810 - \\d{4}$", message = "Formato do ramal inválido. Deve estar no formato 000 - 0000") 
                        String ramal, 
                        
                        String caminho, 
                        
                        String antiguidade  
                        ) {

}
