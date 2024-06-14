package br.mil.eb.decex.calendario_spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;

@SpringBootApplication
public class CalendarioSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CalendarioSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(PessoaRepository pessoaRepository, AssessoriaRepository assessoriaRepository) {
		return args -> {
			pessoaRepository.deleteAll();

			Pessoa pessoa = new Pessoa();
			pessoa.setIdentidade("0195623038");
			pessoa.setNome("Vanilton Gomes dos Santos");
			pessoa.setNomeGuerra("Vanilton");
			pessoa.setTipoAcesso(TipoAcesso.ADMINISTRADOR);
			pessoa.setPostoGraduacao(PostoGraduacao.SEG_SARGENTO);
			pessoa.setLiberado(true);
					

			pessoaRepository.save(pessoa);


			Assessoria assessoria = new Assessoria();
			assessoria.setDescricao("Divisão de Técnologia da Informação");
			assessoria.setSigla("DTI");

			assessoriaRepository.save(assessoria);



		};
	}

}
