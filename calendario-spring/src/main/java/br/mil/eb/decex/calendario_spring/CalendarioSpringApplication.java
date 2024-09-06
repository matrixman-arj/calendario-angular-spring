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

			Assessoria assessoria = new Assessoria();
			assessoria.setDescricao("Divisão de Técnologia da informação");
			assessoria.setSigla("DTI");

			Assessoria assessoria2 = new Assessoria();
			assessoria2.setDescricao("Divisão Administrativa");
			assessoria2.setSigla("Div Adm");

			Assessoria assessoria3 = new Assessoria();
			assessoria3.setDescricao("Seção de Manutenção");
			assessoria3.setSigla("MNT");
			assessoria3.setAssessoriaPai(assessoria);

			Assessoria assessoria4 = new Assessoria();
			assessoria4.setDescricao("Seção de Redes");
			assessoria4.setSigla("Redes");
			assessoria4.setAssessoriaPai(assessoria);

			Assessoria assessoria5 = new Assessoria();
			assessoria5.setDescricao("Seção de Garagem");
			assessoria5.setSigla("Garagem");
			assessoria5.setAssessoriaPai(assessoria2);

			assessoriaRepository.save(assessoria);
			assessoriaRepository.save(assessoria2);
			assessoriaRepository.save(assessoria3);
			assessoriaRepository.save(assessoria4);
			assessoriaRepository.save(assessoria5);

			Pessoa pessoa = new Pessoa();
			pessoa.setIdentidade("019.562.303-8");
			pessoa.setNome("Vanilton Gomes dos Santos");
			pessoa.setNomeGuerra("Vanilton");
			pessoa.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa.setPostoGraduacao(PostoGraduacao.valueOf("SEG_SARGENTO"));
			pessoa.setAcesso(true);
			pessoa.setAntiguidade("1");
			pessoa.setAssessoria(assessoria);
			pessoa.setRamal("810 - 5678");
			pessoa.setCaminho("http://localhost:8080/media/0195623038.jpg");
					

			pessoaRepository.save(pessoa);
		};
	}

}
