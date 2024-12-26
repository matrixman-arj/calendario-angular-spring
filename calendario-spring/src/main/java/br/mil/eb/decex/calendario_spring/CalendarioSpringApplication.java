package br.mil.eb.decex.calendario_spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;
import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import br.mil.eb.decex.calendario_spring.modelo.Pessoa;
import br.mil.eb.decex.calendario_spring.modelo.Usuario;
import br.mil.eb.decex.calendario_spring.repository.AssessoriaRepository;
import br.mil.eb.decex.calendario_spring.repository.PessoaRepository;
import br.mil.eb.decex.calendario_spring.repository.UsuarioRepository;

@SpringBootApplication
public class CalendarioSpringApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(CalendarioSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(PessoaRepository pessoaRepository, AssessoriaRepository assessoriaRepository, UsuarioRepository usuarioRepository) {
		return _ -> {
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
			pessoa.setLiberado(true);
			pessoa.setAntiguidade("1");
			pessoa.setAssessoria(assessoria);
			pessoa.setRamal("810 - 5678");
			pessoa.setCaminho("http://localhost:8080/media/0195623038.jpg");

			Pessoa pessoa1 = new Pessoa();
			pessoa1.setIdentidade("019.562.303-9");
			pessoa1.setNome("Luciana Oliveira dos Santos");
			pessoa1.setNomeGuerra("Luciana");
			pessoa1.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa1.setPostoGraduacao(PostoGraduacao.valueOf("GEN_EXERCITO"));
			pessoa1.setLiberado(true);
			pessoa1.setAntiguidade("1");
			pessoa1.setAssessoria(assessoria2);
			pessoa1.setRamal("810 - 5001");
			pessoa1.setCaminho("http://localhost:8080/media/0195623039.jpg");

			Pessoa pessoa2 = new Pessoa();
			pessoa2.setIdentidade("019.562.304-0");
			pessoa2.setNome("Gizelle dos Santos");
			pessoa2.setNomeGuerra("Gizelle");
			pessoa2.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa2.setPostoGraduacao(PostoGraduacao.valueOf("GEN_DIVISAO"));
			pessoa2.setLiberado(true);
			pessoa2.setAntiguidade("2");
			pessoa2.setAssessoria(assessoria3);
			pessoa2.setRamal("810 - 5002");
			pessoa2.setCaminho("http://localhost:8080/media/0195623040.jpg");

			Pessoa pessoa3 = new Pessoa();
			pessoa3.setIdentidade("019.562.304-1");
			pessoa3.setNome("Luddmilla Oliveira dos Santos");
			pessoa3.setNomeGuerra("Luddmilla");
			pessoa3.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa3.setPostoGraduacao(PostoGraduacao.valueOf("GEN_BRIGADA"));
			pessoa3.setLiberado(true);
			pessoa3.setAntiguidade("3");
			pessoa3.setAssessoria(assessoria4);
			pessoa3.setRamal("810 - 5003");
			pessoa3.setCaminho("http://localhost:8080/media/0195623041.jpg");

			Pessoa pessoa4 = new Pessoa();
			pessoa4.setIdentidade("019.562.304-2");
			pessoa4.setNome("Vinicius Oliveira dos Santos");
			pessoa4.setNomeGuerra("Vinicius");
			pessoa4.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa4.setPostoGraduacao(PostoGraduacao.valueOf("CORONEL"));
			pessoa4.setLiberado(true);
			pessoa4.setAntiguidade("4");
			pessoa4.setAssessoria(assessoria5);
			pessoa4.setRamal("810 - 5004");
			pessoa4.setCaminho("http://localhost:8080/media/0195623042.jpg");

			Pessoa pessoa5 = new Pessoa();
			pessoa5.setIdentidade("019.562.304-3");
			pessoa5.setNome("Júlia Oliveira dos Santos");
			pessoa5.setNomeGuerra("Júlia");
			pessoa5.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa5.setPostoGraduacao(PostoGraduacao.valueOf("TEN_CORONEL"));
			pessoa5.setLiberado(true);
			pessoa5.setAntiguidade("5");
			pessoa5.setAssessoria(assessoria);
			pessoa5.setRamal("810 - 5005");
			pessoa5.setCaminho("http://localhost:8080/media/0195623043.jpg");

			Pessoa pessoa6 = new Pessoa();
			pessoa6.setIdentidade("019.562.304-4");
			pessoa6.setNome("Théo Alves dos Santos");
			pessoa6.setNomeGuerra("Théo");
			pessoa6.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa6.setPostoGraduacao(PostoGraduacao.valueOf("MAJOR"));
			pessoa6.setLiberado(true);
			pessoa6.setAntiguidade("6");
			pessoa6.setAssessoria(assessoria2);
			pessoa6.setRamal("810 - 5006");
			pessoa6.setCaminho("http://localhost:8080/media/0195623044.jpg");

			Pessoa pessoa7 = new Pessoa();
			pessoa7.setIdentidade("019.562.304-5");
			pessoa7.setNome("Loryan dos Santos");
			pessoa7.setNomeGuerra("Loryan");
			pessoa7.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa7.setPostoGraduacao(PostoGraduacao.valueOf("CAPITAO"));
			pessoa7.setLiberado(true);
			pessoa7.setAntiguidade("7");
			pessoa7.setAssessoria(assessoria3);
			pessoa7.setRamal("810 - 5007");
			pessoa7.setCaminho("http://localhost:8080/media/0195623045.jpg");

			Pessoa pessoa8 = new Pessoa();
			pessoa8.setIdentidade("019.562.304-6");
			pessoa8.setNome("Zélia dos Santos");
			pessoa8.setNomeGuerra("Zélia");
			pessoa8.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa8.setPostoGraduacao(PostoGraduacao.valueOf("PRI_TENENTE"));
			pessoa8.setLiberado(true);
			pessoa8.setAntiguidade("8");
			pessoa8.setAssessoria(assessoria4);
			pessoa8.setRamal("810 - 5008");
			pessoa8.setCaminho("http://localhost:8080/media/0195623046.jpg");

			Pessoa pessoa9 = new Pessoa();
			pessoa9.setIdentidade("019.562.304-7");
			pessoa9.setNome("Danúbia dos Santos");
			pessoa9.setNomeGuerra("Danúbia");
			pessoa9.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa9.setPostoGraduacao(PostoGraduacao.valueOf("SEG_TENENTE"));			
			pessoa9.setLiberado(true);
			pessoa9.setAntiguidade("9");
			pessoa9.setAssessoria(assessoria5);
			pessoa9.setRamal("810 - 5009");
			pessoa9.setCaminho("http://localhost:8080/media/0195623047.jpg");

			Pessoa pessoa10 = new Pessoa();
			pessoa10.setIdentidade("019.562.304-8");
			pessoa10.setNome("Aleandro dos Santos");
			pessoa10.setNomeGuerra("Aleandro");
			pessoa10.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa10.setPostoGraduacao(PostoGraduacao.valueOf("PRI_SARGENTO"));
			pessoa10.setLiberado(true);
			pessoa10.setAntiguidade("10");
			pessoa10.setAssessoria(assessoria);
			pessoa10.setRamal("810 - 5010");
			pessoa10.setCaminho("http://localhost:8080/media/0195623048.jpg");

			Pessoa pessoa11 = new Pessoa();
			pessoa11.setIdentidade("019.562.304-9");
			pessoa11.setNome("Maria dos Santos");
			pessoa11.setNomeGuerra("Maria");
			pessoa11.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa11.setPostoGraduacao(PostoGraduacao.valueOf("TER_SARGENTO"));
			pessoa11.setLiberado(true);
			pessoa11.setAntiguidade("11");
			pessoa11.setAssessoria(assessoria2);
			pessoa11.setRamal("810 - 5011");
			pessoa11.setCaminho("http://localhost:8080/media/0195623049.jpg");

			Pessoa pessoa12 = new Pessoa();
			pessoa12.setIdentidade("019.562.305-0");
			pessoa12.setNome("Bruno Lubão");
			pessoa12.setNomeGuerra("Lubão");
			pessoa12.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa12.setPostoGraduacao(PostoGraduacao.valueOf("SEG_TENENTE"));			
			pessoa12.setLiberado(true);
			pessoa12.setAntiguidade("12");
			pessoa12.setAssessoria(assessoria3);
			pessoa12.setRamal("810 - 5012");
			pessoa12.setCaminho("http://localhost:8080/media/0195623050.jpg");

			Pessoa pessoa13 = new Pessoa();
			pessoa13.setIdentidade("019.562.305-1");
			pessoa13.setNome("Laiza Lubão");
			pessoa13.setNomeGuerra("Laiza");
			pessoa13.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa13.setPostoGraduacao(PostoGraduacao.valueOf("GEN_BRIGADA"));
			pessoa13.setLiberado(true);
			pessoa13.setAntiguidade("13");
			pessoa13.setAssessoria(assessoria4);
			pessoa13.setRamal("810 - 5013");
			pessoa13.setCaminho("http://localhost:8080/media/0195623051.jpg");

			Pessoa pessoa14 = new Pessoa();
			pessoa14.setIdentidade("019.562.305-2");
			pessoa14.setNome("Lorenzo Lubão");
			pessoa14.setNomeGuerra("Lorenzo");
			pessoa14.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa14.setPostoGraduacao(PostoGraduacao.valueOf("CORONEL"));
			pessoa14.setLiberado(true);
			pessoa14.setAntiguidade("14");
			pessoa14.setAssessoria(assessoria5);
			pessoa14.setRamal("810 - 5014");
			pessoa14.setCaminho("http://localhost:8080/media/0195623052.jpg");

			Pessoa pessoa15 = new Pessoa();
			pessoa15.setIdentidade("019.562.305-3");
			pessoa15.setNome("Pérola Lubão");
			pessoa15.setNomeGuerra("Pérola");
			pessoa15.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa15.setPostoGraduacao(PostoGraduacao.valueOf("TEN_CORONEL"));
			pessoa15.setLiberado(true);
			pessoa15.setAntiguidade("15");
			pessoa15.setAssessoria(assessoria);
			pessoa15.setRamal("810 - 5015");
			pessoa15.setCaminho("http://localhost:8080/media/0195623053.jpg");

			Pessoa pessoa16 = new Pessoa();
			pessoa16.setIdentidade("019.562.305-4");
			pessoa16.setNome("Thiago Carvalho dos Santos");
			pessoa16.setNomeGuerra("Thiago Carvalho");
			pessoa16.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa16.setPostoGraduacao(PostoGraduacao.valueOf("MAJOR"));
			pessoa16.setLiberado(true);
			pessoa16.setAntiguidade("16");
			pessoa16.setAssessoria(assessoria2);
			pessoa16.setRamal("810 - 5016");
			pessoa16.setCaminho("http://localhost:8080/media/0195623054.jpg");

			Pessoa pessoa17 = new Pessoa();
			pessoa17.setIdentidade("019.562.305-5");
			pessoa17.setNome("Caio dos Santos");
			pessoa17.setNomeGuerra("Caio");
			pessoa17.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa17.setPostoGraduacao(PostoGraduacao.valueOf("CAPITAO"));
			pessoa17.setLiberado(true);
			pessoa17.setAntiguidade("17");
			pessoa17.setAssessoria(assessoria3);
			pessoa17.setRamal("810 - 5017");
			pessoa17.setCaminho("http://localhost:8080/media/0195623055.jpg");

			Pessoa pessoa18 = new Pessoa();
			pessoa18.setIdentidade("019.562.305-6");
			pessoa18.setNome("Nunes dos Santos");
			pessoa18.setNomeGuerra("Nunes");
			pessoa18.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa18.setPostoGraduacao(PostoGraduacao.valueOf("PRI_TENENTE"));
			pessoa18.setLiberado(true);
			pessoa18.setAntiguidade("18");
			pessoa18.setAssessoria(assessoria4);
			pessoa18.setRamal("810 - 5018");
			pessoa18.setCaminho("http://localhost:8080/media/0195623056.jpg");

			Pessoa pessoa19 = new Pessoa();
			pessoa19.setIdentidade("019.562.305-7");
			pessoa19.setNome("Fonseca dos Santos");
			pessoa19.setNomeGuerra("Fonseca");
			pessoa19.setTipoAcesso(TipoAcesso.valueOf("ADMINISTRADOR"));
			pessoa19.setPostoGraduacao(PostoGraduacao.valueOf("SEG_TENENTE"));		
			pessoa19.setLiberado(true);
			pessoa19.setAntiguidade("19");
			pessoa19.setAssessoria(assessoria5);
			pessoa19.setRamal("810 - 5019");
			pessoa19.setCaminho("http://localhost:8080/media/0195623057.jpg");
					

			pessoaRepository.save(pessoa);
			pessoaRepository.save(pessoa1);
			pessoaRepository.save(pessoa2);
			pessoaRepository.save(pessoa3);
			pessoaRepository.save(pessoa4);
			pessoaRepository.save(pessoa5);
			pessoaRepository.save(pessoa6);
			pessoaRepository.save(pessoa7);
			pessoaRepository.save(pessoa8);
			pessoaRepository.save(pessoa9);
			pessoaRepository.save(pessoa10);
			pessoaRepository.save(pessoa11);
			pessoaRepository.save(pessoa12);
			pessoaRepository.save(pessoa13);
			pessoaRepository.save(pessoa14);
			pessoaRepository.save(pessoa15);
			pessoaRepository.save(pessoa16);
			pessoaRepository.save(pessoa17);
			pessoaRepository.save(pessoa18);
			pessoaRepository.save(pessoa19);

			Usuario usuario = new Usuario();
			usuario.setUsername("0195623038");
			usuario.setPassword("$2a$12$GkgWGrA1LQ27BPo235vAJ.CfFAHt4uUATsX7xQG.mDVjj3gI02NUm");
			usuario.setRole("ADMINISTRADOR");
			usuario.setLiberado(true);
			usuarioRepository.save(usuario);
		};
	}

}
