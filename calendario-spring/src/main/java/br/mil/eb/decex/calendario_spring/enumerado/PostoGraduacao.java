package br.mil.eb.decex.calendario_spring.enumerado;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PostoGraduacao {

    GEN_EXERCITO("Gen Ex"),
	GEN_DIVISAO("Gen Div"),
	GEN_BRIGADA("Gen Bda"),
	CORONEL("Cel"),
	TEN_CORONEL("Ten Cel"),
	MAJOR("Maj"),
	CAPITAO("Cap"),
	PRI_TENENTE("1º Ten"),
	SEG_TENENTE("2º Ten"),
	ASP("Asp"),
	SUBTENENTE("ST"),
	PRI_SARGENTO("1º SGT"),
	SEG_SARGENTO("2º SGT"),
	TER_SARGENTO("3º SGT"),
	CABO("Cabo"),
	SOLDADO("Soldado"),
	FUNC_CIV("Funcionário Civil");
	
	private String value;

    private PostoGraduacao(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static PostoGraduacao fromValue(String value) {
        for (PostoGraduacao posto : PostoGraduacao.values()) {
            if (posto.getValue().equalsIgnoreCase(value)) {
                return posto;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + value);
    }

    @Override
    public String toString() {        
        return value;
    }
	
}
