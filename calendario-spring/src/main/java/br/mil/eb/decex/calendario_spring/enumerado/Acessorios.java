package br.mil.eb.decex.calendario_spring.enumerado;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Enumerado para definição dos acessórios que serão utilizados durante o evento agendado<p/>
 * 
 * <b>NOTEBOOK</b> - Equipamento de TI que deverá estar disponível ou não, para ser utilizado 
 * durante o evento agendado, dependendo da solicitação<p/>
 * 
 * <b>PROJETOR</b> - Equipamento de projeção que deverá estar disponível ou não, para ser utilizado 
 * durante o evento agendado, dependendo da solicitação<p/>
 *  
 * <b>EQUIPA_SOM</b> - Equipamento de som que deverá estar disponível ou não, para ser utilizado 
 * durante o evento agendado, dependendo da solicitação<p/>
 * 
 * <b>MIC_PUPITO</b> - Microfone no púlpito que deverá estar disponível ou não, para ser utilizado 
 * durante o evento agendado, dependendo da solicitação<p/>
 * 
 * <b>MIC_S_FIO</b> - Microfone sem fio que deverá estar disponível ou não, para ser utilizado 
 * durante o evento agendado, dependendo da solicitação<p/>
 * 
 * <b>MIC_LAPELA</b> - Microfone de lapela que deverá estar disponível ou não, para ser utilizado 
 * durante o evento agendado, dependendo da solicitação<p/>
 * 
 * <b>PASS_SLIDE</b> - Passador de slide que deverá estar disponível ou não, para ser utilizado 
 * durante o evento agendado, dependendo da solicitação<p/>
 * 
 * 
 * @author <b>Vanilton</b> Gomes dos Santos - 2º Sgt QE
 * @version 1.1 (Incluído perfil AUDITORIO)
 */
public enum Acessorios {
	NOTEBOOK("Notebook"),
	PROJETOR("Projetor"),
	EQUIPA_SOM("Equipamento de som"),
    MIC_PUPITO("Microfone do púlpito"),
    MIC_S_FIO("Microfone sem fio"),
    MIC_LAPELA("Microfone de lapela"),
    PASS_SLIDE("Passador de slide");
	
	private String value;

    private Acessorios(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static Acessorios fromValue(String value) {
        for (Acessorios acessorio : Acessorios.values()) {
            if (acessorio.getValue().equalsIgnoreCase(value)) {
                return acessorio;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + value);
    }

    @Override
    public String toString() {        
        return value;
    }
	
}
